import React from 'react';
import { ControlButtonsProps } from '../../types/timer';

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  time,
  onStartStop,
  onReset
}) => (
  <div className="grid grid-cols-[1fr_auto] gap-2 h-full flex-[3]">
    <button
      onClick={onStartStop}
      disabled={time === 0}
      className={`h-full flex-1 rounded-[4px] text-white text-[min(3.4vw,8vh)] font-medium transition-colors disabled:opacity-50 flex items-center justify-center ${
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
      className="bg-app-card-light dark:bg-app-card-dark hover:bg-app-hover-light dark:hover:bg-app-hover-dark text-app-text-primary-light dark:text-app-text-primary-dark rounded-[4px] h-full aspect-square transition-colors disabled:opacity-50 flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[min(3.4vw,8vh)] h-[min(3.4vw,8vh)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    </button>
  </div>
);
