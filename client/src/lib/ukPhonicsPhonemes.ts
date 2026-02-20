/**
 * UK Phonics Phoneme Mapping
 *
 * Maps each letter to a phonetic syllable approximation that the
 * Web Speech API will pronounce as the correct UK phoneme sound,
 * NOT as the letter name.
 *
 * Based on UK Synthetic Phonics (Jolly Phonics / Letters and Sounds):
 * - Vowels use their short/pure sound
 * - Consonants are pronounced with minimal vowel addition (pure sounds)
 * - e.g. "b" → /b/ (a short "buh"), NOT "bee"
 */

export const UK_PHONICS_PHONEMES: Record<string, string> = {
  A: 'ah',       // /æ/ as in "apple" — short a
  B: 'buh',      // /b/ as in "bat" — quick plosive
  C: 'kuh',      // /k/ as in "cat" — hard c
  D: 'duh',      // /d/ as in "dog" — quick plosive
  E: 'eh',       // /ɛ/ as in "egg" — short e
  F: 'fff',      // /f/ as in "fan" — continuous fricative
  G: 'guh',      // /ɡ/ as in "got" — hard g
  H: 'huh',      // /h/ as in "hat" — aspirated
  I: 'ih',       // /ɪ/ as in "ink" — short i
  J: 'juh',      // /dʒ/ as in "jug" — affricate
  K: 'kuh',      // /k/ as in "king" — same sound as hard c
  L: 'lll',      // /l/ as in "leg" — lateral
  M: 'mmm',      // /m/ as in "mat" — nasal
  N: 'nnn',      // /n/ as in "net" — nasal
  O: 'oh',       // /ɒ/ as in "orange" — short o
  P: 'puh',      // /p/ as in "pig" — quick plosive
  Q: 'kwuh',     // /kw/ as in "queen" — labiovelar
  R: 'rrr',      // /r/ as in "rat" — approximant
  S: 'sss',      // /s/ as in "sun" — continuous fricative
  T: 'tuh',      // /t/ as in "tap" — quick plosive
  U: 'uh',       // /ʌ/ as in "umbrella" — short u
  V: 'vvv',      // /v/ as in "van" — voiced fricative
  W: 'wuh',      // /w/ as in "wet" — approximant
  X: 'ks',       // /ks/ as in "box" — cluster
  Y: 'yuh',      // /j/ as in "yes" — palatal
  Z: 'zzz',      // /z/ as in "zip" — voiced fricative
};

/**
 * Get the phoneme for a letter.
 * Returns the phoneme string that should be spoken by the Speech API.
 */
export function getPhonemeForLetter(letter: string): string {
  const normalized = letter.toUpperCase();
  return UK_PHONICS_PHONEMES[normalized] || normalized;
}

/**
 * Get all letters with their phonemes.
 */
export function getAllPhonemes(): Array<{ letter: string; phoneme: string }> {
  return Object.entries(UK_PHONICS_PHONEMES).map(([letter, phoneme]) => ({
    letter,
    phoneme,
  }));
}
