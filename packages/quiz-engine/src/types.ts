export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/** Quiz stage for the 3-stage Senior Wing progression: Board → Competitive → Intelligence Age */
export type QuizStage = 'board' | 'competitive' | 'intelligence-age';

/** Target competitive exam stream */
export type CompetitiveStream = 'JEE' | 'NEET' | 'CA Foundation' | 'Design' | 'Foundation';

export interface QuestionFeedback {
  correct: string;
  incorrect: string;
  intelligenceAgeHint: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  difficulty?: DifficultyLevel;
  feedback: QuestionFeedback;
  tags?: string[];
  /** Stage in the 3-stage senior wing quiz progression */
  stage?: QuizStage;
  /** Which competitive exams this question targets */
  competitiveStreams?: CompetitiveStream[];
}

export interface Quiz {
  chapterId: number;
  chapterTitle: string;
  questions: Question[];
}

/** A single stage in the 3-stage senior wing quiz progression */
export interface QuizStageConfig {
  stage: QuizStage;
  label: string;
  passingScore: number;
  /** Message shown to student when unlocking competitive/intelligence-age stage */
  bridgeHint?: string;
  questions: Question[];
}

/** Multi-stage quiz for Class 11 & 12 with Competitive Plugin */
export interface SeniorQuiz {
  id: string;
  title: string;
  wing: 'senior';
  stages: QuizStageConfig[];
}

/** Competitive Plugin configuration for a chapter */
export interface CompetitivePluginConfig {
  activated: boolean;
  streams: CompetitiveStream[];
  edgeModules: CompetitiveEdgeModule[];
  voiceFlashcards: VoiceFlashcard[];
}

export interface CompetitiveEdgeModule {
  title: string;
  topics: string[];
  calculationHacks?: string[];
  mnemonicAgents?: string[];
}

export interface VoiceFlashcard {
  front: string;
  back: string;
  voiceEnabled: boolean;
}

/** Mock test configuration for competitive exams */
export interface MockTestConfig {
  totalTime: number;
  totalQuestions: number;
  marking: { correct: number; incorrect: number; unattempted: number };
  adaptiveRanking: boolean;
  feedbackMode: 'immediate' | 'end-of-test';
}

export interface QuizAttempt {
  questionId: number;
  selected: string;
  correct: boolean;
  timeSpent: number;
}

export interface QuizResult {
  quizId: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  score: number;
  percentage: number;
  attempts: QuizAttempt[];
  completedAt: string;
  masteryLevel: 'beginner' | 'developing' | 'proficient' | 'mastered';
  nextDifficulty: DifficultyLevel;
}

export interface AdaptiveState {
  currentDifficulty: DifficultyLevel;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  questionsAttempted: number;
}
