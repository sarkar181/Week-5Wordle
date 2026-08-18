import React from 'react';

export default function Tile({ letter, status, isRevealing, index, isWinnerRow }) {
  let classes = 'tile';
  const styles = {};

  // Pop class if letter is typed but not submitted
  if (letter && (!status || status === 'empty')) {
    classes += ' pop';
  }

  // Animation states
  if (isRevealing) {
    classes += ` revealing delay-${index}`;
    
    // Map status to css variables for background color change at midpoint of 3D flip
    if (status === 'correct') {
      styles['--color-target'] = 'var(--color-correct)';
    } else if (status === 'present') {
      styles['--color-target'] = 'var(--color-present)';
    } else if (status === 'absent') {
      styles['--color-target'] = 'var(--color-absent)';
    }
  } else if (status && status !== 'empty') {
    classes += ` ${status}`;
    
    // Apply winning bounce wave animation
    if (isWinnerRow && status === 'correct') {
      classes += ` bounce delay-${index}`;
    }
  }

  return (
    <div className={classes} style={styles}>
      {letter}
    </div>
  );
}
