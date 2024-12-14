import React from 'react';
import { RestTimeControlsProps } from '../../types/timer';

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

export const RestTimeControls: React.FC<RestTimeControlsProps> = ({
  value,
  isDisabled,
  onIncrement,
  onDecrement,
  onChange
}) => (
  <div className="bg-app-card rounded-[4px] px-[2vw] py-2 flex items-center gap-[2vw]">
    <button
      onClick={onIncrement}
      disabled={isDisabled}
      className="text-xl text-app-text-secondary hover:text-app-text-primary transition-colors disabled:opacity-50"
    >
      {'\u25B2'}
    </button>
    <input
      type="text"
      value={formatRestTime(value)}
      disabled={isDisabled}
      onChange={(e) => onChange(parseRestTime(e.target.value))}
      className="w-16 text-lg sm:text-xl text-center bg-transparent outline-none transition-colors disabled:opacity-50"
    />
    <button
      onClick={onDecrement}
      disabled={isDisabled}
      className="text-xl text-app-text-secondary hover:text-app-text-primary transition-colors disabled:opacity-50"
    >
      {'\u25BC'}
    </button>
  </div>
);
