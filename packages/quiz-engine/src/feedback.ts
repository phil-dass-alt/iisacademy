import type { Question, QuizResult } from './types';

export function getFeedbackMessage(question: Question, selected: string): string {
  const isCorrect = selected === question.answer;
  return isCorrect ? question.feedback.correct : question.feedback.incorrect;
}

export function getIntelligenceAgeHint(question: Question): string {
  return question.feedback.intelligenceAgeHint;
}

export function getResultSummary(result: QuizResult): string {
  const { percentage, masteryLevel } = result;
  if (percentage >= 90) return `Outstanding! You've mastered this chapter. Mastery Level: ${masteryLevel}.`;
  if (percentage >= 70) return `Great job! You're proficient. Review missed questions to reach mastery.`;
  if (percentage >= 50) return `Good effort! You're developing. Keep practicing to improve your score.`;
  return `Keep going! Review the chapter summary and try again. You can do it!`;
}

export function calculateMasteryLevel(percentage: number): QuizResult['masteryLevel'] {
  if (percentage >= 90) return 'mastered';
  if (percentage >= 70) return 'proficient';
  if (percentage >= 50) return 'developing';
  return 'beginner';
}
