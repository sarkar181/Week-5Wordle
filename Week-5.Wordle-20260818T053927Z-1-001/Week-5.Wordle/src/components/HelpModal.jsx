import React from 'react';

export default function HelpModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <h2 className="modal-title">How To Play</h2>
        
        <div className="help-section">
          <p>Guess the Wordle in 6 tries.</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>Each guess must be a valid 5-letter word.</li>
            <li>The color of the tiles will change to show how close your guess was to the word.</li>
          </ul>
        </div>

        <div className="help-examples">
          <h3>Examples</h3>
          
          <div className="example-item">
            <div className="example-grid">
              <div className="tile correct">W</div>
              <div className="tile">E</div>
              <div className="tile">A</div>
              <div className="tile">R</div>
              <div className="tile">Y</div>
            </div>
            <p><strong>W</strong> is in the word and in the correct spot.</p>
          </div>

          <div className="example-item">
            <div className="example-grid">
              <div className="tile">P</div>
              <div className="tile present">I</div>
              <div className="tile">L</div>
              <div className="tile">O</div>
              <div className="tile">T</div>
            </div>
            <p><strong>I</strong> is in the word but in the wrong spot.</p>
          </div>

          <div className="example-item">
            <div className="example-grid">
              <div className="tile">V</div>
              <div className="tile">A</div>
              <div className="tile">G</div>
              <div className="tile absent">U</div>
              <div className="tile">E</div>
            </div>
            <p><strong>U</strong> is not in the word in any spot.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
