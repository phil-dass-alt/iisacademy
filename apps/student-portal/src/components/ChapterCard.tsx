import Link from 'next/link';

interface ChapterCardProps {
  id: number;
  title: string;
  summary: string;
  board: string;
  classSlug: string;
  subject: string;
  completed?: boolean;
  score?: number;
}

export function ChapterCard({ id, title, summary, board, classSlug, subject, completed, score }: ChapterCardProps) {
  return (
    <Link
      href={`/${board}/${classSlug}/${subject}/chapter-${id}`}
      className="block bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
          completed ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'
        }`}>
          {completed ? '✓' : id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors truncate">
              {title}
            </h3>
            {completed && score !== undefined && (
              <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                score >= 80 ? 'bg-green-100 text-green-700' : score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                {score}%
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{summary}</p>
        </div>
      </div>
    </Link>
  );
}
