import React from 'react';
import { PresetTimesProps } from '../../types/timer';

export const PresetTimes: React.FC<PresetTimesProps> = ({
  presetTimes,
  currentMinutes,
  isDisabled,
  onSelect
}) => (
  <div className="grid portrait:grid-cols-3 landscape:grid-cols-6 gap-2 h-full">
    {presetTimes.map((minutes) => (
      <button
        key={minutes}
        onClick={() => onSelect(minutes)}
        disabled={isDisabled}
        className={`h-full w-full rounded-[4px] text-[min(3vw,4vh)] font-medium transition-colors disabled:opacity-50 flex items-center justify-center border-2 border-transparent focus:border-app-accent-primary ${
          currentMinutes === minutes
            ? "bg-app-accent-primary text-white"
            : "bg-app-card-light dark:bg-app-card-dark text-app-text-controls-light dark:text-app-text-controls-dark hover:bg-app-hover-light dark:hover:bg-app-hover-dark"
        }`}
      >
        {minutes}m
      </button>
    ))}
  </div>
);
