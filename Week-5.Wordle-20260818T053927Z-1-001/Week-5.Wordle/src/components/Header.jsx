import React from 'react';

export default function Header({ theme, toggleTheme, onHelpClick, onStatsClick }) {
  return (
    <header>
      <div className="header-left">
        <button 
          className="icon-btn" 
          onClick={onHelpClick}
          aria-label="How to play"
          title="How to Play"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
          </svg>
        </button>
      </div>

      <h1>Wordle</h1>

      <div className="header-icons">
        <button 
          className="icon-btn" 
          onClick={onStatsClick}
          aria-label="Statistics"
          title="Statistics"
        >
          <svg viewBox="0 0 24 24">
            <path d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 8h4v6H4v-6zm16 6h-4v-8h4v8z" />
          </svg>
        </button>

        <button 
          className="icon-btn" 
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? "Switch to light theme" : "Switch to dark theme"}
          title={theme === 'dark' ? "Light Mode" : "Dark Mode"}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24">
              {/* Sun icon */}
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zM5.99 18.01l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              {/* Moon icon */}
              <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.6-.1 1.2.4 1.1 1-.1.5-.4.9-.8 1.1-3.1 1.7-4.9 5-4.4 8.7.5 3.3 3.1 5.9 6.4 6.4 3.7.6 7-1.3 8.7-4.4.3-.4.7-.7 1.1-.8.6-.1 1.1.4 1 1-.9 4.7-5 8.2-9.8 8.2z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
