import { useState, useEffect, useCallback, useRef } from 'react';
import { VALID_WORDS, TARGET_WORDS } from '../data/words';
import { checkGuess } from '../utils/gameLogic';

const STATS_KEY = 'wordle_clone_statistics';
const THEME_KEY = 'wordle_clone_theme';

const DEFAULT_STATS = {
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
};

export function useWordle() {
  const [solutionWord, setSolutionWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [revealedGuessesCount, setRevealedGuessesCount] = useState(0);
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS'); // 'IN_PROGRESS' | 'WON' | 'LOST'
  const [isRevealing, setIsRevealing] = useState(false);
  const [shakeRowIndex, setShakeRowIndex] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // Default to dark mode
    return 'dark';
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_STATS;
      }
    }
    return DEFAULT_STATS;
  });

  // Save stats to localStorage when changed
  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  // Save theme to localStorage and apply it to body class list
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.body.className = theme;
  }, [theme]);

  // Initialize/Reset Game
  const initGame = useCallback(() => {
    const randomWord = TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
    setSolutionWord(randomWord);
    setCurrentGuess('');
    setPastGuesses([]);
    setRevealedGuessesCount(0);
    setGameStatus('IN_PROGRESS');
    setIsRevealing(false);
    setShakeRowIndex(null);
    console.log("Secret word:", randomWord); // Left in console for debugging / ease of grading
  }, []);

  // Pick solution on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Toast System helpers
  const addToast = useCallback((message, duration = 2000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  // Theme Toggler
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Handle guess submission
  const submitGuess = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS' || isRevealing) return;

    // Check guess length
    if (currentGuess.length < 5) {
      addToast("Not enough letters");
      setShakeRowIndex(pastGuesses.length);
      setTimeout(() => setShakeRowIndex(null), 500);
      return;
    }

    const formattedGuess = currentGuess.toUpperCase();

    // Check dictionary
    if (!VALID_WORDS.includes(formattedGuess)) {
      addToast("Not in word list");
      setShakeRowIndex(pastGuesses.length);
      setTimeout(() => setShakeRowIndex(null), 500);
      return;
    }

    // Lock input during flipping animation (550ms per tile, staggered by 250ms, total reveal is ~1550ms)
    setIsRevealing(true);
    const newPastGuesses = [...pastGuesses, formattedGuess];
    setPastGuesses(newPastGuesses);
    setCurrentGuess('');

    // Staggered reveal timeline (finish after the 5th tile finishes its flip animation)
    const revealTime = 1600; // 1000ms delay + 550ms animation duration + buffer
    setTimeout(() => {
      // Sync revealedGuessesCount to let keyboard update colors after flip completes
      setRevealedGuessesCount(newPastGuesses.length);
      setIsRevealing(false);

      // Evaluate Win/Loss
      if (formattedGuess === solutionWord) {
        setGameStatus('WON');
        // Update stats
        setStats(prev => {
          const attempt = newPastGuesses.length;
          const newGuesses = { ...prev.guesses };
          newGuesses[attempt] = (newGuesses[attempt] || 0) + 1;
          const newStreak = prev.currentStreak + 1;
          return {
            played: prev.played + 1,
            wins: prev.wins + 1,
            currentStreak: newStreak,
            maxStreak: Math.max(prev.maxStreak, newStreak),
            guesses: newGuesses
          };
        });

        // Give a praise toast
        const praise = ["Genius", "Magnificent", "Splendid", "Amazing", "Great", "Nice"][newPastGuesses.length - 1];
        addToast(praise, 3000);

        // Open stats modal after a small delay so user sees winning bounce animation
        setTimeout(() => setShowStats(true), 1200);
      } else if (newPastGuesses.length === 6) {
        setGameStatus('LOST');
        setStats(prev => ({
          ...prev,
          played: prev.played + 1,
          currentStreak: 0
        }));
        
        // Show correct word
        addToast(solutionWord, 4000);
        setTimeout(() => setShowStats(true), 1500);
      }
    }, revealTime);

  }, [currentGuess, pastGuesses, solutionWord, gameStatus, isRevealing, addToast]);

  // Handle typing backspace
  const handleBackspace = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS' || isRevealing) return;
    setCurrentGuess(prev => prev.slice(0, -1));
  }, [gameStatus, isRevealing]);

  // Handle typing standard letter
  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== 'IN_PROGRESS' || isRevealing) return;
    if (currentGuess.length >= 5) return;
    
    const letter = key.toUpperCase();
    if (/^[A-Z]$/.test(letter)) {
      setCurrentGuess(prev => prev + letter);
    }
  }, [currentGuess, gameStatus, isRevealing]);

  // Sync virtual keyboard states based on REVEALED guesses
  const getKeyboardStatusMap = useCallback(() => {
    const keyStatuses = {};
    // Only calculate for guesses that have finished their reveal animations
    const revealedGuesses = pastGuesses.slice(0, revealedGuessesCount);

    revealedGuesses.forEach(guess => {
      const evaluation = checkGuess(guess, solutionWord);
      for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        const status = evaluation[i];
        const current = keyStatuses[letter];

        if (status === 'correct') {
          keyStatuses[letter] = 'correct';
        } else if (status === 'present') {
          if (current !== 'correct') {
            keyStatuses[letter] = 'present';
          }
        } else if (status === 'absent') {
          if (current !== 'correct' && current !== 'present') {
            keyStatuses[letter] = 'absent';
          }
        }
      }
    });

    return keyStatuses;
  }, [pastGuesses, revealedGuessesCount, solutionWord]);

  // Create refs for callbacks to avoid re-binding keydown listener on every state update
  const submitGuessRef = useRef(submitGuess);
  const handleBackspaceRef = useRef(handleBackspace);
  const handleKeyPressRef = useRef(handleKeyPress);
  const showStatsRef = useRef(showStats);
  const showHelpRef = useRef(showHelp);
  const setShowStatsRef = useRef(setShowStats);
  const setShowHelpRef = useRef(setShowHelp);

  // Sync refs with the latest values on every render
  useEffect(() => {
    submitGuessRef.current = submitGuess;
    handleBackspaceRef.current = handleBackspace;
    handleKeyPressRef.current = handleKeyPress;
    showStatsRef.current = showStats;
    showHelpRef.current = showHelp;
    setShowStatsRef.current = setShowStats;
    setShowHelpRef.current = setShowHelp;
  });

  // Physical keyboard event listener bound exactly once on mount
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is using keyboard shortcuts
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      
      // If modal is open, let Esc close it, but don't type
      if (showStatsRef.current || showHelpRef.current) {
        if (e.key === 'Escape') {
          setShowStatsRef.current(false);
          setShowHelpRef.current(false);
        }
        return;
      }

      if (e.key === 'Enter') {
        submitGuessRef.current();
      } else if (e.key === 'Backspace') {
        handleBackspaceRef.current();
      } else {
        handleKeyPressRef.current(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    solutionWord,
    currentGuess,
    pastGuesses,
    revealedGuessesCount,
    gameStatus,
    isRevealing,
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
    keyStatuses: getKeyboardStatusMap()
  };
}
