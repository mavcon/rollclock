import React from 'react';
import { TimerDisplayProps } from '../../types/timer';

// Note: Do not modify the timer functionality when fixing display issues
// Timer resume functionality is handled in useTimer.ts
export const TimerDisplay: React.FC<TimerDisplayProps> = ({
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
  <div className="flex items-center h-[22vw] sm:h-[26vw]">
    {isEditing ? (
      <input
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onEdit(e.target.value)}
        onBlur={onEditEnd}
        className={`w-[28vw] sm:w-[32vw] bg-transparent text-center outline-none font-mono text-[28vw] sm:text-[32vw] font-bold leading-none m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
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
