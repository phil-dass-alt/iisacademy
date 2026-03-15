'use client';

import { useState, useRef, useCallback } from 'react';

interface VoiceReaderProps {
  text: string;
  language?: string;
}

export function VoiceReader({ text, language = 'en-IN' }: VoiceReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handlePlay = useCallback(() => {
    if (!isSupported) return;
    if (isPaused && utteranceRef.current) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => { setIsPlaying(true); setIsPaused(false); };
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, language, isSupported, isPaused]);

  const handlePause = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, [isSupported]);

  const handleStop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, [isSupported]);

  if (!isSupported) return null;

  return (
    <div className="flex items-center gap-2">
      {!isPlaying ? (
        <button
          onClick={handlePlay}
          title={isPaused ? 'Resume reading' : 'Read aloud'}
          className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          🔊 {isPaused ? 'Resume' : 'Read Aloud'}
        </button>
      ) : (
        <>
          <button
            onClick={handlePause}
            title="Pause"
            className="flex items-center gap-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            ⏸ Pause
          </button>
          <button
            onClick={handleStop}
            title="Stop"
            className="flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            ⏹ Stop
          </button>
        </>
      )}
    </div>
  );
}
