import React from 'react';

interface QuizCardProps {
  question: string;
  options: string[];
  selected?: string;
  correct?: string;
  revealed?: boolean;
  onSelect?: (option: string) => void;
}

export function QuizCard({ question, options, selected, correct, revealed, onSelect }: QuizCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <p className="text-gray-900 font-medium text-base mb-4">{question}</p>
      <div className="space-y-2">
        {options.map((option, idx) => {
          const label = String.fromCharCode(65 + idx);
          const isSelected = selected === label;
          const isCorrect = correct === label;
          let optClass = 'border border-gray-200 bg-gray-50 text-gray-800 hover:bg-indigo-50 hover:border-indigo-300';
          if (revealed) {
            if (isCorrect) optClass = 'border border-green-500 bg-green-50 text-green-800';
            else if (isSelected && !isCorrect) optClass = 'border border-red-400 bg-red-50 text-red-800';
          } else if (isSelected) {
            optClass = 'border border-indigo-500 bg-indigo-50 text-indigo-800';
          }
          return (
            <button
              key={label}
              onClick={() => onSelect?.(label)}
              disabled={revealed}
              className={`w-full text-left rounded-lg px-4 py-3 text-sm font-medium transition-all ${optClass}`}
            >
              <span className="font-bold mr-2">{label}.</span> {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
