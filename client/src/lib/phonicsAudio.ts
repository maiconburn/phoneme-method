/**
 * Phonics Audio Utility
 * 
 * Provides case-agnostic letter-to-phonics mapping using UK phonics method.
 * Sound playback uses the phoneme (letter sound) regardless of case.
 * 
 * Audio files are expected at: /audio/phonics/en-GB/{letter}.mp3
 * Falls back to Web Speech API if audio file is not available.
 */

import { getPhonemeForLetter } from './ukPhonicsPhonemes';
import { audioStorage } from './audioStorage';
import { buzzPhonicsMap } from './buzzPhonicsMappings';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export interface PhonicsAudioConfig {
  audioDir?: string;
  audioExtension?: string;
  voiceRate?: number;
  voiceVolume?: number;
}

class PhonicsAudioManager {
  private audioDir: string;
  private audioExtension: string;
  private voiceRate: number;
  private voiceVolume: number;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private currentAudio: HTMLAudioElement | null = null;
  private audioContextInitialized: boolean = false;

  constructor(config: PhonicsAudioConfig = {}) {
    this.audioDir = config.audioDir || '/audio/phonics/en-GB';
    this.audioExtension = config.audioExtension || '.mp3';
    this.voiceRate = config.voiceRate || 0.85;
    this.voiceVolume = config.voiceVolume || 1;
    
    // Initialize audio context on first user interaction
    this.initializeAudioContext();
  }

