import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={onToggle}
      className="theme-toggle-btn"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="theme-icon-container">
        {darkMode ? (
          <Sun className="theme-icon sun-icon" size={19} />
        ) : (
          <Moon className="theme-icon moon-icon" size={19} />
        )}
      </div>
      <span className="theme-label-sr">
        {darkMode ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  );
}
