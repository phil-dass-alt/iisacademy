export type SupportedLanguage = 'en' | 'kn' | 'ta' | 'te' | 'ml' | 'hi';

export interface VoiceTutorConfig {
  language: SupportedLanguage;
  rate: number;
  pitch: number;
  volume: number;
}

export interface NudgeConfig {
  sessionStartTime: number;
  lastActivityTime: number;
  nudgeThresholdMs: number;
  maxNudgesPerSession: number;
}

export interface NudgeMessage {
  type: 'encouragement' | 'reminder' | 'hint' | 'streak';
  message: string;
  emoji: string;
}

export interface AILessonEnhancement {
  title: string;
  content: string;
  practicalAddOn: string;
  relatedConcepts: string[];
}
