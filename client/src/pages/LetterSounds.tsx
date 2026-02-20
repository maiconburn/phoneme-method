import { Button } from '@/components/ui/button';
import { LetterKeyboard } from '@/components/LetterKeyboard';
import { HelpModal } from '@/components/HelpModal';
import { playPhonicsSound } from '@/lib/phonicsAudio';
import { buzzPhonicsMap } from '@/lib/buzzPhonicsMappings';
import { ArrowLeft, RotateCcw, HelpCircle } from 'lucide-react';
import { useState } from 'react';

import { Link } from 'wouter';

/**
 * Letter Sounds Page
 * 
 * Displays an interactive keyboard for learning letter phonics.
 * - Tap letters to hear their sounds
 * - Case toggle to switch between uppercase/lowercase display
 * - Repeat button to replay the last letter sound
 * - Help button opens usage instructions modal
 */
export default function LetterSoundsPage({ onBack }: { onBack?: () => void }) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [displaySize, setDisplaySize] = useState<'normal' | 'large'>('normal');
  const [showHelp, setShowHelp] = useState(false);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setDisplaySize('large');
    // Reset display size after animation
    setTimeout(() => setDisplaySize('normal'), 600);
  };

  const handleRepeat = async () => {
    if (selectedLetter) {
      try {
        await playPhonicsSound(selectedLetter);
      } catch (error) {
        console.error('Error replaying sound:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack ? (
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to home">
                    <ArrowLeft size={24} className="text-gray-700" />
                </button>
            ) : (
                <Link href="/">
                <a className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to home">
                    <ArrowLeft size={24} className="text-gray-700" />
                </a>
                </Link>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Letter Sounds
            </h1>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle size={24} className="text-blue-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Letter Display */}
        {selectedLetter && (
          <div className="text-center mb-8 sm:mb-12">
            <div
              className={`
                inline-block
                transition-all duration-300
                ${
                  displaySize === 'large'
                    ? 'text-9xl sm:text-[150px] scale-100'
                    : 'text-7xl sm:text-9xl scale-90'
                }
              `}
            >
              {selectedLetter}
            </div>
            <p className="text-lg text-gray-600 mt-4">
              Tap a letter below to hear its sound
            </p>
          </div>
        )}

        {/* Repeat Button */}
        {selectedLetter && (
          <div className="flex justify-center mb-8">
            <Button
              onClick={handleRepeat}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg active:scale-95 transition-transform text-lg"
            >
              <RotateCcw size={20} />
              Repeat Sound
            </Button>
          </div>
        )}

        {/* Keyboard */}
        <div className="max-w-4xl mx-auto">
          <LetterKeyboard
            onLetterClick={handleLetterClick}
            showCaseToggle={true}
          />
        </div>

        {/* Digraphs Section (BuzzPhonics) */}
        <div className="max-w-4xl mx-auto mt-12 border-t border-blue-200 pt-8">
            <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">Digraphs & Trigraphs</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {Object.keys(buzzPhonicsMap)
                    .filter(k => k.length > 1) // Only multi-letter
                    .sort()
                    .map(digraph => (
                        <button
                            key={digraph}
                            onClick={async () => {
                                // 1. Visual Update
                                setSelectedLetter(digraph);
                                setDisplaySize('large');
                                setTimeout(() => setDisplaySize('normal'), 600);
                                
                                // 2. Delay for transition
                                await new Promise(r => setTimeout(r, 300));
                                
                                // 3. Audio
                                try {
                                    await playPhonicsSound(digraph);
                                } catch (e) {
                                    console.error(e);
                                }
                            }}
                            className="bg-white hover:bg-blue-50 text-blue-600 font-bold text-lg sm:text-xl py-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md active:scale-95 transition-all"
                        >
                            {digraph}
                        </button>
                    ))}
            </div>
        </div>
      </main>

      {/* Help Modal */}
      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title="How to Play"
      >
        <ol className="text-gray-700 space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center text-sm">1</span>
            <span>Tap any letter on the keyboard to hear its <strong>phonics sound</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center text-sm">2</span>
            <span>The letter will appear large on screen</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center text-sm">3</span>
            <span>Use the <strong>Repeat</strong> button to hear the sound again</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center text-sm">4</span>
            <span>Toggle <strong>ABC / abc</strong> to switch between uppercase and lowercase</span>
          </li>
        </ol>
        <div className="mt-5 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-gray-600">
            <strong>🟠 Orange keys</strong> = Vowels (A, E, I, O, U)<br />
            <strong>🔵 Blue keys</strong> = Consonants
          </p>
        </div>
      </HelpModal>
    </div>
  );
}
