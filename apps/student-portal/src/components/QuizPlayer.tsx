'use client';

import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  feedback: {
    correct: string;
    incorrect: string;
    intelligenceAgeHint: string;
  };
}

interface QuizPlayerProps {
  questions: QuizQuestion[];
  chapterId: number;
}

type QuizState = 'not-started' | 'in-progress' | 'answered' | 'completed';

export function QuizPlayer({ questions }: QuizPlayerProps) {
  const [state, setState] = useState<QuizState>('not-started');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [_answers, setAnswers] = useState<{ id: number; selected: string; correct: boolean }[]>([]);

  const currentQuestion = questions[currentIdx];

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
        <div className="text-3xl mb-2">📝</div>
        <p className="text-gray-500 text-sm">Quiz coming soon for this chapter.</p>
      </div>
    );
  }


  const handleStart = () => {
    setState('in-progress');
    setCurrentIdx(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowHint(false);
  };

  const handleSelect = (option: string) => {
    if (state === 'answered') return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const isCorrect = selectedAnswer === currentQuestion.answer;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { id: currentQuestion.id, selected: selectedAnswer, correct: isCorrect }]);
    setState('answered');
    setShowHint(false);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setState('completed');
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setState('in-progress');
    }
  };

  const percentage = Math.round((score / questions.length) * 100);
  const isCorrect = state === 'answered' && selectedAnswer === currentQuestion?.answer;

  if (state === 'not-started') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Ready for the Quiz?</h3>
        <p className="text-gray-600 text-sm mb-4">{questions.length} questions · Instant feedback · AI hints</p>
        <button
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (state === 'completed') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
        <div className="text-5xl mb-3">
          {percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '📚'}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Quiz Complete!</h3>
        <p className="text-4xl font-extrabold text-indigo-600 my-3">{score}/{questions.length}</p>
        <p className="text-gray-600 text-sm mb-2">{percentage}% correct</p>
        <p className="text-sm text-gray-700 mb-6 max-w-sm mx-auto">
          {percentage >= 90 ? 'Outstanding! You have mastered this chapter!' :
           percentage >= 70 ? 'Great job! Review the missed questions to reach mastery.' :
           percentage >= 50 ? 'Good effort! Read the chapter again and retry.' :
           'Keep going! Review the lesson and try again — you can do it!'}
        </p>
        <button
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">Question {currentIdx + 1} of {questions.length}</span>
        <span className="text-sm font-medium text-indigo-600">Score: {score}/{currentIdx + 1}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
        <div
          className="bg-indigo-600 h-1.5 rounded-full transition-all"
          style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-gray-900 font-medium text-base mb-4">{currentQuestion.question}</p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {currentQuestion.options.map((option, idx) => {
          const label = String.fromCharCode(65 + idx);
          const isSelected = selectedAnswer === label;
          const isCorrectOption = currentQuestion.answer === label;
          let optClass = 'border border-gray-200 bg-gray-50 text-gray-800 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer';
          if (state === 'answered') {
            if (isCorrectOption) optClass = 'border border-green-500 bg-green-50 text-green-800 cursor-default';
            else if (isSelected) optClass = 'border border-red-400 bg-red-50 text-red-800 cursor-default';
            else optClass = 'border border-gray-200 bg-gray-50 text-gray-400 cursor-default';
          } else if (isSelected) {
            optClass = 'border border-indigo-500 bg-indigo-50 text-indigo-800 cursor-pointer';
          }
          return (
            <button
              key={label}
              onClick={() => handleSelect(label)}
              disabled={state === 'answered'}
              className={`w-full text-left rounded-lg px-4 py-3 text-sm font-medium transition-all ${optClass}`}
            >
              <span className="font-bold mr-2">{label}.</span> {option}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {state === 'answered' && (
        <div className={`rounded-lg p-4 mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`text-sm font-semibold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✅ ' : '❌ '}
            {isCorrect ? currentQuestion.feedback.correct : currentQuestion.feedback.incorrect}
          </p>
          {showHint && (
            <div className="mt-2 pt-2 border-t border-current border-opacity-20">
              <p className="text-xs text-indigo-700 font-medium">💡 Intelligence Age Hint:</p>
              <p className="text-xs text-gray-600 mt-1">{currentQuestion.feedback.intelligenceAgeHint}</p>
            </div>
          )}
          {!showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 underline"
            >
              💡 Show Intelligence Age Hint
            </button>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {state === 'in-progress' && 'Select an answer above'}
        </div>
        {state === 'in-progress' ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm"
          >
            {currentIdx + 1 >= questions.length ? 'View Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
