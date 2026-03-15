import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { AILessonPanel } from '@/components/AILessonPanel';
import { QuizPlayer } from '@/components/QuizPlayer';
import { VoiceReader } from '@/components/VoiceReader';
import { DualTrackLesson } from '@/components/DualTrackLesson';
import { CompetitivePlugin } from '@/components/CompetitivePlugin';
import { SeniorQuizPlayer } from '@/components/SeniorQuizPlayer';

interface ChapterPageProps {
  params: {
    board: string;
    class: string;
    subject: string;
    chapter: string;
  };
}

const VALID_SEGMENT = /^[a-z0-9-]+$/i;

async function getSyllabus(board: string, cls: string, subject: string) {
  if (!VALID_SEGMENT.test(board) || !VALID_SEGMENT.test(cls) || !VALID_SEGMENT.test(subject)) {
    return null;
  }
  try {
    const dataPath = path.join(process.cwd(), '../../data/syllabus', board, cls, `${subject}.json`);
    const content = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/** Attempt to load a standalone senior-wing lesson JSON for this chapter slug */
async function getSeniorLesson(board: string, cls: string, subject: string, chapterSlug: string) {
  if (!VALID_SEGMENT.test(board) || !VALID_SEGMENT.test(cls) || !VALID_SEGMENT.test(subject) || !VALID_SEGMENT.test(chapterSlug)) {
    return null;
  }
  try {
    const dataPath = path.join(process.cwd(), '../../data', board, cls, subject, `${chapterSlug}.json`);
    const content = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const chapterParam = params.chapter;
  const isSeniorClass = params.class === 'class-11' || params.class === 'class-12';

  // For senior wing, try to load the standalone lesson file first
  if (isSeniorClass) {
    const lesson = await getSeniorLesson(params.board, params.class, params.subject, chapterParam);
    if (lesson) {
      const hasDualTrack = Boolean(lesson.dualTrack);
      const hasCompetitivePlugin = Boolean(lesson.competitivePlugin?.activated);
      const hasStagesQuiz = Array.isArray(lesson.quiz?.stages);
      const lessonText = lesson.title + '. ' + (lesson.dualTrack?.boardLevel?.keyConcepts?.join('. ') ?? '');

      return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <nav className="text-sm text-gray-500 mb-2">
                <Link href="/" className="hover:text-indigo-600">Dashboard</Link>
                <span className="mx-2">›</span>
                <Link href={`/${params.board}/${params.class}/${params.subject}`} className="hover:text-indigo-600 capitalize">
                  {params.subject}
                </Link>
                <span className="mx-2">›</span>
                <span className="font-semibold text-gray-900">{lesson.title}</span>
              </nav>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                      {lesson.wing === 'senior' ? 'Senior Wing' : ''}
                    </span>
                    {lesson.stream && (
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        {lesson.stream}
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
                  <p className="text-gray-500 text-sm mt-1 capitalize">
                    {lesson.board?.toUpperCase()} · Class {lesson.class} · {lesson.subject}
                  </p>
                </div>
                <VoiceReader text={lessonText} />
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {/* Copyright Disclaimer */}
            {lesson.copyrightDisclaimer && (
              <div className="bg-gray-100 rounded-lg px-4 py-2 text-xs text-gray-500 border border-gray-200">
                {lesson.copyrightDisclaimer}
              </div>
            )}

            {/* Dual-Track Lesson Architecture */}
            {hasDualTrack && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">📚 Lesson — Dual Track</h2>
                <DualTrackLesson dualTrack={lesson.dualTrack} chapterTitle={lesson.title} />
              </div>
            )}

            {/* Competitive Plugin */}
            {hasCompetitivePlugin && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">🏆 Competitive Plugin</h2>
                <CompetitivePlugin
                  activated={lesson.competitivePlugin.activated}
                  streams={lesson.competitivePlugin.streams ?? []}
                  edgeModules={lesson.competitivePlugin.edgeModules ?? []}
                  voiceFlashcards={lesson.competitivePlugin.voiceFlashcards ?? []}
                />
              </div>
            )}

            {/* Quiz Section */}
            {lesson.quiz && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">🎯 Chapter Quiz</h2>
                {hasStagesQuiz ? (
                  <SeniorQuizPlayer stages={lesson.quiz.stages} quizTitle={lesson.quiz.title} />
                ) : (
                  <QuizPlayer questions={lesson.quiz.questions} chapterId={0} />
                )}
              </div>
            )}
          </main>
        </div>
      );
    }
  }

  // Fallback: existing syllabus-based chapter page (junior wing)
  const chapterId = parseInt(chapterParam.replace('chapter-', ''), 10);
  const syllabus = await getSyllabus(params.board, params.class, params.subject);

  if (!syllabus) notFound();

  const chapter = syllabus.chapters.find((c: { id: number }) => c.id === chapterId);
  if (!chapter) notFound();

  const lessonText = `${chapter.title}. ${chapter.summary} ${chapter.aiEnhancementLesson.content}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-indigo-600">Dashboard</Link>
            <span className="mx-2">›</span>
            <Link href={`/${params.board}/${params.class}/${params.subject}`} className="hover:text-indigo-600 capitalize">
              {params.subject}
            </Link>
            <span className="mx-2">›</span>
            <span className="font-semibold text-gray-900">Chapter {chapterId}</span>
          </nav>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{chapter.title}</h1>
              <p className="text-gray-500 text-sm mt-1 capitalize">
                {syllabus.board} · Class {syllabus.class} · {syllabus.subject}
              </p>
            </div>
            <VoiceReader text={lessonText} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Chapter Summary */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">📖 Chapter Summary</h2>
          <p className="text-gray-700 leading-relaxed">{chapter.summary}</p>
        </div>

        {/* AI Enhancement Lesson */}
        <AILessonPanel lesson={chapter.aiEnhancementLesson} chapterTitle={chapter.title} />

        {/* Quiz Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">🎯 Chapter Quiz</h2>
          <QuizPlayer questions={chapter.quiz} chapterId={chapter.id} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          {chapterId > 1 ? (
            <Link
              href={`/${params.board}/${params.class}/${params.subject}/chapter-${chapterId - 1}`}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:shadow-sm transition-shadow text-sm font-medium"
            >
              ← Previous Chapter
            </Link>
          ) : <div />}
          <Link
            href={`/${params.board}/${params.class}/${params.subject}/chapter-${chapterId + 1}`}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Next Chapter →
          </Link>
        </div>
      </main>
    </div>
  );
}
