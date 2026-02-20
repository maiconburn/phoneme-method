/**
 * Curated word list for the Word Challenge feature.
 * 
 * Words are 1-3 syllables, suitable for children aged 4-5.
 * Grouped by difficulty for potential future leveling.
 */

export interface ChallengeWord {
  word: string;
  emoji: string;
}

export const WORD_LIST: ChallengeWord[] = [
  // 1-syllable words
  { word: 'cat', emoji: '🐱' },
  { word: 'dog', emoji: '🐶' },
  { word: 'sun', emoji: '☀️' },
  { word: 'mom', emoji: '👩' },
  { word: 'dad', emoji: '👨' },
  { word: 'bed', emoji: '🛏️' },
  { word: 'cup', emoji: '☕' },
  { word: 'hat', emoji: '🎩' },
  { word: 'pig', emoji: '🐷' },
  { word: 'bus', emoji: '🚌' },
  { word: 'red', emoji: '🔴' },
  { word: 'big', emoji: '🐘' },
  { word: 'run', emoji: '🏃' },
  { word: 'hop', emoji: '🐰' },
  { word: 'map', emoji: '🗺️' },

  // 2-syllable words
  { word: 'bear', emoji: '🐻' },
  { word: 'cake', emoji: '🎂' },
  { word: 'baby', emoji: '👶' },
  { word: 'fish', emoji: '🐟' },
  { word: 'duck', emoji: '🦆' },
  { word: 'star', emoji: '⭐' },
  { word: 'tree', emoji: '🌳' },
  { word: 'moon', emoji: '🌙' },
  { word: 'rain', emoji: '🌧️' },
  { word: 'love', emoji: '❤️' },
  { word: 'ball', emoji: '⚽' },
  { word: 'book', emoji: '📖' },
  { word: 'frog', emoji: '🐸' },

  // 3-syllable words
  { word: 'banana', emoji: '🍌' },
  { word: 'rabbit', emoji: '🐇' },
  { word: 'apple', emoji: '🍎' },
];

/**
 * Get a random word from the list, optionally excluding a specific word
 * to avoid repeats.
 */
export function getRandomWord(exclude?: string): ChallengeWord {
  const filtered = exclude
    ? WORD_LIST.filter((w) => w.word !== exclude)
    : WORD_LIST;
  return filtered[Math.floor(Math.random() * filtered.length)];
}
