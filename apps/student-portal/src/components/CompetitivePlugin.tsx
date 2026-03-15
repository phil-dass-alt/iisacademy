'use client';

import { useState } from 'react';

interface VoiceFlashcard {
  front: string;
  back: string;
  voiceEnabled: boolean;
}

interface CompetitiveEdgeModule {
  title: string;
  topics: string[];
  calculationHacks?: string[];
  mnemonicAgents?: string[];
}

interface CompetitivePluginProps {
  activated: boolean;
  streams: string[];
  edgeModules: CompetitiveEdgeModule[];
  voiceFlashcards: VoiceFlashcard[];
}

type Tab = 'edge' | 'flashcards' | 'mnemonics';

export function CompetitivePlugin({
  activated,
  streams,
  edgeModules,
  voiceFlashcards,
}: CompetitivePluginProps) {
  const [activeTab, setActiveTab] = useState<Tab>('edge');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState(true);

  const handleFlip = (index: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleVoiceRead = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!activated) return null;

  const allMnemonics = edgeModules.flatMap((m) => m.mnemonicAgents ?? []);
  const allHacks = edgeModules.flatMap((m) => m.calculationHacks ?? []);

  return (
    <div className="rounded-xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-orange-100/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">🏆</span>
          </div>
          <div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-0.5">
              Competitive Plugin — {streams.join(' / ')}
            </div>
            <div className="font-bold text-gray-900 text-base">
              Rank-Ready Edge Content
            </div>
            <div className="text-xs text-orange-700">
              {edgeModules.length} edge module{edgeModules.length !== 1 ? 's' : ''} · {voiceFlashcards.length} voice flashcards
            </div>
          </div>
        </div>
        <span className="text-gray-400 text-lg">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="px-5 pb-5">
          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-white/60 rounded-lg p-1">
            <TabButton active={activeTab === 'edge'} onClick={() => setActiveTab('edge')}>
              ⚡ Edge Modules
            </TabButton>
            <TabButton active={activeTab === 'flashcards'} onClick={() => setActiveTab('flashcards')}>
              🎴 Voice Flashcards
            </TabButton>
            <TabButton active={activeTab === 'mnemonics'} onClick={() => setActiveTab('mnemonics')}>
              🧠 Hacks & Mnemonics
            </TabButton>
          </div>

          {/* Edge Modules Tab */}
          {activeTab === 'edge' && (
            <div className="space-y-4">
              {edgeModules.map((module, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-orange-200 p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">⚡</span>
                    {module.title}
                  </h4>
                  <ul className="space-y-2">
                    {module.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-orange-400 mt-0.5 flex-shrink-0">▶</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Voice Flashcards Tab */}
          {activeTab === 'flashcards' && (
            <div className="space-y-3">
              <p className="text-xs text-orange-700 mb-3">
                🎤 Tap a card to reveal the answer. Use the voice button to hear it read aloud.
              </p>
              {voiceFlashcards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-orange-200 p-4 cursor-pointer select-none"
                  onClick={() => handleFlip(idx)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-1">
                        {flippedCards.has(idx) ? 'Answer' : 'Question'}
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {flippedCards.has(idx) ? card.back : card.front}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {card.voiceEnabled && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVoiceRead(flippedCards.has(idx) ? card.back : card.front);
                          }}
                          className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-lg flex items-center justify-center text-orange-600 transition-colors"
                          title="Read aloud"
                        >
                          🔊
                        </button>
                      )}
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                        {flippedCards.has(idx) ? '↩' : '↪'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hacks & Mnemonics Tab */}
          {activeTab === 'mnemonics' && (
            <div className="space-y-4">
              {allHacks.length > 0 && (
                <div className="bg-white rounded-lg border border-orange-200 p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>⚡</span> Calculation Hacks
                  </h4>
                  <ul className="space-y-2">
                    {allHacks.map((hack, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-gray-700 font-mono text-xs bg-gray-50 rounded px-2 py-1 w-full">{hack}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {allMnemonics.length > 0 && (
                <div className="bg-white rounded-lg border border-orange-200 p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🧠</span> Mnemonic Agents
                  </h4>
                  <ul className="space-y-3">
                    {allMnemonics.map((mnemonic, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5 flex-shrink-0">💡</span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{mnemonic}</p>
                          <button
                            onClick={() => handleVoiceRead(mnemonic)}
                            className="text-xs text-orange-600 hover:text-orange-800 mt-1 underline"
                          >
                            🔊 Read aloud
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 text-xs font-semibold px-2 py-1.5 rounded-md transition-colors ${
        active
          ? 'bg-orange-500 text-white shadow-sm'
          : 'text-gray-600 hover:text-orange-600'
      }`}
    >
      {children}
    </button>
  );
}
