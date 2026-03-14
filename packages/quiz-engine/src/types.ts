export type DifficultyLevel = "easy" | "medium" | "hard";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  difficulty: DifficultyLevel;
  subject: string;
  chapter: string;
  board?: "cbse" | "icse" | "state";
  enhancementTag?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  board?: "cbse" | "icse" | "state";
  questions: Question[];
  metadata?: Record<string, unknown>;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: Record<string, string>;
  completedAt: Date;
  nextDifficulty: DifficultyLevel;
}
