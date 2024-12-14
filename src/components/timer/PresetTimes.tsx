import React from 'react';
import { PresetTimesProps } from '../../types/timer';

export const PresetTimes: React.FC<PresetTimesProps> = ({
  presetTimes,
  currentMinutes,
  isDisabled,
  onSelect
}) => (
  <div className="flex gap-1 mb-2 animate-slide-up relative z-50">
    {presetTimes.map((minutes) => (
      <button
        key={minutes}
        onClick={() => onSelect(minutes)}
        disabled={isDisabled}
        className={`flex-1 py-2 rounded-[4px] text-sm font-medium transition-colors disabled:opacity-50 ${
          currentMinutes === minutes
            ? "bg-app-accent-primary text-white"
            : "bg-app-card-light dark:bg-app-card-dark text-app-text-primary-light dark:text-app-text-primary-dark hover:bg-app-hover-light dark:hover:bg-app-hover-dark"
        }`}
      >
        {minutes}m
      </button>
    ))}
  </div>
);
