/**
 * Evaluates a guess against the solution word.
 * Returns an array of statuses: 'correct' | 'present' | 'absent'
 * 
 * It correctly handles duplicate letters:
 * - Green (correct) tiles are determined first.
 * - Remaining letters in the guess are marked yellow (present) only if there are
 *   unmatched occurrences of that letter remaining in the solution word.
 */
export function checkGuess(guess, solution) {
  const result = Array(5).fill('absent');
  const solutionLettersUsed = Array(5).fill(false);
  const guessLettersMatched = Array(5).fill(false);

  // First pass: look for exact matches (green)
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = 'correct';
      solutionLettersUsed[i] = true;
      guessLettersMatched[i] = true;
    }
  }

  // Second pass: look for partial matches (yellow)
  for (let i = 0; i < 5; i++) {
    if (guessLettersMatched[i]) continue;

    for (let j = 0; j < 5; j++) {
      if (!solutionLettersUsed[j] && guess[i] === solution[j]) {
        result[i] = 'present';
        solutionLettersUsed[j] = true;
        break;
      }
    }
  }

  return result;
}
