import React from 'react';
import Row from './Row';

export default function GameBoard({ 
  pastGuesses, 
  currentGuess, 
  solutionWord, 
  gameStatus, 
  shakeRowIndex, 
  revealedGuessesCount 
}) {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    // 1. Past guesses
    if (i < pastGuesses.length) {
      const guess = pastGuesses[i];
      // A row is revealing if it is the latest guess and its reveal animation isn't finished
      const isRevealing = i === pastGuesses.length - 1 && revealedGuessesCount < pastGuesses.length;
      const isWinnerRow = gameStatus === 'WON' && i === pastGuesses.length - 1;
      
      rows.push(
        <Row
          key={i}
          guess={guess}
          solutionWord={solutionWord}
          isRevealing={isRevealing}
          isWinnerRow={isWinnerRow}
          shouldShake={false}
        />
      );
    } 
    // 2. Active typing guess row
    else if (i === pastGuesses.length) {
      const shouldShake = shakeRowIndex === i;
      rows.push(
        <Row
          key={i}
          guess={currentGuess}
          solutionWord={solutionWord}
          isRevealing={false}
          isWinnerRow={false}
          shouldShake={shouldShake}
        />
      );
    } 
    // 3. Upcoming empty rows
    else {
      rows.push(
        <Row
          key={i}
          guess=""
          solutionWord={solutionWord}
          isRevealing={false}
          isWinnerRow={false}
          shouldShake={false}
        />
      );
    }
  }

  return (
    <div className="board-container">
      <div className="board">
        {rows}
      </div>
    </div>
  );
}
