import type { Question, QuizAttempt, QuizResult, AdaptiveState, DifficultyLevel } from './types';
import { initAdaptiveState, updateAdaptiveState } from './adaptive';
import { calculateMasteryLevel } from './feedback';

export class QuizEngine {
  private questions: Question[];
  private attempts: QuizAttempt[] = [];
  private adaptiveState: AdaptiveState;
  private startTime: number = Date.now();

  constructor(questions: Question[], startDifficulty: DifficultyLevel = 'easy') {
    this.questions = questions;
    this.adaptiveState = initAdaptiveState(startDifficulty);
  }

  getCurrentQuestion(index: number): Question | null {
    return this.questions[index] ?? null;
  }

  submitAnswer(questionId: number, selected: string): { correct: boolean; correctAnswer: string } {
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) throw new Error(`Question ${questionId} not found`);
    const correct = selected === question.answer;
    const timeSpent = Date.now() - this.startTime;
    this.attempts.push({ questionId, selected, correct, timeSpent });
    this.adaptiveState = updateAdaptiveState(this.adaptiveState, correct);
    this.startTime = Date.now();
    return { correct, correctAnswer: question.answer };
  }

  getResult(): QuizResult {
    const totalQuestions = this.questions.length;
    const correct = this.attempts.filter((a) => a.correct).length;
    const incorrect = this.attempts.filter((a) => !a.correct).length;
    const score = correct * 10;
    const percentage = Math.round((correct / totalQuestions) * 100);
    return {
      quizId: `quiz-${Date.now()}`,
      totalQuestions,
      correct,
      incorrect,
      score,
      percentage,
      attempts: this.attempts,
      completedAt: new Date().toISOString(),
      masteryLevel: calculateMasteryLevel(percentage),
      nextDifficulty: this.adaptiveState.currentDifficulty,
    };
  }

  getProgress(): { attempted: number; total: number; correct: number } {
    return {
      attempted: this.attempts.length,
      total: this.questions.length,
      correct: this.attempts.filter((a) => a.correct).length,
    };
  }

  reset(): void {
    this.attempts = [];
    this.adaptiveState = initAdaptiveState();
    this.startTime = Date.now();
  }
}
