import React, { useState, useRef, useEffect } from "react";
import { TimerDisplay } from "./components/timer/TimerDisplay";
import { PresetTimes } from "./components/timer/PresetTimes";
import { RestTimeControls } from "./components/timer/RestTimeControls";
import { ControlButtons } from "./components/timer/ControlButtons";
import { useTimer } from "./hooks/useTimer";

const Timer: React.FC = () => {
  const [isEditingMinutes, setIsEditingMinutes] = useState<boolean>(false);
  const [isEditingSeconds, setIsEditingSeconds] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const minutesInputRef = useRef<HTMLInputElement>(null);
  const secondsInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const {
    time,
    isResting,
    isRunning,
    isLastTenSeconds,
    settings,
    start,
    pause,
    reset,
    setPresetTime,
    adjustTime,
    updateTime,
    adjustRestTime,
    updateRestTime
  } = useTimer();

  const presetTimes = [4, 5, 6, 7, 8, 10];

  const handleStartStop = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  return (
    <div className="w-screen h-screen bg-app-bg-light dark:bg-app-bg-dark text-app-text-primary-light dark:text-app-text-primary-dark">
      <div className="w-full h-full flex flex-col gap-2 p-1">
        <div className="flex-1 flex flex-col gap-2">
          <PresetTimes
            presetTimes={presetTimes}
            currentMinutes={settings.roundMinutes}
            isDisabled={false}
            onSelect={setPresetTime}
          />

          {/* Timer Display */}
          <div className="text-center animate-slide-up">
            <div className={`inline-block px-4 py-1 rounded-[4px] text-[3.4vw] font-medium mb-2 transition-colors ${
              isResting
                ? "bg-blue-300/20 text-blue-600 dark:text-blue-300"
                : "text-app-text-primary-light dark:text-app-text-primary-dark"
            }`}>
              {isResting ? "REST TIME" : "ROUND TIME"}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-between h-[22vw] my-1">
                <button
                  onClick={() => adjustTime('minutes', true)}
                  disabled={isRunning}
                  className="text-[3.4vw] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 leading-[0.6]"
                >
                  ▲
                </button>
                <button
                  onClick={() => adjustTime('minutes', false)}
                  disabled={isRunning}
                  className="text-[3.4vw] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 leading-[0.6]"
                >
                  ▼
                </button>
              </div>

              <div className="font-mono text-[34vw] font-bold leading-[0.6] flex items-center justify-center flex-grow">
                <div className="flex-grow flex justify-end">
                  <TimerDisplay
                    value={Math.floor(time / 60)}
                    isEditing={isEditingMinutes}
                    onEdit={(value) => updateTime('minutes', value)}
                    onEditStart={() => setIsEditingMinutes(true)}
                    onEditEnd={() => setIsEditingMinutes(false)}
                    isRunning={isRunning}
                    inputRef={minutesInputRef}
                    max={99}
                    isResting={isResting}
                    isFlashing={false}
                  />
                </div>
                <span className={`mx-2 -mt-4 ${isResting ? 'text-blue-600 dark:text-blue-300' : ''}`}>:</span>
                <div className="flex-grow">
                  <TimerDisplay
                    value={time % 60}
                    isEditing={isEditingSeconds}
                    onEdit={(value) => updateTime('seconds', value)}
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
              </div>

              <div className="flex flex-col justify-between h-[22vw] my-1">
                <button
                  onClick={() => adjustTime('seconds', true)}
                  disabled={isRunning}
                  className="text-[3.4vw] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 leading-[0.6]"
                >
                  ▲
                </button>
                <button
                  onClick={() => adjustTime('seconds', false)}
                  disabled={isRunning}
                  className="text-[3.4vw] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 leading-[0.6]"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
          
          {/* Control Buttons and Rest Time Input */}
          <div className="flex gap-1 animate-slide-up [animation-delay:300ms] w-full mt-4">
            <RestTimeControls
              value={settings.restMinutes}
              isDisabled={isRunning}
              onIncrement={() => adjustRestTime(true)}
              onDecrement={() => adjustRestTime(false)}
              onChange={updateRestTime}
              isDarkMode={isDarkMode}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            />
            <ControlButtons
              isRunning={isRunning}
              time={time}
              onStartStop={handleStartStop}
              onReset={reset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
