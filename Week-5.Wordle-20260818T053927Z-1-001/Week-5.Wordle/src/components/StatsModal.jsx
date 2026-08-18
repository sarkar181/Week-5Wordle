import React from 'react';

export default function StatsModal({ stats, gameStatus, solutionWord, pastGuessesCount, onClose, onRestart }) {
  const played = stats.played;
  const winPercent = played > 0 ? Math.round((stats.wins / played) * 100) : 0;
  
  // Find maximum guess frequency to calculate relative bar widths
  const maxGuessCount = Math.max(...Object.values(stats.guesses), 1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <h2 className="modal-title">Statistics</h2>

        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-number">{played}</div>
            <div className="stat-label">Played</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{winPercent}</div>
            <div className="stat-label">Win %</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{stats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{stats.maxStreak}</div>
            <div className="stat-label">Max Streak</div>
          </div>
        </div>

        <h3 className="modal-title" style={{ fontSize: '16px', marginBottom: '12px' }}>Guess Distribution</h3>
        <div className="distribution-container">
          {[1, 2, 3, 4, 5, 6].map(guessNum => {
            const count = stats.guesses[guessNum] || 0;
            // Calculate percentage width (min width is 8% for 0 guesses to look clean)
            const percentWidth = played > 0 ? Math.max(8, (count / maxGuessCount) * 100) : 8;
            
            // Highlight if this row was the winning attempt for the current game
            const isCurrentWinRow = gameStatus === 'WON' && pastGuessesCount === guessNum;

            return (
              <div key={guessNum} className="distribution-row">
                <div className="dist-index">{guessNum}</div>
                <div 
                  className={`dist-bar ${isCurrentWinRow ? 'highlight' : ''}`}
                  style={{ width: `${percentWidth}%` }}
                >
                  {count}
                </div>
              </div>
            );
          })}
        </div>

        {gameStatus !== 'IN_PROGRESS' && (
          <div className="action-row">
            {gameStatus === 'LOST' && (
              <div className="solution-reveal">
                The word was
                <span>{solutionWord}</span>
              </div>
            )}
            <button className="btn-primary" onClick={onRestart}>
              Play Again
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
