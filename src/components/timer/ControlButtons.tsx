import React from 'react';
import { ControlButtonsProps } from '../../types/timer';

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  time,
  onStartStop,
  onReset
}) => (
  <div className="flex gap-1 flex-1">
    <button
      onClick={onStartStop}
      disabled={time === 0}
      className={`flex-1 h-[45px] rounded-[4px] text-white font-medium transition-colors disabled:opacity-50 ${
        isRunning
          ? "bg-app-danger-primary hover:bg-app-danger-hover"
          : "bg-app-success-primary hover:bg-app-success-hover"
      }`}
    >
      {isRunning ? "STOP" : "START"}
    </button>
    <button
      onClick={onReset}
      disabled={time === 0}
      className="bg-app-card-light dark:bg-app-card-dark hover:bg-app-hover-light dark:hover:bg-app-hover-dark text-app-text-primary-light dark:text-app-text-primary-dark rounded-[4px] w-14 h-[45px] transition-colors disabled:opacity-50 flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    </button>
  </div>
);
