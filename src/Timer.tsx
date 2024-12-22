import React, { useState, useRef, useEffect } from "react";
import { TimerDisplay } from "./components/timer/TimerDisplay";
import { PresetTimes } from "./components/timer/PresetTimes";
import { RestTimeControls } from "./components/timer/RestTimeControls";
import { ControlButtons } from "./components/timer/ControlButtons";
import { useTimer } from "./hooks/useTimer";

const formatRestTime = (minutes: number): string => {
  if (minutes < 1) {
    return `${minutes * 60}s`;
  }
  return minutes % 1 === 0 ? `${minutes}m` : `${minutes}m`;
};

const parseRestTime = (value: string): string => {
  const numericValue = value.replace(/[ms]/g, '');
  if (value.endsWith('s')) {
    return (parseInt(numericValue) / 60).toString();
  }
  return numericValue;
};

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
    <div className="bg-app-bg-light dark:bg-app-bg-dark text-app-text-primary-light dark:text-app-text-primary-dark h-screen w-screen overflow-hidden p-4">
      <div className="h-full w-full flex flex-col gap-2">
        {/* Top buttons - PresetTimes (15%) */}
        <div className="h-[14%] w-full">
          <div className="h-full w-full">
            <PresetTimes
              presetTimes={presetTimes}
              currentMinutes={settings.roundMinutes}
              isDisabled={false}
              onSelect={setPresetTime}
            />
          </div>
        </div>

        {/* Title section (7%) */}
        <div className="h-[7%] w-full py-4">
          <div className="h-full w-full flex items-center justify-center">
            <span className={`text-[min(5vw,5vh)] font-bold transition-colors ${
              isResting
                ? "text-blue-300"
                : "text-app-text-title-light dark:text-app-text-title-dark"
            }`}>
              {isResting ? "REST TIME" : "ROUND TIME"}
            </span>
          </div>
        </div>

        {/* Countdown and arrows section (65%) */}
        <div className="h-[65%] w-full">
          <div className="h-full w-full">
            <div className="h-full w-full grid grid-cols-[auto_1fr_auto] gap-2">
              <div className="flex flex-col h-full">
                <button
                  onClick={() => adjustTime('minutes', true)}
                  disabled={isRunning}
                  className="h-[50%] text-[min(6vw,12vh)] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  ▲
                </button>
                <button
                  onClick={() => adjustTime('minutes', false)}
                  disabled={isRunning}
                  className="h-[50%] text-[min(6vw,12vh)] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  ▼
                </button>
              </div>

              <div className="font-mono grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center justify-items-center h-full w-full">
                <div className="w-full flex justify-end">
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
                <span className={`text-[min(30vw,60vh)] leading-[1] font-bold ${isResting ? 'text-blue-300' : ''}`}>:</span>
                <div className="w-full flex justify-start">
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

              <div className="flex flex-col h-full">
                <button
                  onClick={() => adjustTime('seconds', true)}
                  disabled={isRunning}
                  className="h-[50%] text-[min(6vw,12vh)] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  ▲
                </button>
                <button
                  onClick={() => adjustTime('seconds', false)}
                  disabled={isRunning}
                  className="h-[50%] text-[min(6vw,12vh)] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom buttons section (15%) */}
        <div className="h-[15%] w-full">
          <div className="h-full w-full">
            <div className="h-full w-full grid portrait:grid-rows-2 landscape:grid-cols-2 gap-2">
              <div className="h-full portrait:order-2 landscape:order-none">
                <div className="grid grid-cols-[auto_1fr_auto] gap-2 h-full">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="bg-app-card-light dark:bg-app-card-dark hover:bg-app-hover-light dark:hover:bg-app-hover-dark rounded-[4px] h-full aspect-square transition-colors flex items-center justify-center"
                  >
                    {isDarkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-[min(3.4vw,8vh)] h-[min(3.4vw,8vh)] text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-[min(3.4vw,8vh)] h-[min(3.4vw,8vh)] text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                  <div className="bg-app-card-light dark:bg-app-card-dark rounded-[4px] grid grid-cols-[auto_1fr_auto] h-full">
                    <button
                      onClick={() => adjustRestTime(true)}
                      disabled={isRunning}
                      className="text-[min(3.4vw,8vh)] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 h-full aspect-square flex items-center justify-center"
                    >
                      {'\u25B2'}
                    </button>
                    <div className="flex items-center justify-center min-w-0">
                      <input
                        type="text"
                        value={formatRestTime(settings.restMinutes)}
                        disabled={isRunning}
                        onChange={(e) => updateRestTime(parseRestTime(e.target.value))}
                        className="w-full min-w-0 text-[min(3.4vw,8vh)] text-center bg-transparent outline-none transition-colors disabled:opacity-50 px-1 text-app-text-controls-light dark:text-app-text-controls-dark"
                      />
                    </div>
                    <button
                      onClick={() => adjustRestTime(false)}
                      disabled={isRunning}
                      className="text-[min(3.4vw,8vh)] text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 h-full aspect-square flex items-center justify-center"
                    >
                      {'\u25BC'}
                    </button>
                  </div>
                  <button
                    onClick={reset}
                    disabled={time === 0}
                    className="bg-app-card-light dark:bg-app-card-dark hover:bg-app-hover-light dark:hover:bg-app-hover-dark text-app-text-secondary-light dark:text-app-text-secondary-dark rounded-[4px] h-full aspect-square transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[min(3.4vw,8vh)] h-[min(3.4vw,8vh)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                      <path d="M3 3v5h5"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-full portrait:order-1 landscape:order-none">
                <button
                  onClick={handleStartStop}
                  disabled={time === 0}
                  className={`h-full w-full rounded-[4px] text-white text-[min(3.4vw,8vh)] font-medium transition-colors disabled:opacity-50 flex items-center justify-center ${
                    isRunning
                      ? "bg-app-danger-primary hover:bg-app-danger-hover"
                      : "bg-app-success-primary hover:bg-app-success-hover"
                  }`}
                >
                  {isRunning ? "STOP" : "START"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
