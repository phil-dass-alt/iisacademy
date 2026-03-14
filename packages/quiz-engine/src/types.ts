export type DifficultyLevel = 'easy' | 'medium' | 'hard';

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
}

export interface Quiz {
  chapterId: number;
  chapterTitle: string;
  questions: Question[];
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
