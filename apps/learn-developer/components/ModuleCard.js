import Link from 'next/link';

/**
 * ModuleCard – displays a learning module summary card.
 *
 * @param {object} props
 * @param {string|number} props.id       – unique module identifier
 * @param {string}        props.title    – module title
 * @param {string}        props.description – short description of the module
 * @param {string}        [props.icon]   – emoji or short icon string
 * @param {string}        [props.level]  – 'beginner' | 'intermediate' | 'advanced'
 * @param {string[]}      [props.topics] – list of topics covered
 * @param {string}        [props.href]   – link destination; defaults to /module/{id}
 * @param {boolean}       [props.completed] – whether the module is completed
 */
export default function ModuleCard({
  id,
  title,
  description,
  icon,
  level = 'beginner',
  topics = [],
  href,
  completed = false,
}) {
  const levelColors = {
    beginner: { bg: 'bg-green-100', text: 'text-green-700' },
    intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    advanced: { bg: 'bg-red-100', text: 'text-red-700' },
  };

  const { bg, text } = levelColors[level] || levelColors.beginner;
  const destination = href || `/module/${id}`;

  return (
    <Link
      href={destination}
      className="block bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
            completed ? 'bg-green-100' : 'bg-indigo-100'
          }`}
          aria-hidden="true"
        >
          {completed ? '✓' : (icon || '📦')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
              {title}
            </h3>
            <span
              className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${bg} ${text}`}
            >
              {level}
            </span>
          </div>

          {description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          )}

          {topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {topic}
                </span>
              ))}
              {topics.length > 4 && (
                <span className="text-xs text-gray-400">+{topics.length - 4} more</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
