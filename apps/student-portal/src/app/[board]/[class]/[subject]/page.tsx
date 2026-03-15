import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

interface SubjectPageProps {
  params: {
    board: string;
    class: string;
    subject: string;
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

export default async function SubjectPage({ params }: SubjectPageProps) {
  const syllabus = await getSyllabus(params.board, params.class, params.subject);

  if (!syllabus) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-indigo-600">Dashboard</Link>
            <span className="mx-2">›</span>
            <span className="capitalize">{params.board.replace(/-/g, ' ')}</span>
            <span className="mx-2">›</span>
            <span className="capitalize">{params.class.replace(/-/g, ' ')}</span>
            <span className="mx-2">›</span>
            <span className="capitalize font-semibold text-gray-900">{syllabus.subject}</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {syllabus.subject} – {syllabus.board} Class {syllabus.class}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{syllabus.chapters.length} chapters · Tap any chapter to start learning</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {syllabus.chapters.map((chapter: { id: number; title: string; summary: string }) => (
            <Link
              key={chapter.id}
              href={`/${params.board}/${params.class}/${params.subject}/chapter-${chapter.id}`}
              className="block bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-sm">
                  {chapter.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{chapter.summary}</p>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
