import { WordBuilder } from '@/components/WordBuilder';
import { HelpModal } from '@/components/HelpModal';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { useState } from 'react';

import { Link } from 'wouter';

/**
 * Build a Word Page
 * 
 * Allows users to compose words using the letter keyboard.
 * - Word Challenge mode with confetti celebration
 * - Help button in header opens usage instructions
 */
export default function BuildAWordPage({ onBack }: { onBack?: () => void }) {
  const [currentWord, setCurrentWord] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-orange-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack ? (
                <button onClick={onBack} className="p-2 hover:bg-orange-100 rounded-full transition-colors text-orange-600" aria-label="Back to home">
                    <ArrowLeft size={28} />
                </button>
            ) : (
                <Link href="/">
                <a className="p-2 hover:bg-orange-100 rounded-full transition-colors text-orange-600" aria-label="Back to home">
                    <ArrowLeft size={28} />
                </a>
                </Link>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Build a Word
            </h1>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle size={24} className="text-purple-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Word Builder Component */}
        <div className="max-w-4xl mx-auto">
          <WordBuilder
            onWordChange={setCurrentWord}
            speakAsYouType={false}
          />
        </div>
      </main>

      {/* Help Modal */}
      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title="How to Build Words"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">✏️ Free Typing</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Tap letters to build your word</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Each letter plays its <strong>phoneme sound</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Press <strong>Speak</strong> to hear the full word</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Use <strong>Space</strong> between words</span>
              </li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="font-bold text-gray-800 mb-2">🎮 Word Challenge</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-purple-600 font-bold">1.</span>
                <span>Tap <strong>Generate</strong> to get a random word</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600 font-bold">2.</span>
                <span>Tap the 🔊 button to hear how it sounds</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600 font-bold">3.</span>
                <span>Copy the word by tapping the letters</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600 font-bold">4.</span>
                <span>Press <strong>Speak</strong> — if correct, you get 🎊 confetti!</span>
              </li>
            </ul>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-600">
              <strong>🟠 Orange keys</strong> = Vowels (A, E, I, O, U)<br />
              <strong>🩷 Pink keys</strong> = Consonants
            </p>
          </div>
        </div>
      </HelpModal>
    </div>
  );
}
