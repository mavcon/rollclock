import React from 'react';
import { RestTimeControlsProps } from '../../types/timer';

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
      type="number"
      value={value}
      disabled={isDisabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-12 text-lg sm:text-xl text-center bg-transparent outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
      min="0"
      step="0.1"
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
