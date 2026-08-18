import React from 'react';
import Tile from './Tile';
import { checkGuess } from '../utils/gameLogic';

export default function Row({ guess = '', solutionWord = '', isRevealing = false, isWinnerRow = false, shouldShake = false }) {
  const tiles = [];
  
  // 1. Past guess with evaluations
  if (solutionWord && guess.length === 5 && !isRevealing && !shouldShake) {
    const statuses = checkGuess(guess, solutionWord);
    for (let i = 0; i < 5; i++) {
      tiles.push(
        <Tile 
          key={i} 
          letter={guess[i]} 
          status={statuses[i]} 
          isRevealing={false} 
          index={i}
          isWinnerRow={isWinnerRow}
        />
      );
    }
  } 
  // 2. Currently revealing guess
  else if (isRevealing) {
    const statuses = checkGuess(guess, solutionWord);
    for (let i = 0; i < 5; i++) {
      tiles.push(
        <Tile 
          key={i} 
          letter={guess[i]} 
          status={statuses[i]} 
          isRevealing={true} 
          index={i}
          isWinnerRow={false}
        />
      );
    }
  }
  // 3. Current active typing row or error row
  else {
    for (let i = 0; i < 5; i++) {
      const letter = guess[i] || '';
      tiles.push(
        <Tile 
          key={i} 
          letter={letter} 
          status={letter ? 'empty' : 'empty'} 
          isRevealing={false} 
          index={i}
          isWinnerRow={false}
        />
      );
    }
  }

  return (
    <div className={`board-row ${shouldShake ? 'shake' : ''}`}>
      {tiles}
    </div>
  );
}
