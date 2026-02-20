import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import LetterSoundsPage from './LetterSounds';
import BuildAWordPage from './BuildAWord';

type PageType = 'home' | 'letterSounds' | 'buildAWord';

/**
 * Home Page
 * 
 * Main navigation hub for the ABC - Lívia app.
 * Provides access to:
 * 1. Letter Sounds - Learn individual letter phonics
 * 2. Build a Word - Compose words using the keyboard
 */
export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  if (currentPage === 'letterSounds') {
    return (
      <LetterSoundsPage onBack={() => setCurrentPage('home')} />
    );
  }

  if (currentPage === 'buildAWord') {
    return (
      <BuildAWordPage onBack={() => setCurrentPage('home')} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ABC
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12 flex-grow">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Welcome to ABC!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Learn phonics and build words with fun sounds.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">
          {/* Letter Sounds Card */}
          <button
            onClick={() => setCurrentPage('letterSounds')}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">🔤</div>
              <h2 className="text-3xl font-bold text-white mb-2">Letter Sounds</h2>
              <p className="text-blue-100">
                Tap letters to hear their phonics sounds
              </p>
            </div>
          </button>

          {/* Build a Word Card */}
          <button
            onClick={() => setCurrentPage('buildAWord')}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">✏️</div>
              <h2 className="text-3xl font-bold text-white mb-2">Build a Word</h2>
              <p className="text-purple-100">
                Compose words and hear them spoken
              </p>
            </div>
          </button>
        </div>


      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-400 w-full mt-auto opacity-60 hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-center items-center gap-4">
          <p>
            Made with ❤️ by{' '}
            <a 
              href="https://maicon-esteves.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-purple-600 border-b border-dotted border-gray-400 hover:border-purple-600 transition-colors"
            >
              Maicon Esteves
            </a>
          </p>
          <span className="text-gray-300">•</span>
          <a 
            href="https://revolut.me/maiconburn" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <span>☕</span>
            <span>Support</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
