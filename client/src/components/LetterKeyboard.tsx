import { Button } from '@/components/ui/button';
import { useKeyboardCase, type KeyboardCase } from '@/hooks/useKeyboardCase';
import { playPhonicsSound, getValidLetters } from '@/lib/phonicsAudio';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface LetterKeyboardProps {
  onLetterClick?: (letter: string) => void;
  showCaseToggle?: boolean;
  className?: string;
}

/**
 * LetterKeyboard Component
 * 
 * Displays an A-Z keyboard grid with optional case toggle.
 * - Case toggle persists in localStorage
 * - Displays letters in selected case (uppercase or lowercase)
 * - Phonics audio plays the same regardless of case (A or a uses same audio)
 * - Touch-first, kid-friendly design with large buttons
 */
export function LetterKeyboard({
  onLetterClick,
  showCaseToggle = true,
  className = '',
}: LetterKeyboardProps) {
  const { keyboardCase, toggleCase, isLoaded } = useKeyboardCase();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const letters = getValidLetters();
  const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

  const handleLetterClick = async (letter: string) => {
    // 1. Notify parent immediately (Start Visual Transition)
    if (onLetterClick) {
      onLetterClick(displayLetter(letter));
    }

    setSelectedLetter(letter);
    setIsPlayingSound(true);

    // 2. Small delay to ensure visual appears before sound starts
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      // Play phonics sound (case-agnostic)
      await playPhonicsSound(letter);
    } catch (error) {
      console.error('Error playing phonics sound:', error);
    } finally {
      setIsPlayingSound(false);
    }
  };

  const displayLetter = (letter: string): string => {
    return keyboardCase === 'lowercase' ? letter.toLowerCase() : letter.toUpperCase();
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-40">Loading keyboard...</div>;
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Case Toggle Control */}
      {showCaseToggle && (
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
          <span className="text-sm font-semibold text-gray-700">Letter Case</span>
          <button
            onClick={toggleCase}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-400 rounded-full font-bold text-blue-600 hover:bg-blue-50 active:scale-95 transition-transform"
            aria-label={`Toggle keyboard case: currently ${keyboardCase}`}
          >
            {keyboardCase === 'uppercase' ? (
              <>
                <span className="text-lg">ABC</span>
                <ChevronDown size={18} />
              </>
            ) : (
              <>
                <span className="text-lg">abc</span>
                <ChevronUp size={18} />
              </>
            )}
          </button>
        </div>
      )}

      {/* Letter Grid — responsive: 6 cols on phone, 7 on tablet/iPad, optimized sizing */}
      <div className="grid grid-cols-6 md:grid-cols-7 gap-2 sm:gap-3">
        {letters.map((letter) => {
          const isVowel = VOWELS.has(letter.toUpperCase());
          const isActive = selectedLetter === letter && isPlayingSound;

          let btnStyle: string;
          if (isActive) {
            btnStyle = 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-600 text-white scale-110 shadow-lg';
          } else if (isVowel) {
            btnStyle = 'bg-gradient-to-br from-amber-400 to-orange-500 border-orange-600 text-white hover:from-amber-500 hover:to-orange-600 shadow-md hover:shadow-lg';
          } else {
            btnStyle = 'bg-gradient-to-br from-blue-300 to-blue-400 border-blue-500 text-white hover:from-blue-400 hover:to-blue-500 shadow-md hover:shadow-lg';
          }

          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={isPlayingSound && selectedLetter !== letter}
              className={`
                aspect-square
                flex items-center justify-center
                text-xl sm:text-2xl md:text-3xl font-bold
                rounded-xl
                border-2
                transition-all duration-200
                active:scale-95
                disabled:opacity-50
                ${btnStyle}
              `}
              aria-label={`Letter ${letter}`}
            >
              {displayLetter(letter)}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-amber-400 to-orange-500" />
          <span className="text-xs text-gray-500">Vowels</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-blue-300 to-blue-400" />
          <span className="text-xs text-gray-500">Consonants</span>
        </div>
      </div>
    </div>
  );
}
