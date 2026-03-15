import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { AILessonPanel } from '@/components/AILessonPanel';
import { QuizPlayer } from '@/components/QuizPlayer';
import { VoiceReader } from '@/components/VoiceReader';
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  difficulty?: string;
  feedback: {
    correct: string;
    incorrect: string;
    intelligenceAgeHint: string;
  };
}


interface ChapterPageProps {
  params: Promise<{
    board: string;
    class: string;
    subject: string;
    chapter: string;
  }>;
}

const VALID_SEGMENT = /^[a-z0-9-]+$/i;

function normalizeClassSlug(cls: string): string {
  return cls.replace(/-/g, '');
}

interface RawChapter {
  id?: number | string;
  number?: number;
  name?: string;
  title?: string;
  summary?: string;
  topics?: string[];
  enhancement?: string | null;
  aiEnhancementLesson?: { title: string; content: string; practicalAddOn: string };
  quiz?: unknown[];
  competitivePlugin?: unknown;
}

interface RawSyllabus {
  board: string;
  class: number;
  subject: string;
  chapters: RawChapter[];
  [key: string]: unknown;
}

function normalizeSyllabus(raw: RawSyllabus) {
  return {
    ...raw,
    chapters: raw.chapters.map((c) => ({
      id: typeof c.id === 'number' ? c.id : c.number ?? 1,
      title: c.title ?? c.name ?? 'Chapter',
      summary: c.summary ?? (c.topics ? c.topics.join(' · ') : ''),
      aiEnhancementLesson: c.aiEnhancementLesson ?? {
        title: `${c.enhancement ?? 'Intelligence Age'} Enhancement`,
        content: `This chapter connects to ${c.enhancement ?? 'modern technology'} applications in the real world.`,
        practicalAddOn: 'Explore how the concepts in this chapter are used in cutting-edge technology and industry.',
      },
      quiz: Array.isArray(c.quiz) ? (c.quiz as QuizQuestion[]) : [],
      competitivePlugin: c.competitivePlugin ?? null,
    })),
  };
}

async function getSyllabus(board: string, cls: string, subject: string) {
  if (!VALID_SEGMENT.test(board) || !VALID_SEGMENT.test(cls) || !VALID_SEGMENT.test(subject)) {
    return null;
  }
  try {
    const normalizedCls = normalizeClassSlug(cls);
    const dataPath = path.join(process.cwd(), '../../data/syllabi', board, normalizedCls, `${subject}.json`);
    const content = fs.readFileSync(dataPath, 'utf-8');
    const raw: RawSyllabus = JSON.parse(content);
    return normalizeSyllabus(raw);
  } catch {
    return null;
  }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const resolvedParams = await params;
  const chapterId = parseInt(resolvedParams.chapter.replace('chapter-', ''), 10);
  const syllabus = await getSyllabus(resolvedParams.board, resolvedParams.class, resolvedParams.subject);

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
            <Link href={`/${resolvedParams.board}/${resolvedParams.class}/${resolvedParams.subject}`} className="hover:text-indigo-600 capitalize">
              {resolvedParams.subject}
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
              href={`/${resolvedParams.board}/${resolvedParams.class}/${resolvedParams.subject}/chapter-${chapterId - 1}`}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:shadow-sm transition-shadow text-sm font-medium"
            >
              ← Previous Chapter
            </Link>
          ) : <div />}
          <Link
            href={`/${resolvedParams.board}/${resolvedParams.class}/${resolvedParams.subject}/chapter-${chapterId + 1}`}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Next Chapter →
          </Link>
        </div>
      </main>
    </div>
  );
}
