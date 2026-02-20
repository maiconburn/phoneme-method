import { useKeyboardCase } from '@/hooks/useKeyboardCase';
import { playPhonicsSound, getValidLetters, speakText } from '@/lib/phonicsAudio';
import { getPhonemeForLetter } from '@/lib/ukPhonicsPhonemes';
import { getRandomWord, type ChallengeWord } from '@/data/wordList';
import { Trash2, Volume2, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

interface WordBuilderProps {
  onWordChange?: (word: string) => void;
  speakAsYouType?: boolean;
  className?: string;
}

/**
 * WordBuilder Component
 * 
 * Allows users to compose text using a letter keyboard.
 * - Word Challenge mode: generate a random word, child copies it
 * - When correct + Speak pressed: confetti + applause!
 * - Phonics sound plays on each letter tap
 * - Case-agnostic comparison for challenge mode
 */
export function WordBuilder({
  onWordChange,
  speakAsYouType = false,
  className = '',
}: WordBuilderProps) {
  const { keyboardCase, toggleCase } = useKeyboardCase();
  const [word, setWord] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastPlayedLetter, setLastPlayedLetter] = useState<string | null>(null);

  // Challenge mode state
  const [challengeWord, setChallengeWord] = useState<ChallengeWord | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const applauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const letters = getValidLetters();
  const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

  const handleLetterClick = async (letter: string) => {
    const displayLetter = keyboardCase === 'lowercase' ? letter.toLowerCase() : letter.toUpperCase();
    const newWord = word + displayLetter;
    setWord(newWord);
    setLastPlayedLetter(letter);

    if (onWordChange) {
      onWordChange(newWord);
    }

    // Always play phoneme sound when tapping a letter
    try {
      await playPhonicsSound(letter);
    } catch (error) {
      console.error('Error playing phonics sound:', error);
    }
  };

  const handleBackspace = () => {
    const newWord = word.slice(0, -1);
    setWord(newWord);
    if (onWordChange) {
      onWordChange(newWord);
    }
  };

  const handleClear = () => {
    setWord('');
    setLastPlayedLetter(null);
    setShowSuccess(false);
    if (onWordChange) {
      onWordChange('');
    }
  };

  const handleSpace = () => {
    const newWord = word + ' ';
    setWord(newWord);
    setLastPlayedLetter(null);
    if (onWordChange) {
      onWordChange(newWord);
    }
  };

  // Fire confetti + applause
  const celebrate = useCallback(() => {
    setShowSuccess(true);

    // Confetti burst from both sides
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6eb4'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6eb4'],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big center burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6eb4'],
    });

    // Play applause with TTS
    try {
      speakText('Well done! Amazing!', 0.9, 1.2, 1);
    } catch (e) {
      console.error('Error playing applause:', e);
    }

    // Auto-reset after celebration
    if (applauseTimeoutRef.current) clearTimeout(applauseTimeoutRef.current);
    applauseTimeoutRef.current = setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  }, []);

  const handleSpeak = async () => {
    if (!word) return;

    setIsSpeaking(true);
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // For a single letter, play its phoneme sound
      if (word.trim().length === 1) {
        const phoneme = getPhonemeForLetter(word.trim());
        const utterance = speakText(phoneme, 0.85, 1.05, 1);

        utterance.onend = () => {
          setIsSpeaking(false);
          checkChallenge();
        };
        utterance.onerror = () => setIsSpeaking(false);
      } else {
        // For multiple letters, read the combined word as a whole
        // IMPORTANT: lowercase so TTS reads as syllable, not abbreviation
        const textToSpeak = word.toLowerCase().trim();
        const utterance = speakText(textToSpeak, 0.75, 1.05, 1);

        utterance.onend = () => {
          setIsSpeaking(false);
          checkChallenge();
        };
        utterance.onerror = () => setIsSpeaking(false);
      }
    } catch (error) {
      console.error('Error speaking word:', error);
      setIsSpeaking(false);
    }
  };

  // Check if the typed word matches the challenge word
  const checkChallenge = () => {
    if (!challengeWord) return;
    const typed = word.trim().toLowerCase();
    const target = challengeWord.word.toLowerCase();
    if (typed === target) {
      celebrate();
    }
  };

  // Generate a new challenge word
  const handleGenerate = () => {
    const newWord = getRandomWord(challengeWord?.word);
    setChallengeWord(newWord);
    setWord('');
    setLastPlayedLetter(null);
    setShowSuccess(false);
    if (onWordChange) {
      onWordChange('');
    }
  };

  // Speak the challenge word so the child can hear the target
  const handleHearChallenge = () => {
    if (!challengeWord) return;
    window.speechSynthesis.cancel();
    speakText(challengeWord.word.toLowerCase(), 0.7, 1.1, 1);
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Challenge Word Display */}
      {challengeWord && (
        <div className={`rounded-2xl border-3 p-5 text-center transition-all duration-300 ${
          showSuccess
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-400 shadow-lg shadow-green-200/50'
            : 'bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 shadow-md'
        }`}>
          <p className="text-sm font-bold text-gray-500 mb-2">
            {showSuccess ? '🎉 Correct! Well done!' : '📝 Copy this word:'}
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl sm:text-6xl">{challengeWord.emoji}</span>
            <span className="text-4xl sm:text-6xl font-extrabold text-gray-800 tracking-widest">
              {keyboardCase === 'lowercase' ? challengeWord.word.toLowerCase() : challengeWord.word.toUpperCase()}
            </span>
            <button
              onClick={handleHearChallenge}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg active:scale-90 transition-all border-2 border-indigo-200"
              aria-label="Hear the word"
            >
              <Volume2 size={22} className="text-indigo-600" />
            </button>
          </div>
          {showSuccess && (
            <p className="text-xl font-extrabold text-green-600 mt-3 animate-bounce">
              ⭐ Amazing! ⭐
            </p>
          )}
        </div>
      )}

      {/* Word Display + Speak Button (side by side) */}
      <div className="flex items-stretch gap-3">
        {/* Word Display */}
        <div className="flex-1 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-3 border-yellow-300 p-4 sm:p-6 min-h-20 flex items-center justify-center shadow-inner">
          <div className="text-3xl sm:text-5xl font-extrabold text-gray-800 break-words text-center tracking-wide">
            {word || <span className="text-gray-300 text-xl sm:text-2xl font-bold">Tap letters below ✨</span>}
          </div>
        </div>
        {/* Speak Button - big and next to word */}
        <button
          onClick={handleSpeak}
          disabled={!word || isSpeaking}
          className="flex flex-col items-center justify-center gap-1 px-5 sm:px-7 bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-2xl border-3 border-green-700 disabled:border-gray-500 active:scale-95 transition-all shadow-lg disabled:shadow-none"
          aria-label="Speak word"
        >
          <Volume2 size={28} />
          <span className="text-xs font-bold">Speak</span>
        </button>
      </div>

      {/* Generate Button - fun standalone */}
      <button
        onClick={handleGenerate}
        className="w-full py-3 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-600 hover:via-fuchsia-600 hover:to-pink-600 text-white font-extrabold text-lg rounded-2xl border-3 border-purple-700 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
      >
        <Sparkles size={22} />
        🎲 Generate Word
      </button>

      {/* Unified Keyboard: Letters + Backspace/Clear + Space */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {/* Letter Keys */}
        {letters.map((letter) => {
          const isVowel = VOWELS.has(letter.toUpperCase());
          const isActive = lastPlayedLetter === letter;

          let btnStyle: string;
          if (isActive) {
            btnStyle = 'bg-gradient-to-br from-purple-400 to-purple-600 border-purple-700 text-white scale-110 shadow-lg shadow-purple-300/50';
          } else if (isVowel) {
            btnStyle = 'bg-gradient-to-br from-amber-400 to-orange-500 border-orange-600 text-white hover:from-amber-500 hover:to-orange-600 shadow-md hover:shadow-lg';
          } else {
            btnStyle = 'bg-gradient-to-br from-pink-300 to-pink-400 border-pink-500 text-white hover:from-pink-400 hover:to-pink-500 shadow-md hover:shadow-lg';
          }

          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={`
                aspect-square
                flex items-center justify-center
                text-xl sm:text-2xl md:text-3xl font-extrabold
                rounded-2xl
                border-2
                transition-all duration-150
                active:scale-90
                ${btnStyle}
              `}
              aria-label={`Letter ${letter}`}
            >
              {keyboardCase === 'lowercase' ? letter.toLowerCase() : letter.toUpperCase()}
            </button>
          );
        })}

        {/* Backspace — visually distinct */}
        <button
          onClick={handleBackspace}
          disabled={!word}
          className="aspect-square flex flex-col items-center justify-center gap-0.5 bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 disabled:from-gray-200 disabled:to-gray-300 text-white disabled:text-gray-400 font-extrabold rounded-2xl border-3 border-orange-800 disabled:border-gray-300 active:scale-90 transition-all shadow-lg disabled:shadow-none"
          aria-label="Backspace"
        >
          <span className="text-2xl sm:text-3xl">←</span>
        </button>

        {/* Clear — visually distinct */}
        <button
          onClick={handleClear}
          disabled={!word}
          className="aspect-square flex flex-col items-center justify-center gap-0.5 bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 disabled:from-gray-200 disabled:to-gray-300 text-white disabled:text-gray-400 font-extrabold rounded-2xl border-3 border-red-800 disabled:border-gray-300 active:scale-90 transition-all shadow-lg disabled:shadow-none"
          aria-label="Clear"
        >
          <Trash2 size={24} />
        </button>

        {/* Space Bar — spans full width at bottom */}
        <button
          onClick={handleSpace}
          className="col-span-7 py-3 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-extrabold text-base rounded-2xl border-2 border-blue-600 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
          aria-label="Space"
        >
          ␣ Space
        </button>
      </div>

      {/* Case Toggle + Legend — compact row */}
      <div className="flex items-center justify-between">
        <button
          onClick={toggleCase}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-blue-300 rounded-full font-bold text-blue-600 hover:bg-blue-50 active:scale-95 transition-transform text-sm shadow-sm"
          aria-label={`Toggle keyboard case: currently ${keyboardCase}`}
        >
          {keyboardCase === 'uppercase' ? (
            <>
              <span>ABC</span>
              <ChevronDown size={14} />
            </>
          ) : (
            <>
              <span>abc</span>
              <ChevronUp size={14} />
            </>
          )}
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-amber-400 to-orange-500" />
            <span className="text-xs text-gray-500">Vowels</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-pink-300 to-pink-400" />
            <span className="text-xs text-gray-500">Consonants</span>
          </div>
        </div>
      </div>
    </div>
  );
}
