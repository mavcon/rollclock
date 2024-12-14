import React from 'react';
import { PresetTimesProps } from '../../types/timer';

export const PresetTimes: React.FC<PresetTimesProps> = ({
  presetTimes,
  currentMinutes,
  isDisabled,
  onSelect
}) => (
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 animate-slide-up mb-2">
    {presetTimes.map((mins) => (
      <button
        key={mins}
        onClick={() => onSelect(mins)}
        disabled={isDisabled}
        className={`py-1.5 rounded-[4px] text-base sm:text-lg font-medium transition-all ${
          currentMinutes === mins
            ? "bg-app-accent-primary text-white shadow-lg shadow-app-accent-primary/25"
            : "bg-app-card hover:bg-app-hover text-app-text-primary"
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {mins}m
      </button>
    ))}
  </div>
);
