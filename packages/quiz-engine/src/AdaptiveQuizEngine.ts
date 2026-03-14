import type { Quiz, Question, DifficultyLevel } from "./types";

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
