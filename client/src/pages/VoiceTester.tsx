import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Volume2, Mic, MicOff, Trash2, Database } from 'lucide-react';
import { getPhonemeForLetter } from '@/lib/ukPhonicsPhonemes';
import { playPhonicsSound, getPhonicsAudioPath } from '@/lib/phonicsAudio';
import { audioRecorder } from '@/lib/audioRecorder';
import { audioStorage } from '@/lib/audioStorage';
import { buzzPhonicsMap } from '@/lib/buzzPhonicsMappings';
import { Link } from 'wouter';

export default function VoiceTester() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [testText, setTestText] = useState('Hello! I am ready to learn Phonics in the UK way.');
  const [testLetter, setTestLetter] = useState('A');
  const [mode, setMode] = useState<'synthetic' | 'real'>('synthetic');
  
  // Recorder State
  const [isRecording, setIsRecording] = useState(false);
  const [customLetters, setCustomLetters] = useState<Set<string>>(new Set());
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      let availableVoices = window.speechSynthesis.getVoices();
      
      // User requested Daniel as last resort, so do NOT filter him out.
      // availableVoices = availableVoices.filter(v => !v.name.includes('Daniel'));
      
      setVoices(availableVoices);
      
      // Auto-select priority (STRICT UK): 
      // 1. Google UK Female
      // 2. Google UK Male
      // 3. Any UK Voice (Non-Daniel)
      // 4. Any UK Voice (including Daniel)
      
      const googleUKFemale = availableVoices.find(v => v.name.includes('Google UK English Female'));
      const googleUKMale = availableVoices.find(v => v.name.includes('Google UK English Male'));
      
      // Voices that are UK but NOT Daniel
      const ukVoiceNoDaniel = availableVoices.find(v => 
        (v.lang.startsWith('en-GB') || v.lang.startsWith('en_GB')) && 
        !v.name.includes('Daniel')
      );
      
      // Any UK Voice (will serve as fallback if only Daniel exists)
      const anyUKVoice = availableVoices.find(v => v.lang.startsWith('en-GB') || v.lang.startsWith('en_GB'));
      
      const bestVoice = googleUKFemale || googleUKMale || ukVoiceNoDaniel || anyUKVoice;
      
      if (bestVoice && !selectedVoiceURI) {
        setSelectedVoiceURI(bestVoice.voiceURI);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    // Load existing custom recordings
    loadCustomRecordings();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const loadCustomRecordings = async () => {
    try {
        const keys = await audioStorage.getAllKeys();
        setCustomLetters(new Set(keys));
    } catch (e) {
        console.error("Failed to load custom recordings", e);
    }
  };

  const handleSpeakText = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(testText);
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeakPhoneme = (letter: string) => {
    setTestLetter(letter); // Switch to this letter UI
    
    if (mode === 'real') {
      playPhonicsSound(letter);
      return;
    }

    // Synthetic Mode
    window.speechSynthesis.cancel();
    const phoneme = getPhonemeForLetter(letter);
    const utterance = new SpeechSynthesisUtterance(phoneme);
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.85;
    utterance.pitch = 1.1; // Slightly higher pitch for phonemes
    window.speechSynthesis.speak(utterance);
  };
  
  // Recorder Logic
  const startRecording = async () => {
    try {
        await audioRecorder.start();
        setIsRecording(true);
    } catch (e) {
        alert("Microphone permission denied or not available.");
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;
    setIsRecording(false);
    const blob = await audioRecorder.stop();
    if (blob.size > 0) {
        await audioStorage.saveAudio(testLetter, blob);
        await loadCustomRecordings();
    }
  };

  const handleDeleteRecording = async () => {
    if (!confirm(`Delete custom recording for "${testLetter}"?`)) return;
    await audioStorage.deleteAudio(testLetter);
    await loadCustomRecordings();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 sm:p-6 font-sans">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Mic className="text-purple-600" />
            Voice Tester
          </h1>
        </div>

        <div className="space-y-6">
          {/* Voice Selection */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">1. Select a System Voice</h2>
            {voices.length === 0 ? (
              <p className="text-red-500">No voices detected. Trying to load...</p>
            ) : (
              <select 
                className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-purple-200 outline-none"
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
              >
                {voices.map(voice => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name} ({voice.lang}) {voice.default ? ' — DEFAULT' : ''}
                  </option>
                ))}
              </select>
            )}
            <div className="mt-2 text-sm text-gray-500">
              <p>Tip: Look for voices with <strong>en-GB</strong> for best British accent.</p>
            </div>
          </section>

          {/* Text Test */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">2. Test Custom Text</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="flex-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-200 outline-none"
              />
              <Button onClick={handleSpeakText} className="bg-purple-600 hover:bg-purple-700">
                <Volume2 size={20} />
              </Button>
            </div>
          </section>

          {/* Test Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm">
              <button
                onClick={() => setMode('synthetic')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'synthetic' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                🤖 Synthetic Voice (Debug)
              </button>
              <button
                onClick={() => setMode('real')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'real' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                🎵 Real Audio Files
              </button>
            </div>
          </div>

          {/* Phoneme Test */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">3. Test Phonemes (Letter Sounds)</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-mono">
                Mode: {mode === 'synthetic' ? 'Browser TTS' : 'Audio Files'}
              </span>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              {mode === 'synthetic' 
                ? "Click a letter to hear its calculated phoneme sound using the selected voice."
                : "Click a letter to play human audio (Custom Recording > Downloaded File)."}
            </p>
            
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
                const hasCustom = customLetters.has(letter);
                return (
                  <div key={letter} className="relative">
                    <button
                      onClick={() => handleSpeakPhoneme(letter)}
                      className={`
                        w-full p-3 rounded-xl border-2 font-bold transition-all active:scale-95
                        ${testLetter === letter 
                          ? (mode === 'real' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-purple-100 border-purple-500 text-purple-700')
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }
                      `}
                    >
                      {letter}
                    </button>
                    {hasCustom && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white" title="Custom recording exists"/>
                    )}
                  </div>
                );
              })}
            </div>
            
            <h3 className="text-md font-semibold text-gray-700 mt-6 mb-3">Digraphs & Trigraphs (BuzzPhonics)</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {Object.keys(buzzPhonicsMap)
                    .filter(k => k.length > 1) // Only multi-letter sounds
                    .sort()
                    .map(digraph => {
                        const hasCustom = customLetters.has(digraph);
                        return (
                            <div key={digraph} className="relative">
                                <button
                                    onClick={() => handleSpeakPhoneme(digraph)}
                                    className={`
                                        w-full p-2 rounded-lg border-2 font-medium transition-all active:scale-95 text-sm
                                        ${testLetter === digraph 
                                            ? (mode === 'real' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-purple-100 border-purple-500 text-purple-700')
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                        }
                                    `}
                                >
                                    {digraph}
                                </button>
                                {hasCustom && (
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-white" title="Custom recording exists"/>
                                )}
                            </div>
                        );
                    })}
            </div>
            
            {/* Logic & Recording Footer */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                   <div className="text-sm text-gray-700">
                        <span className="font-semibold block mb-1">Current Source for "{testLetter}":</span>
                        {mode === 'synthetic' ? (
                            <span className="text-purple-600 font-mono">TTS Phoneme: "{getPhonemeForLetter(testLetter)}"</span>
                        ) : (
                            <div className="flex flex-col gap-1">
                                {customLetters.has(testLetter) ? (
                                    <span className="text-blue-600 font-medium flex items-center gap-1">
                                        <Database size={14}/> Custom User Recording (IndexedDB)
                                    </span>
                                ) : (
                                    <span className="text-green-600 font-mono">{getPhonicsAudioPath(testLetter)}</span>
                                )}
                            </div>
                        )}
                   </div>
                   
                   {/* Recorder Actions - Only show in Real Mode or always? Let's show always so user can prep custom files */}
                   <div className="flex gap-2 items-center">
                        {customLetters.has(testLetter) && (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleDeleteRecording}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 size={16} className="mr-2"/> Delete Custom
                            </Button>
                        )}
                        
                        <Button
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            onTouchStart={startRecording}
                            onTouchEnd={stopRecording}
                            className={`
                                active:scale-95 transition-all select-none
                                ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}
                            `}
                        >
                            {isRecording ? <MicOff size={18} className="mr-2"/> : <Mic size={18} className="mr-2"/>}
                            {isRecording ? "Recording..." : `Hold to Record "${testLetter}"`}
                        </Button>
                   </div>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
