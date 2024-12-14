import React, { useState, useRef } from "react";
import { TimerControls } from "./components/timer/TimerControls";
import { TimerDisplay } from "./components/timer/TimerDisplay";
import { PresetTimes } from "./components/timer/PresetTimes";
import { RestTimeControls } from "./components/timer/RestTimeControls";
import { ControlButtons } from "./components/timer/ControlButtons";
import { useTimer } from "./hooks/useTimer";

const Timer: React.FC = () => {
  const [isEditingMinutes, setIsEditingMinutes] = useState<boolean>(false);
  const [isEditingSeconds, setIsEditingSeconds] = useState<boolean>(false);
  const minutesInputRef = useRef<HTMLInputElement>(null);
  const secondsInputRef = useRef<HTMLInputElement>(null);

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
    <div className="min-h-screen bg-app-bg text-app-text-primary flex flex-col items-center justify-between p-1">
      <div className="w-full max-w-[95vw] mx-auto">
        {/* Preset Times */}
        <PresetTimes
          presetTimes={presetTimes}
          currentMinutes={settings.roundMinutes}
          isDisabled={isResting || isRunning}
          onSelect={setPresetTime}
        />

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
                onEdit={(value) => updateTime('minutes', value)}
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
          <RestTimeControls
            value={settings.restMinutes}
            isDisabled={isRunning}
            onIncrement={() => adjustRestTime(true)}
            onDecrement={() => adjustRestTime(false)}
            onChange={updateRestTime}
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
