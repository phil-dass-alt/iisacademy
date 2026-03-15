import type { VoiceTutorConfig, SupportedLanguage } from './types';

const LANGUAGE_BCP47: Record<SupportedLanguage, string> = {
  en: 'en-IN',
  kn: 'kn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  ml: 'ml-IN',
  hi: 'hi-IN',
};

export class VoiceTutor {
  private config: VoiceTutorConfig;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPaused = false;

  constructor(config: Partial<VoiceTutorConfig> = {}) {
    this.config = {
      language: 'en',
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0,
      ...config,
    };
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  isSupported(): boolean {
    return this.synth !== null;
  }

  speak(text: string, onEnd?: () => void): void {
    if (!this.synth) return;
    this.stop();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_BCP47[this.config.language];
    utterance.rate = this.config.rate;
    utterance.pitch = this.config.pitch;
    utterance.volume = this.config.volume;
    if (onEnd) utterance.onend = onEnd;
    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    this.isPaused = false;
  }

  pause(): void {
    if (this.synth && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  resume(): void {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isPaused = false;
      this.currentUtterance = null;
    }
  }

  setLanguage(language: SupportedLanguage): void {
    this.config.language = language;
  }

  setRate(rate: number): void {
    this.config.rate = Math.min(2, Math.max(0.5, rate));
  }
}
