'use client';

import { useState } from 'react';

interface AILessonEnhancement {
  title: string;
  content: string;
  practicalAddOn: string;
}

interface AILessonPanelProps {
  lesson: AILessonEnhancement;
  chapterTitle: string;
}

export function AILessonPanel({ lesson, chapterTitle }: AILessonPanelProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-indigo-100/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">🧠</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-0.5">
              Intelligence Age Enhancement
            </div>
            <div className="font-bold text-gray-900">{lesson.title}</div>
          </div>
        </div>
        <span className="text-gray-400 text-lg">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          <p className="text-gray-700 leading-relaxed text-sm">{lesson.content}</p>

          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
              🔧 Practical Add-On
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{lesson.practicalAddOn}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-indigo-500">
            <span>✨</span>
            <span>This enhancement connects <strong>{chapterTitle}</strong> to modern real-world applications.</span>
          </div>
        </div>
      )}
    </div>
  );
}
