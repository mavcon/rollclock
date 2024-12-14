import React, { useState, useEffect, useRef } from "react";

interface TimerSettings {
  roundMinutes: number;
  roundSeconds: number;
  restMinutes: number;
}

interface TimerControlsProps {
  direction: 'left' | 'right';
  onIncrement: () => void;
  onDecrement: () => void;
  disabled: boolean;
}

interface TimerDisplayProps {
  value: number;
  isEditing: boolean;
  onEdit: (value: string) => void;
  onEditStart: () => void;
  onEditEnd: () => void;
  isRunning: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  max: number;
  isResting: boolean;
  isFlashing: boolean;
  isSeconds?: boolean;
}

const TimerControls: React.FC<TimerControlsProps> = ({ direction, onIncrement, onDecrement, disabled }) => (
  <div className="flex flex-col justify-between h-[18.2vw] sm:h-[20.8vw] my-2">
    <button
      onClick={onIncrement}
      disabled={disabled}
      className="text-[3vw] sm:text-[3.5vw] text-app-text-secondary hover:text-app-text-primary transition-colors disabled:opacity-50 leading-none"
    >
      ▲
    </button>
    <button
      onClick={onDecrement}
      disabled={disabled}
      className="text-[3vw] sm:text-[3.5vw] text-app-text-secondary hover:text-app-text-primary transition-colors disabled:opacity-50 leading-none"
    >
      ▼
    </button>
  </div>
);

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  value,
  isEditing,
  onEdit,
  onEditStart,
  onEditEnd,
  isRunning,
  inputRef,
  max,
  isResting,
  isFlashing,
  isSeconds = false
}) => (
  <div className="flex items-center">
    {isEditing ? (
      <input
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onEdit(e.target.value)}
        onBlur={onEditEnd}
        className={`w-[28vw] sm:w-[32vw] bg-transparent text-center outline-none font-mono text-[28vw] sm:text-[32vw] font-bold leading-[0.65] p-0 m-0 box-content h-[0.65em] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
          isResting ? 'text-blue-300' : ''
        }`}
        min="0"
        max={max}
        autoFocus
      />
    ) : (
      <span
        onClick={() => !isRunning && onEditStart()}
        className={`${!isRunning ? "cursor-text" : ""} ${
          isResting ? 'text-blue-300' : ''
        } ${isFlashing && isSeconds ? 'animate-flash' : ''}`}
      >
        {value.toString().padStart(2, "0")}
      </span>
    )}
  </div>
);

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isEditingMinutes, setIsEditingMinutes] = useState<boolean>(false);
  const [isEditingSeconds, setIsEditingSeconds] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const minutesInputRef = useRef<HTMLInputElement>(null);
  const secondsInputRef = useRef<HTMLInputElement>(null);
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const savedSettings = localStorage.getItem("timerSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          roundMinutes: 5,
          roundSeconds: 0,
          restMinutes: 1
        };
  });

  const isLastTenSeconds = time <= 10 && time > 0;

  const playBuzzerSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const context = audioContextRef.current;
    
    // Create multiple oscillators for a sports buzzer sound
    const oscillators = [
      { freq: 150, type: 'square' as OscillatorType },    // Deep bass
      { freq: 300, type: 'square' as OscillatorType },    // Mid tone
      { freq: 600, type: 'sawtooth' as OscillatorType },  // Sharp high
      { freq: 900, type: 'square' as OscillatorType }     // Extra bite
    ].map(config => {
      const osc = context.createOscillator();
      osc.type = config.type;
      osc.frequency.setValueAtTime(config.freq, context.currentTime);
      return osc;
    });
    
    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(1, context.currentTime); // Maximum volume
    masterGain.connect(context.destination);

    oscillators.forEach(osc => {
      const gainNode = context.createGain();
      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 0.01); // Immediate attack
      gainNode.gain.setValueAtTime(1, context.currentTime + 0.2); // Hold at max
      gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.95); // Release just before transition
      
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      
      osc.start(context.currentTime);
      osc.stop(context.currentTime + 0.95);
    });
  };

  const playTickSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const context = audioContextRef.current;
    
    const osc = context.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, context.currentTime);
    
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(context.destination);
    
    osc.start(context.currentTime);
    osc.stop(context.currentTime + 0.05);
  };

  useEffect(() => {
    localStorage.setItem("timerSettings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    let intervalId: number;

    if (isRunning && !isTransitioning) {
      intervalId = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            if (!isResting) {
              playBuzzerSound(); // Play buzzer once at zero
            }
            setIsTransitioning(true);
            window.setTimeout(() => {
              if (!isResting) {
                setIsResting(true);
                setTime(Math.round(settings.restMinutes * 60));
              } else {
                setIsResting(false);
                setTime(settings.roundMinutes * 60 + settings.roundSeconds);
              }
              setIsTransitioning(false);
            }, 1000);
            return 0;
          }
          // Play tick sound only during round time
          if (prevTime > 1 && !isResting) {
            playTickSound();
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isRunning, isResting, settings, isTransitioning]);

  useEffect(() => {
    if (!isRunning) {
      setTime(settings.roundMinutes * 60 + settings.roundSeconds);
      setIsResting(false);
    }
  }, [settings]);

  const handleStartStop = () => {
    if (!isRunning && time === 0) {
      setTime(settings.roundMinutes * 60 + settings.roundSeconds);
      setIsResting(false);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsTransitioning(false);
    setTime(settings.roundMinutes * 60 + settings.roundSeconds);
    setIsResting(false);
  };

  const presetTimes = [4, 5, 6, 7, 8, 10];

  const setPresetTime = (minutes: number) => {
    if (isRunning) return;
    setSettings(prev => ({
      ...prev,
      roundMinutes: minutes,
      roundSeconds: 0
    }));
  };

  const adjustTime = (type: 'minutes' | 'seconds', increment: boolean) => {
    if (isRunning) return;

    setSettings(prev => {
      const newSettings = { ...prev };
      if (type === 'minutes') {
        newSettings.roundMinutes = Math.max(0, Math.min(99, prev.roundMinutes + (increment ? 1 : -1)));
      } else {
        newSettings.roundSeconds = Math.max(0, Math.min(59, prev.roundSeconds + (increment ? 1 : -1)));
      }
      return newSettings;
    });
  };

  const handleTimeEdit = (type: 'minutes' | 'seconds', value: string) => {
    if (isRunning) return;

    const numValue = parseInt(value) || 0;
    setSettings(prev => ({
      ...prev,
      [type === 'minutes' ? 'roundMinutes' : 'roundSeconds']:
        type === 'minutes' ? Math.min(99, Math.max(0, numValue)) : Math.min(59, Math.max(0, numValue))
    }));
  };

  const adjustRestTime = (increment: boolean) => {
    if (isRunning) return;
    setSettings(prev => ({
      ...prev,
      restMinutes: Math.max(0, Math.round((prev.restMinutes + (increment ? 0.1 : -0.1)) * 10) / 10)
    }));
  };

  const handleRestTimeChange = (value: string) => {
    if (isRunning) return;
    const numValue = parseFloat(value) || 0;
    setSettings(prev => ({
      ...prev,
      restMinutes: Math.max(0, Math.round(numValue * 10) / 10)
    }));
  };

  return (
    <div className="min-h-screen bg-app-bg text-app-text-primary flex flex-col items-center justify-between p-1">
      <div className="w-full max-w-[95vw] mx-auto">
        {/* Preset Times */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 animate-slide-up mb-2">
          {presetTimes.map((mins) => (
            <button
              key={mins}
              onClick={() => setPresetTime(mins)}
              disabled={isResting || isRunning}
              className={`py-1.5 rounded-[4px] text-base sm:text-lg font-medium transition-all ${
                settings.roundMinutes === mins
                  ? "bg-app-accent-primary text-white shadow-lg shadow-app-accent-primary/25"
                  : "bg-app-card hover:bg-app-hover text-app-text-primary"
              } ${(isResting || isRunning) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="text-center animate-slide-up mb-2">
          <div className={`inline-block px-3 py-0.5 rounded-[4px] text-sm font-medium mb-1 transition-colors ${
            isResting
              ? "bg-blue-300/20 text-blue-300"
              : "text-app-text-primary"
          }`}>
            {isResting ? "REST TIME" : "ROUND TIME"}
          </div>
          <div className="flex items-center justify-between py-2">
            <TimerControls
              direction="left"
              onIncrement={() => adjustTime('minutes', true)}
              onDecrement={() => adjustTime('minutes', false)}
              disabled={isRunning}
            />

            <div className="font-mono text-[28vw] sm:text-[32vw] font-bold leading-[0.65] flex items-center">
              <TimerDisplay
                value={Math.floor(time / 60)}
                isEditing={isEditingMinutes}
                onEdit={(value) => handleTimeEdit('minutes', value)}
                onEditStart={() => setIsEditingMinutes(true)}
                onEditEnd={() => setIsEditingMinutes(false)}
                isRunning={isRunning}
                inputRef={minutesInputRef}
                max={99}
                isResting={isResting}
                isFlashing={isLastTenSeconds}
              />
              <span className={isResting ? 'text-blue-300' : ''}>:</span>
              <TimerDisplay
                value={time % 60}
                isEditing={isEditingSeconds}
                onEdit={(value) => handleTimeEdit('seconds', value)}
                onEditStart={() => setIsEditingSeconds(true)}
                onEditEnd={() => setIsEditingSeconds(false)}
                isRunning={isRunning}
                inputRef={secondsInputRef}
                max={59}
                isResting={isResting}
                isFlashing={isLastTenSeconds}
                isSeconds={true}
              />
            </div>

            <TimerControls
              direction="right"
              onIncrement={() => adjustTime('seconds', true)}
              onDecrement={() => adjustTime('seconds', false)}
              disabled={isRunning}
            />
          </div>
        </div>

        {/* Control Buttons and Rest Time Input */}
        <div className="flex gap-1 animate-slide-up [animation-delay:300ms] mt-1">
          <div className="bg-app-card rounded-[4px] px-[2vw] py-2 flex items-center gap-[2vw]">
            <button
              onClick={() => adjustRestTime(true)}
              disabled={isRunning}
              className="text-xl text-app-text-secondary hover:text-app-text-primary transition-colors disabled:opacity-50"
            >
              ▲
            </button>
            <input
              type="number"
              value={settings.restMinutes}
              disabled={isRunning}
              onChange={(e) => handleRestTimeChange(e.target.value)}
              className="w-12 text-lg sm:text-xl text-center bg-transparent outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
              min="0"
              step="0.1"
            />
            <button
              onClick={() => adjustRestTime(false)}
              disabled={isRunning}
              className="text-xl text-app-text-secondary hover:text-app-text-primary transition-colors disabled:opacity-50"
            >
              ▼
            </button>
          </div>
          <button
            onClick={handleStartStop}
            className={`flex-1 py-2 rounded-[4px] text-lg sm:text-xl font-semibold transition-all shadow-lg ${
              isRunning
                ? "bg-app-danger-primary hover:bg-app-danger-hover shadow-app-danger-primary/25"
                : "bg-app-success-primary hover:bg-app-success-hover shadow-app-success-primary/25"
            }`}
          >
            {isRunning ? "PAUSE" : time === 0 ? "START" : "RESUME"}
          </button>
          <button
            onClick={handleReset}
            className="w-14 sm:w-16 py-2 rounded-[4px] text-lg sm:text-xl font-semibold bg-app-card hover:bg-app-hover transition-all"
          >
            ↺
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