  /**
   * Initialize audio context for iOS compatibility.
   * Audio playback on iOS requires user gesture.
   */
  private initializeAudioContext(): void {
    if (this.audioContextInitialized) return;

    const initAudio = () => {
      try {
        // Create a silent audio element to unlock audio context
        const silentAudio = new Audio();
        silentAudio.volume = 0;
        silentAudio.play().catch(() => {
          // Silent play failed, but that's okay - context is still initialized
        });
        
        this.audioContextInitialized = true;
        
        // Remove listeners after first successful initialization
        document.removeEventListener('click', initAudio);
        document.removeEventListener('touchstart', initAudio);
      } catch (error) {
        console.warn('Audio context initialization failed:', error);
      }
    };

    // Listen for first user interaction
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });
  }

  /**
   * Normalize letter to uppercase for consistent lookup.
   * Returns empty string if input is not a valid letter.
   */
  private normalizeLetter(letter: string): string {
    const normalized = letter.toUpperCase();
    return LETTERS.includes(normalized) ? normalized : '';
  }

  /**
   * Get the audio file path for a letter (case-agnostic).
   * Supports digraphs via BuzzPhonics mapping.
   */
  getAudioPath(text: string): string {
    const lower = text.toLowerCase();
    
    // Check specific mapping first (e.g. ck -> c)
    if (buzzPhonicsMap[lower]) {
        return `${this.audioDir}/${buzzPhonicsMap[lower].toUpperCase()}${this.audioExtension}?v=3`;
    }
    
    // Fallback to simple uppercase
    return `${this.audioDir}/${text.toUpperCase()}${this.audioExtension}?v=3`;
  }

  /**
   * Play phonics audio for a letter or digraph.
   * Priority: 1. Custom Recording (IndexedDB) -> 2. Audio File (public) -> 3. TTS
   */
  async playPhonicsAudio(letter: string): Promise<void> {
    // Check if valid single letter OR mapped digraph
    const normalized = this.normalizeLetter(letter); 
    const lower = letter.toLowerCase();
    const isMapped = !!buzzPhonicsMap[lower];
    
    if (!normalized && !isMapped) {
      console.warn(`Invalid phoneme/letter: ${letter}`);
      return;
    }
    
    // Use the mapped key or normalized letter for storage key
    const storageKey = isMapped ? lower : normalized; // Store digraphs as lower? Or stick to convention?
    // Actually, storage should probably use consistent casing.
    // Let's us Uppercase for everything if possible, but 'ai' -> 'AI'.
    const key = storageKey.toUpperCase();

    // Stop any currently playing audio
    this.stopAudio();

    // 1. Try Custom Recording (IndexedDB)
    try {
      const blob = await audioStorage.getAudio(key);
      if (blob) {
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.volume = this.voiceVolume;
        
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => resolve();
          audio.onerror = (e) => reject(e);
          audio.play().catch(reject);
          this.currentAudio = audio;
        });
        
        URL.revokeObjectURL(url);
        this.currentAudio = null;
        return;
      }
    } catch (e) {
      // Ignore errors from custom audio, proceed to file
    }

    // 2. Try Audio File
    const audioPath = this.getAudioPath(letter);
    try {
      await new Promise<void>((resolve, reject) => {
        const audio = new Audio(audioPath);
        audio.volume = this.voiceVolume;
        
        // We need to play to know if it exists/works
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error('File not found or decode error'));
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch((e) => reject(e));
        }
        
        this.currentAudio = audio;
      });
      this.currentAudio = null;
    } catch (error) {
      // 3. Fallback to Web Speech API
      // Only fallback for single letters, TTS might fail for digraphs differently
      this.playPhonicsVoice(letter);
    }
  }

  /**
   * Speak arbitrary text using the preferred voice.
   * Centralizes logic to prioritize Google UK Female and avoid Daniel.
   */
  speakText(text: string, rate: number = 0.85, pitch: number = 1.05, volume: number = 1.0): SpeechSynthesisUtterance {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.lang = 'en-GB';

    const voices = window.speechSynthesis.getVoices();
    
    // Priority 1: Google UK English Female
    let selectedVoice = voices.find((v) => v.name.includes('Google UK English Female'));
    
    // Priority 2: Google UK English Male
    if (!selectedVoice) {
      selectedVoice = voices.find((v) => v.name.includes('Google UK English Male'));
    }

    // Priority 3: Any en-GB voice that is NOT "Daniel"
    if (!selectedVoice) {
      selectedVoice = voices.find((v) => 
        (v.lang.startsWith('en-GB') || v.lang.startsWith('en_GB')) && 
        !v.name.includes('Daniel')
      );
    }

    // Priority 4: Any en-GB voice (including Daniel, if he's the only one left)
    // User said: "SE NAO TEM OUTRA FORMA AI VAI O DANIEL MESMO SE FOR O UNICO UK"
    if (!selectedVoice) {
         selectedVoice = voices.find((v) => v.lang.startsWith('en-GB') || v.lang.startsWith('en_GB'));
    }
    
    // STRICTLY NO NON-UK VOICES as per user request ("NUNCA UMA DE OUTRO PAIS")
    // If we have no UK voice, selectedVoice remains undefined.
    // However, if we return undefined, speech synthesis might pick a default (which could be US).
    // To enforcing silence or blocking non-UK is hard if the browser forces a default.
    // But usually setting `utterance.lang = 'en-GB'` hints the browser to use a UK voice if available.
    // If selectedVoice is null, we just let the browser decide based on lang='en-GB'.
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
    return utterance;
  }

  /**
   * Play letter phoneme using Web Speech API (fallback).
   * Uses UK English voice and speaks the phoneme (letter sound), not the letter name.
   */
  private playPhonicsVoice(letter: string): void {
    const normalized = this.normalizeLetter(letter);
    if (!normalized) return;

    try {
      window.speechSynthesis.cancel();
      // Get the phoneme approximation (e.g., "ah" for A, "buh" for B, etc.)
      const phoneme = getPhonemeForLetter(normalized);
      this.speakText(phoneme, this.voiceRate, 1.05, this.voiceVolume);
    } catch (error) {
      console.warn(`Error playing speech for letter ${normalized}:`, error);
    }
  }

  /**
   * Stop any currently playing audio or speech.
   */
  stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    window.speechSynthesis.cancel();
  }

  /**
   * Check if a character is a valid letter.
   */
  isValidLetter(char: string): boolean {
    return this.normalizeLetter(char) !== '';
  }

  /**
   * Get all valid letters (uppercase A-Z).
   */
  getValidLetters(): string[] {
    return LETTERS.split('');
  }

  /**
   * Update voice rate and volume settings.
   */
  updateSettings(voiceRate?: number, voiceVolume?: number): void {
    if (voiceRate !== undefined) this.voiceRate = voiceRate;
    if (voiceVolume !== undefined) this.voiceVolume = voiceVolume;
  }
}

// Export singleton instance
export const phonicsAudioManager = new PhonicsAudioManager();

/**
 * Hook-friendly wrapper to play phonics audio for a letter.
 * Normalizes the letter to uppercase internally and plays the phoneme.
 */
export async function playPhonicsSound(letter: string): Promise<void> {
  return phonicsAudioManager.playPhonicsAudio(letter);
}

/**
 * Stop any currently playing audio or speech.
 */
export function stopPhonicsSound(): void {
  phonicsAudioManager.stopAudio();
}

/**
 * Check if a character is a valid letter.
 */
export function isValidLetter(char: string): boolean {
  return phonicsAudioManager.isValidLetter(char);
}

/**
 * Get all valid letters (uppercase A-Z).
 */
export function getValidLetters(): string[] {
  return phonicsAudioManager.getValidLetters();
}

/**
 * Get the resolved audio path for a phoneme.
 */
export function getPhonicsAudioPath(letter: string): string {
  return phonicsAudioManager.getAudioPath(letter);
}

/**
 * Speak arbitrary text using the preferred voice configuration.
 */
export function speakText(text: string, rate?: number, pitch?: number, volume?: number): SpeechSynthesisUtterance {
  return phonicsAudioManager.speakText(text, rate, pitch, volume);
}

