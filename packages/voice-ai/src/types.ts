export interface VoiceSettings {
  voice?: string;
  speed?: number;
  language?: "en-IN" | "hi-IN" | "ta-IN" | "kn-IN";
}

export interface LessonScript {
  id: string;
  title: string;
  segments: Array<{
    type: "explain" | "example" | "question" | "summary";
    text: string;
    pauseAfter?: number;
  }>;
}

export interface VoiceLesson {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  board?: "cbse" | "icse" | "state";
  script: LessonScript;
  voiceSettings: VoiceSettings;
  durationMinutes: number;
  enhancementTopic?: string;
}
