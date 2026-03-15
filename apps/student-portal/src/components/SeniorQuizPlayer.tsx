'use client';

import { useState } from 'react';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  difficulty: string;
  enhancementTag?: string;
}

interface QuizStage {
  stage: 'board' | 'competitive' | 'intelligence-age';
  label: string;
  passingScore: number;
  bridgeHint?: string;
  questions: QuizQuestion[];
}

interface SeniorQuizPlayerProps {
  stages: QuizStage[];
  quizTitle: string;
}

type PlayState = 'not-started' | 'in-progress' | 'answered' | 'stage-complete' | 'all-complete';

const STAGE_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  board: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-600' },
  competitive: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-500' },
  'intelligence-age': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', badge: 'bg-purple-600' },
};

const STAGE_ICONS: Record<string, string> = {
  board: '📖',
  competitive: '🏆',
  'intelligence-age': '🚀',
};

export function SeniorQuizPlayer({ stages, quizTitle }: SeniorQuizPlayerProps) {
  const [playState, setPlayState] = useState<PlayState>('not-started');
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [stageScores, setStageScores] = useState<number[]>([]);
  const [stageCorrect, setStageCorrect] = useState(0);

  const currentStage = stages[currentStageIdx];
  const currentQuestion = currentStage?.questions[currentQuestionIdx];
  const isAnswered = playState === 'answered';
  const isCorrect = isAnswered && selectedOption === currentQuestion?.correctOptionId;

  const handleStart = () => {
    setPlayState('in-progress');
    setCurrentStageIdx(0);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setStageScores([]);
    setStageCorrect(0);
  };

  const handleSelect = (optId: string) => {
    if (isAnswered) return;
    setSelectedOption(optId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    if (selectedOption === currentQuestion.correctOptionId) {
      setStageCorrect((c) => c + 1);
    }
    setPlayState('answered');
  };

  const handleNext = () => {
    const isLastQuestion = currentQuestionIdx + 1 >= currentStage.questions.length;
    if (isLastQuestion) {
      const total = currentStage.questions.length;
      // stageCorrect has already been incremented by handleSubmit for this question if correct
      const finalCorrect = stageCorrect;
      const score = Math.round((finalCorrect / total) * 100);
      setStageScores((prev) => [...prev, score]);
      setPlayState('stage-complete');
    } else {
      setCurrentQuestionIdx((i) => i + 1);
      setSelectedOption(null);
      setPlayState('in-progress');
    }
  };

  const handleNextStage = () => {
    const lastStageScore = stageScores[stageScores.length - 1] ?? 0;
    const passed = lastStageScore >= currentStage.passingScore;
    if (!passed) {
      // Retry this stage
      setCurrentQuestionIdx(0);
      setSelectedOption(null);
      setStageCorrect(0);
      setPlayState('in-progress');
      return;
    }
    if (currentStageIdx + 1 >= stages.length) {
      setPlayState('all-complete');
      return;
    }
    setCurrentStageIdx((i) => i + 1);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setStageCorrect(0);
    setPlayState('in-progress');
  };

  const getOverallRank = () => {
    if (stageScores.length === 0) return '📚 Keep Learning';
    const avg = stageScores.reduce((a, b) => a + b, 0) / stageScores.length;
    if (avg >= 85) return '🏆 Rank Predictor: Top 1% — Competitive Ready';
    if (avg >= 70) return '⭐ Rank Predictor: Top 10% — Board Mastery + Competitive';
    if (avg >= 50) return '📈 Board Level Achieved — Keep Going!';
    return '📚 Review Lessons and Retry';
  };

  const colors = STAGE_COLORS[currentStage?.stage ?? 'board'];

  if (playState === 'not-started') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{quizTitle}</h3>
        <p className="text-sm text-gray-600 mb-3">
          3-Stage Quiz: Board → Competitive → Intelligence Age
        </p>
        <div className="flex justify-center gap-3 mb-5">
          {stages.map((s) => (
            <div key={s.stage} className="flex flex-col items-center gap-1">
              <div className={`w-10 h-10 rounded-full ${STAGE_COLORS[s.stage].badge} flex items-center justify-center text-white text-lg`}>
                {STAGE_ICONS[s.stage]}
              </div>
              <span className="text-xs text-gray-500">{s.label.split(':')[0]}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (playState === 'all-complete') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">All 3 Stages Complete!</h3>
        <div className="space-y-2 mb-6">
          {stages.map((stage, idx) => (
            <div key={stage.stage} className={`flex items-center justify-between rounded-lg px-4 py-2 ${STAGE_COLORS[stage.stage].bg} ${STAGE_COLORS[stage.stage].border} border`}>
              <span className={`text-sm font-medium ${STAGE_COLORS[stage.stage].text}`}>
                {STAGE_ICONS[stage.stage]} {stage.label}
              </span>
              <span className={`font-bold text-sm ${STAGE_COLORS[stage.stage].text}`}>
                {stageScores[idx] !== undefined ? `${stageScores[idx]}%` : '—'}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 mb-4">
          <p className="font-bold">{getOverallRank()}</p>
        </div>
        <button
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm"
        >
          Retry All Stages
        </button>
      </div>
    );
  }

  if (playState === 'stage-complete') {
    const score = stageScores[stageScores.length - 1] ?? 0;
    const passed = score >= currentStage.passingScore;
    const isLastStage = currentStageIdx + 1 >= stages.length;
    const nextStage = !isLastStage ? stages[currentStageIdx + 1] : null;

    return (
      <div className={`rounded-xl border shadow-sm p-6 text-center ${colors.bg} ${colors.border}`}>
        <div className="text-4xl mb-3">{passed ? (isLastStage ? '🎓' : '✅') : '📚'}</div>
        <h3 className={`text-lg font-bold mb-2 ${colors.text}`}>{currentStage.label} — Complete!</h3>
        <p className={`text-3xl font-extrabold mb-1 ${colors.text}`}>{score}%</p>
        <p className={`text-sm mb-4 ${colors.text}`}>
          {passed ? 'Passed!' : `Need ${currentStage.passingScore}% to unlock next stage`}
        </p>
        {nextStage?.bridgeHint && passed && (
          <div className={`text-sm mb-4 bg-white/60 rounded-lg px-4 py-2 ${colors.text}`}>
            💡 {nextStage.bridgeHint}
          </div>
        )}
        <button
          onClick={handleNextStage}
          className={`font-semibold px-6 py-3 rounded-lg transition-colors text-white ${passed && !isLastStage ? STAGE_COLORS[nextStage!.stage].badge + ' hover:opacity-90' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {passed && !isLastStage
            ? `Unlock ${nextStage!.label.split(':')[0]} →`
            : passed && isLastStage
            ? 'View Results 🎓'
            : 'Retry Stage'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      {/* Stage indicator */}
      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 ${colors.bg} ${colors.border} border`}>
        <span>{STAGE_ICONS[currentStage.stage]}</span>
        <span className={`text-xs font-bold ${colors.text}`}>{currentStage.label}</span>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">
          Question {currentQuestionIdx + 1} of {currentStage.questions.length}
        </span>
        <span className="text-sm font-medium text-indigo-600">
          Score: {stageCorrect}/{currentQuestionIdx + (isAnswered ? 1 : 0)}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
        <div
          className="bg-indigo-600 h-1.5 rounded-full transition-all"
          style={{ width: `${(currentQuestionIdx / currentStage.questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-gray-900 font-medium text-base mb-4">{currentQuestion.text}</p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrectOption = currentQuestion.correctOptionId === option.id;
          let optClass = 'border border-gray-200 bg-gray-50 text-gray-800 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer';
          if (isAnswered) {
            if (isCorrectOption) optClass = 'border border-green-500 bg-green-50 text-green-800 cursor-default';
            else if (isSelected) optClass = 'border border-red-400 bg-red-50 text-red-800 cursor-default';
            else optClass = 'border border-gray-200 bg-gray-50 text-gray-400 cursor-default';
          } else if (isSelected) {
            optClass = 'border border-indigo-500 bg-indigo-50 text-indigo-800 cursor-pointer';
          }
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered}
              className={`w-full text-left rounded-lg px-4 py-3 text-sm font-medium transition-all ${optClass}`}
            >
              <span className="font-bold mr-2">{option.id.toUpperCase()}.</span>
              {option.text}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className={`rounded-lg p-4 mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`text-sm font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </p>
          <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
          {currentQuestion.enhancementTag && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <span className="text-xs text-indigo-500 font-medium">
                🔗 Enhancement: {currentQuestion.enhancementTag}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Action */}
      <div className="flex justify-end">
        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm"
          >
            {currentQuestionIdx + 1 >= currentStage.questions.length
              ? 'Complete Stage →'
              : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
