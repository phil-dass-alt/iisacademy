import type { Quiz, Question, DifficultyLevel, QuizStage, QuizStageConfig, SeniorQuiz } from "./types";

export class AdaptiveQuizEngine {
  private currentDifficulty: DifficultyLevel;

  constructor(initialDifficulty: DifficultyLevel = "medium") {
    this.currentDifficulty = initialDifficulty;
  }

  getDifficulty(): DifficultyLevel {
    return this.currentDifficulty;
  }

  adapt(score: number): void {
    if (score >= 80) {
      this.currentDifficulty = "hard";
    } else if (score >= 50) {
      this.currentDifficulty = "medium";
    } else {
      this.currentDifficulty = "easy";
    }
  }

  filterQuestions(questions: Question[]): Question[] {
    const filtered = questions.filter(
      (q) => q.difficulty === this.currentDifficulty
    );
    return filtered.length > 0 ? filtered : questions;
  }

  selectNextQuestions(quiz: Quiz, count: number = 5): Question[] {
    const eligible = this.filterQuestions(quiz.questions);
    return eligible.slice(0, count);
  }
}

/**
 * 3-Stage Senior Wing Quiz Engine
 * Manages progression through Board → Competitive → Intelligence Age stages.
 * A student must pass each stage (score ≥ passingScore) to unlock the next.
 */
export class SeniorQuizEngine {
  private currentStageIndex: number = 0;
  private stageScores: Record<QuizStage, number | null> = {
    board: null,
    competitive: null,
    "intelligence-age": null,
  };

  constructor(private quiz: SeniorQuiz) {}

  getCurrentStage(): QuizStageConfig {
    if (this.currentStageIndex >= this.quiz.stages.length) {
      throw new Error(`Stage index ${this.currentStageIndex} is out of bounds for quiz with ${this.quiz.stages.length} stages`);
    }
    return this.quiz.stages[this.currentStageIndex];
  }

  getUnlockedStages(): QuizStage[] {
    return this.quiz.stages
      .slice(0, this.currentStageIndex + 1)
      .map((s) => s.stage);
  }

  /**
   * Record the score for the current stage. Returns true if the student
   * passes and unlocks the next stage.
   */
  submitStageScore(score: number): { passed: boolean; nextStage?: QuizStageConfig } {
    const stage = this.getCurrentStage();
    this.stageScores[stage.stage] = score;
    const passed = score >= stage.passingScore;
    if (passed && this.currentStageIndex < this.quiz.stages.length - 1) {
      this.currentStageIndex++;
      return { passed, nextStage: this.quiz.stages[this.currentStageIndex] };
    }
    return { passed };
  }

  getScores(): Record<QuizStage, number | null> {
    return { ...this.stageScores };
  }

  /** Compute overall rank label based on scores across all stages */
  getRankLabel(): string {
    const boardScore = this.stageScores.board ?? 0;
    const compScore = this.stageScores.competitive ?? 0;
    const iaScore = this.stageScores["intelligence-age"] ?? 0;
    const avg = (boardScore + compScore + iaScore) / 3;
    if (avg >= 85) return "🏆 Rank Predictor: Top 1% — JEE/NEET Advanced Ready";
    if (avg >= 70) return "⭐ Rank Predictor: Top 10% — Competitive Ready";
    if (avg >= 50) return "📈 Rank Predictor: Board Mastery Achieved";
    return "📚 Keep Learning — Review Board Level and Retry";
  }
}
