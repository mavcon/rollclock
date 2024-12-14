import React from 'react';
import { ControlButtonsProps } from '../../types/timer';

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  time,
  onStartStop,
  onReset
}) => (
  <>
    <button
      onClick={onStartStop}
      className={`flex-1 py-2 rounded-[4px] text-lg sm:text-xl font-semibold transition-all shadow-lg ${
        isRunning
          ? "bg-app-danger-primary hover:bg-app-danger-hover shadow-app-danger-primary/25"
          : "bg-app-success-primary hover:bg-app-success-hover shadow-app-success-primary/25"
      }`}
    >
      {isRunning ? "PAUSE" : time === 0 ? "START" : "RESUME"}
    </button>
    <button
      onClick={onReset}
      className="w-14 sm:w-16 py-2 rounded-[4px] text-lg sm:text-xl font-semibold bg-app-card hover:bg-app-hover transition-all"
    >
      {'\u21BB'}
    </button>
  </>
);
