import type { AdaptiveState, DifficultyLevel } from './types';

export function initAdaptiveState(startDifficulty: DifficultyLevel = 'easy'): AdaptiveState {
  return {
    currentDifficulty: startDifficulty,
    consecutiveCorrect: 0,
    consecutiveIncorrect: 0,
    questionsAttempted: 0,
  };
}

export function updateAdaptiveState(state: AdaptiveState, wasCorrect: boolean): AdaptiveState {
  const next = {
    ...state,
    questionsAttempted: state.questionsAttempted + 1,
    consecutiveCorrect: wasCorrect ? state.consecutiveCorrect + 1 : 0,
    consecutiveIncorrect: wasCorrect ? 0 : state.consecutiveIncorrect + 1,
  };

  // Increase difficulty after 3 consecutive correct answers
  if (next.consecutiveCorrect >= 3) {
    next.currentDifficulty = promoteLevel(state.currentDifficulty);
    next.consecutiveCorrect = 0;
  }

  // Decrease difficulty after 2 consecutive incorrect answers
  if (next.consecutiveIncorrect >= 2) {
    next.currentDifficulty = demoteLevel(state.currentDifficulty);
    next.consecutiveIncorrect = 0;
  }

  return next;
}

function promoteLevel(current: DifficultyLevel): DifficultyLevel {
  if (current === 'easy') return 'medium';
  if (current === 'medium') return 'hard';
  return 'hard';
}

function demoteLevel(current: DifficultyLevel): DifficultyLevel {
  if (current === 'hard') return 'medium';
  if (current === 'medium') return 'easy';
  return 'easy';
}

export function selectNextQuestion(
  allQuestions: { id: number; difficulty?: DifficultyLevel }[],
  attempted: number[],
  state: AdaptiveState
): number | null {
  const remaining = allQuestions.filter((q) => !attempted.includes(q.id));
  if (remaining.length === 0) return null;

  // Try to find question matching current difficulty
  const preferredDifficulty = remaining.filter((q) => q.difficulty === state.currentDifficulty);
  if (preferredDifficulty.length > 0) {
    const idx = Math.floor(Math.random() * preferredDifficulty.length);
    return preferredDifficulty[idx]?.id ?? null;
  }

  // Fallback to any remaining question
  const idx = Math.floor(Math.random() * remaining.length);
  return remaining[idx]?.id ?? null;
}
