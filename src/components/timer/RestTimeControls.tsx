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
  onChange,
  isDarkMode,
  onThemeToggle
}) => (
  <div className="flex items-stretch gap-1">
    <button
      onClick={onThemeToggle}
      className="bg-app-card-light dark:bg-app-card-dark hover:bg-app-hover-light dark:hover:bg-app-hover-dark text-app-text-primary-light dark:text-app-text-primary-dark rounded-[4px] px-3 h-[45px] transition-colors flex items-center justify-center"
    >
      {isDarkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
    <div className="bg-app-card-light dark:bg-app-card-dark rounded-[4px] flex items-center h-[45px]">
      <button
        onClick={onIncrement}
        disabled={isDisabled}
        className="text-xl text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 px-2 h-full flex items-center"
      >
        {'\u25B2'}
      </button>
      <input
        type="text"
        value={formatRestTime(value)}
        disabled={isDisabled}
        onChange={(e) => onChange(parseRestTime(e.target.value))}
        className="w-12 text-lg sm:text-xl text-center bg-transparent outline-none transition-colors disabled:opacity-50 leading-none"
      />
      <button
        onClick={onDecrement}
        disabled={isDisabled}
        className="text-xl text-app-text-secondary-light dark:text-app-text-secondary-dark hover:text-app-text-primary-light dark:hover:text-app-text-primary-dark transition-colors disabled:opacity-50 px-2 h-full flex items-center"
      >
        {'\u25BC'}
      </button>
    </div>
  </div>
);
