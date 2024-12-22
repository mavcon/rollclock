import React from 'react';
import { TimerDisplayProps } from '../../types/timer';

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
  isFlashing
}) => {
  const formattedValue = value.toString().padStart(2, '0');

  if (isEditing && !isRunning) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onEdit(e.target.value)}
        onBlur={onEditEnd}
        className={`w-full bg-transparent text-center outline-none font-mono text-[min(30vw,60vh)] leading-[1] font-bold p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
          isResting ? 'text-blue-300' : 'text-app-text-primary-light dark:text-app-text-primary-dark'
        }`}
        min="0"
        max={max}
        autoFocus
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <span
        onClick={() => !isRunning && onEditStart()}
        className={`cursor-pointer select-none font-mono text-[min(30vw,60vh)] leading-[1] font-bold ${
          isFlashing ? 'animate-flash' : ''
        } ${isResting ? 'text-blue-300' : 'text-app-text-primary-light dark:text-app-text-primary-dark'}`}
      >
        {formattedValue}
      </span>
    </div>
  );
};
