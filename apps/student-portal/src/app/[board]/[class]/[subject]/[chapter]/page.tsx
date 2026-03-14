import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { AILessonPanel } from '@/components/AILessonPanel';
import { QuizPlayer } from '@/components/QuizPlayer';
import { VoiceReader } from '@/components/VoiceReader';

interface ChapterPageProps {
  params: {
    board: string;
    class: string;
    subject: string;
    chapter: string;
  };
}

async function getSyllabus(board: string, cls: string, subject: string) {
  try {
    const dataPath = path.join(process.cwd(), '../../data/syllabus', board, cls, `${subject}.json`);
    const content = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const chapterId = parseInt(params.chapter.replace('chapter-', ''), 10);
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
