'use client';

import { useState } from 'react';

interface DualTrackSection {
  tag: string;
  description: string;
}

interface BoardLevel extends DualTrackSection {
  keyConcepts: string[];
  examTips: string[];
}

interface Bridge extends DualTrackSection {
  advancedConcepts: string[];
  problemSolvingEdge: string;
}

interface IntelligenceAgeApplication {
  title: string;
  content: string;
}

interface IntelligenceAge extends DualTrackSection {
  applications: IntelligenceAgeApplication[];
  careerConnect: string;
}

interface DualTrack {
  boardLevel: BoardLevel;
  bridge: Bridge;
  intelligenceAge: IntelligenceAge;
}

interface DualTrackLessonProps {
  dualTrack: DualTrack;
  chapterTitle: string;
}

type TrackTab = 'board' | 'bridge' | 'next';

export function DualTrackLesson({ dualTrack, chapterTitle }: DualTrackLessonProps) {
  const [activeTrack, setActiveTrack] = useState<TrackTab>('board');
  const [expandedApp, setExpandedApp] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Track Selector */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex">
          <TrackTabButton
            active={activeTrack === 'board'}
            onClick={() => setActiveTrack('board')}
            color="blue"
            icon="📖"
            label="Board Level"
            sublabel="What"
          />
          <TrackTabButton
            active={activeTrack === 'bridge'}
            onClick={() => setActiveTrack('bridge')}
            color="indigo"
            icon="🔗"
            label="The Bridge"
            sublabel="How"
          />
          <TrackTabButton
            active={activeTrack === 'next'}
            onClick={() => setActiveTrack('next')}
            color="purple"
            icon="🚀"
            label="Next"
            sublabel="Intelligence Age"
          />
        </div>
      </div>

      {/* Board Level */}
      {activeTrack === 'board' && (
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {dualTrack.boardLevel.tag}
            </span>
          </div>
          <p className="text-sm text-gray-600">{dualTrack.boardLevel.description}</p>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">📚 Key Concepts</h4>
            <ul className="space-y-2">
              {dualTrack.boardLevel.keyConcepts.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 bg-blue-50 rounded-lg px-3 py-2">
                  <span className="text-blue-500 mt-0.5 flex-shrink-0">▸</span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 rounded-lg border border-amber-200 p-4">
            <h4 className="text-sm font-bold text-amber-800 mb-2">✏️ Exam Tips</h4>
            <ul className="space-y-1">
              {dualTrack.boardLevel.examTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-amber-700">
                  <span className="flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Bridge */}
      {activeTrack === 'bridge' && (
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {dualTrack.bridge.tag}
            </span>
          </div>
          <p className="text-sm text-gray-600">{dualTrack.bridge.description}</p>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">🧮 Advanced Concepts</h4>
            <ul className="space-y-2">
              {dualTrack.bridge.advancedConcepts.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 bg-indigo-50 rounded-lg px-3 py-2">
                  <span className="text-indigo-500 mt-0.5 flex-shrink-0">▸</span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-4">
            <h4 className="text-sm font-bold text-indigo-800 mb-2">🎯 Problem-Solving Edge</h4>
            <p className="text-sm text-indigo-700">{dualTrack.bridge.problemSolvingEdge}</p>
          </div>
        </div>
      )}

      {/* Intelligence Age / Next */}
      {activeTrack === 'next' && (
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {dualTrack.intelligenceAge.tag}
            </span>
          </div>
          <p className="text-sm text-gray-600">{dualTrack.intelligenceAge.description}</p>

          <div className="space-y-3">
            {dualTrack.intelligenceAge.applications.map((app, idx) => (
              <div
                key={idx}
                className="bg-purple-50 rounded-lg border border-purple-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedApp(expandedApp === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-purple-100 transition-colors"
                >
                  <span className="font-semibold text-sm text-purple-900">{app.title}</span>
                  <span className="text-purple-400 text-sm">{expandedApp === idx ? '▲' : '▼'}</span>
                </button>
                {expandedApp === idx && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{app.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-4 text-white">
            <div className="text-xs font-bold uppercase tracking-wider mb-1 text-purple-200">
              🎓 Career Connect
            </div>
            <p className="text-sm">{dualTrack.intelligenceAge.careerConnect}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TrackTabButton({
  active,
  onClick,
  color,
  icon,
  label,
  sublabel,
}: {
  active: boolean;
  onClick: () => void;
  color: 'blue' | 'indigo' | 'purple';
  icon: string;
  label: string;
  sublabel: string;
}) {
  const colorMap = {
    blue: active ? 'border-b-2 border-blue-600 text-blue-700 bg-white' : 'text-gray-500 hover:text-blue-600',
    indigo: active ? 'border-b-2 border-indigo-600 text-indigo-700 bg-white' : 'text-gray-500 hover:text-indigo-600',
    purple: active ? 'border-b-2 border-purple-600 text-purple-700 bg-white' : 'text-gray-500 hover:text-purple-600',
  };

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center px-3 py-3 transition-colors ${colorMap[color]}`}
    >
      <span className="text-base">{icon}</span>
      <span className="text-xs font-bold">{label}</span>
      <span className="text-[10px] opacity-70">{sublabel}</span>
    </button>
  );
}
