/**
 * Mappings for BuzzPhonics library.
 * Maps a "Letter" (grapheme) to the "Sound" (phoneme filename base).
 * 
 * Example: "ck" -> "c" (plays C.mp3 / c.mp3)
 * Example: "ss" -> "s" (plays S.mp3 / s.mp3)
 * Example: "ai" -> "ai" (plays AI.mp3)
 */

export const buzzPhonicsMap: Record<string, string> = {
    // User provided mappings
    "s": "s",
    "a": "a",
    "t": "t",
    "p": "p",
    "i": "i",
    "n": "n",
    "m": "m",
    "d": "d",
    "g": "g",
    "o": "o",
    "c": "c",
    "k": "c",   // k maps to c sound
    "ck": "c",  // ck maps to c sound
    "e": "e",
    "u": "u",
    "r": "r",
    "h": "h",
    "b": "b",
    "f": "f",
    "ff": "f",  // ff maps to f sound
    "l": "l",
    "ll": "l",  // ll maps to l sound
    "ss": "s",  // ss maps to s sound
    "j": "j",
    "v": "v",
    "w": "w",
    "x": "x",
    "y": "y",
    "z": "z",
    "zz": "z",
    "q": "qu",  // q maps to qu sound (no q.mp3 in repo)
    "qu": "qu",
    "ch": "ch",
    "sh": "sh",
    "th": "th",
    "ng": "ng",
    "ai": "ai",
    "ee": "ee",
    "igh": "igh",
    "oa": "oa",
    "oo": "oo", // short/long? need to check files
    "ooo": "ooo", // buzzphonics has 'ooo'
    "ar": "ar",
    "or": "or",
    "ur": "ur",
    "ow": "ow",
    "oi": "oi",
    "ear": "ear",
    "air": "air",
    "ure": "ure",
    "er": "er"
};

export const buzzPhonicsIcons: Record<string, string> = {
    "s": "sun",
    "a": "ant",
    "t": "tap",
    "p": "penguin",
    "i": "igloo",
    "n": "net",
    "m": "map",
    "d": "dog",
    "g": "guitar",
    "o": "octopus",
    "c": "cat",
    "k": "king",
    "ck": "duck",
    "e": "egg",
    "u": "umbrella",
    "r": "rat",
    "h": "hat",
    "b": "bin",
    "f": "frog",
    "ff": "muffin",
    "l": "leaf",
    "ll": "bell",
    "ss": "dress"
};

/**
 * Get the audio filename (without extension) for a given grapheme.
 * Returns Uppercase version to match our file system convention (A.mp3).
 * Defaults to the grapheme itself if no mapping exists.
 */
export function getBuzzPhonicsSound(grapheme: string): string {
    const lower = grapheme.toLowerCase();
    const mapped = buzzPhonicsMap[lower] || lower;
    return mapped.toUpperCase();
}
