import { useEffect } from 'react';

/**
 * Hook to initialize audio context on component mount.
 * This enables audio playback on iOS and other devices that require user gesture.
 * 
 * Should be called in the main App component or a top-level layout component.
 */
export function useAudioInit(): void {
  useEffect(() => {
    let initialized = false;

    const initializeAudio = async () => {
      if (initialized) return;

      try {
        // Try to play a silent audio to unlock audio context
        const silentAudio = new Audio();
        silentAudio.volume = 0;
        
        // Attempt to play
        const playPromise = silentAudio.play();
        if (playPromise !== undefined) {
          await playPromise.catch(() => {
            // Silent play failed, but audio context may still be initialized
          });
        }

        // Also initialize Web Speech API
        if ('speechSynthesis' in window) {
          // Load voices asynchronously
          if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
              // Voices are now loaded
            };
          }
        }

        initialized = true;
      } catch (error) {
        console.warn('Audio initialization error:', error);
      }
    };

    // Initialize on first user interaction
    const handleUserInteraction = () => {
      initializeAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    // Cleanup
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);
}
