import React from 'react';

const ROW1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const ROW2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const ROW3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];

export default function Keyboard({ keyStatuses, onChar, onEnter, onBackspace }) {
  
  const handleKeyClick = (e, key) => {
    // Prevent focus trapping which causes duplicate physical Enter key presses
    e.currentTarget.blur();
    
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACK') {
      onBackspace();
    } else {
      onChar(key);
    }
  };

  const renderKey = (key) => {
    const isWide = key === 'ENTER' || key === 'BACK';
    const status = keyStatuses[key]; // 'correct' | 'present' | 'absent' | undefined
    
    let keyClass = 'key';
    if (isWide) keyClass += ' key-wide';
    if (status) keyClass += ` ${status}`;

    return (
      <button
        key={key}
        className={keyClass}
        onClick={(e) => handleKeyClick(e, key)}
      >
        {key === 'BACK' ? (
          // SVG for backspace icon
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" />
          </svg>
        ) : (
          key
        )}
      </button>
    );
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
        {ROW1.map(renderKey)}
      </div>
      <div className="keyboard-row">
        {ROW2.map(renderKey)}
      </div>
      <div className="keyboard-row">
        {ROW3.map(renderKey)}
      </div>
    </div>
  );
}
