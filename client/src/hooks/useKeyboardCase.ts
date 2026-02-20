import { useState, useEffect } from 'react';

const KEYBOARD_CASE_KEY = 'abc-keyboard-case';

export type KeyboardCase = 'uppercase' | 'lowercase';

/**
 * Custom hook for managing keyboard case state with localStorage persistence.
 * 
 * - Defaults to 'uppercase' on first load
 * - Persists selected case in localStorage
 * - Restores case from localStorage on component mount
 * - Provides toggle function to switch between cases
 */
export function useKeyboardCase() {
  const [keyboardCase, setKeyboardCase] = useState<KeyboardCase>('uppercase');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load case from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEYBOARD_CASE_KEY) as KeyboardCase | null;
      if (stored === 'uppercase' || stored === 'lowercase') {
        setKeyboardCase(stored);
      }
    } catch (error) {
      console.warn('Failed to load keyboard case from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save case to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(KEYBOARD_CASE_KEY, keyboardCase);
      } catch (error) {
        console.warn('Failed to save keyboard case to localStorage:', error);
      }
    }
  }, [keyboardCase, isLoaded]);

  const toggleCase = () => {
    setKeyboardCase((prev) => (prev === 'uppercase' ? 'lowercase' : 'uppercase'));
  };

  return {
    keyboardCase,
    setKeyboardCase,
    toggleCase,
    isLoaded,
  };
}
