import React, { useState, useRef, useEffect } from "react";
import { TimerControls } from "./components/timer/TimerControls";
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
      <div className="w-full h-full flex flex-col justify-between p-1">
        <div>
          <PresetTimes
            presetTimes={presetTimes}
            currentMinutes={settings.roundMinutes}
            isDisabled={false}
            onSelect={setPresetTime}
          />

          {/* Timer Display */}
          <div className="text-center animate-slide-up mb-2">
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

              <div className="font-mono text-[34vw] font-bold leading-[0.6] flex items-center">
                <div className="flex items-center">
                  {isEditingMinutes && !isRunning ? (
                    <input
                      ref={minutesInputRef}
                      type="number"
                      value={Math.floor(time / 60)}
                      onChange={(e) => updateTime('minutes', e.target.value)}
                      onBlur={() => setIsEditingMinutes(false)}
                      className={`w-[34vw] bg-transparent text-center outline-none font-mono text-[34vw] font-bold leading-[0.6] p-0 m-0 box-content h-[1em] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        isResting ? 'text-blue-600 dark:text-blue-300' : 'text-app-text-primary-light dark:text-app-text-primary-dark'
                      }`}
                      min="0"
                      max={99}
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => !isRunning && setIsEditingMinutes(true)}
                      className={`cursor-pointer select-none ${
                        isResting ? 'text-blue-600 dark:text-blue-300' : 'text-app-text-primary-light dark:text-app-text-primary-dark'
                      }`}
                    >
                      {Math.floor(time / 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
                <span className={`flex items-center self-center mx-2 -mt-4 ${isResting ? 'text-blue-600 dark:text-blue-300' : ''}`}>:</span>
                <div className="flex items-center">
                  {isEditingSeconds && !isRunning ? (
                    <input
                      ref={secondsInputRef}
                      type="number"
                      value={time % 60}
                      onChange={(e) => updateTime('seconds', e.target.value)}
                      onBlur={() => setIsEditingSeconds(false)}
                      className={`w-[34vw] bg-transparent text-center outline-none font-mono text-[34vw] font-bold leading-[0.6] p-0 m-0 box-content h-[1em] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        isResting ? 'text-blue-600 dark:text-blue-300' : 'text-app-text-primary-light dark:text-app-text-primary-dark'
                      }`}
                      min="0"
                      max={59}
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => !isRunning && setIsEditingSeconds(true)}
                      className={`cursor-pointer select-none ${
                        isLastTenSeconds ? 'animate-flash' : ''
                      } ${isResting ? 'text-blue-600 dark:text-blue-300' : 'text-app-text-primary-light dark:text-app-text-primary-dark'}`}
                    >
                      {(time % 60).toString().padStart(2, '0')}
                    </span>
                  )}
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
        </div>

        {/* Control Buttons and Rest Time Input */}
        <div className="flex gap-1 animate-slide-up [animation-delay:300ms]">
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
  );
};

export default Timer;
