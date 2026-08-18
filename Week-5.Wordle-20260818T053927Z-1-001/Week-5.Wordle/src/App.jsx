import React from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Toast from './components/Toast';
import HelpModal from './components/HelpModal';
import StatsModal from './components/StatsModal';
import { useWordle } from './hooks/useWordle';

function App() {
  const {
    solutionWord,
    currentGuess,
    pastGuesses,
    revealedGuessesCount,
    gameStatus,
    shakeRowIndex,
    toasts,
    showStats,
    setShowStats,
    showHelp,
    setShowHelp,
    stats,
    theme,
    toggleTheme,
    initGame,
    submitGuess,
    handleBackspace,
    handleKeyPress,
    keyStatuses
  } = useWordle();

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onHelpClick={() => setShowHelp(true)}
        onStatsClick={() => setShowStats(true)}
      />

      <div className="game-container">
        <GameBoard
          pastGuesses={pastGuesses}
          currentGuess={currentGuess}
          solutionWord={solutionWord}
          gameStatus={gameStatus}
          shakeRowIndex={shakeRowIndex}
          revealedGuessesCount={revealedGuessesCount}
        />

        <Keyboard
          keyStatuses={keyStatuses}
          onChar={handleKeyPress}
          onEnter={submitGuess}
          onBackspace={handleBackspace}
        />
      </div>

      <Toast toasts={toasts} />

      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)} />
      )}

      {showStats && (
        <StatsModal
          stats={stats}
          gameStatus={gameStatus}
          solutionWord={solutionWord}
          pastGuessesCount={pastGuesses.length}
          onClose={() => setShowStats(false)}
          onRestart={initGame}
        />
      )}
    </>
  );
}

export default App;
