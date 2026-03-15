import type { Quiz, QuizResult, DifficultyLevel } from "./types";

export function scoreQuiz(
  quiz: Quiz,
  answers: Record<string, string>
): QuizResult {
  let correct = 0;
  for (const question of quiz.questions) {
    if (answers[question.id] === question.correctOptionId) {
      correct++;
    }
  }

  const total = quiz.questions.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;

  const nextDifficulty: DifficultyLevel =
    score >= 80 ? "hard" : score >= 50 ? "medium" : "easy";

  return {
    quizId: quiz.id,
    score,
    totalQuestions: total,
    correctAnswers: correct,
    answers,
    completedAt: new Date(),
    nextDifficulty,
  };
}
