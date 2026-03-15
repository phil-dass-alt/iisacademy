const BOARDS = [
  {
    name: 'CBSE',
    slug: 'cbse',
    classes: ['8', '9', '10', '11', '12'],
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    accent: 'bg-blue-600',
    emoji: '🇮🇳',
    description: 'Central Board of Secondary Education',
  },
  {
    name: 'ICSE',
    slug: 'icse',
    classes: ['8', '9', '10'],
    color: 'bg-green-50 border-green-200 text-green-800',
    accent: 'bg-green-600',
    emoji: '📗',
    description: 'Indian Certificate of Secondary Education',
  },
  {
    name: 'Karnataka',
    slug: 'karnataka',
    classes: ['8', '9', '10', '11', '12'],
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    accent: 'bg-yellow-600',
    emoji: '🏛️',
    description: 'Karnataka State Board (DSERT/KSEAB)',
  },
  {
    name: 'Tamil Nadu',
    slug: 'tamil-nadu',
    classes: ['8', '9', '10', '11', '12'],
    color: 'bg-red-50 border-red-200 text-red-800',
    accent: 'bg-red-600',
    emoji: '🎭',
    description: 'Tamil Nadu State Board (TNSCERT)',
  },
  {
    name: 'Kerala',
    slug: 'kerala',
    classes: ['8', '9', '10', '11', '12'],
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    accent: 'bg-emerald-600',
    emoji: '🌴',
    description: 'Kerala State Board (SCERT Kerala)',
  },
  {
    name: 'Andhra Pradesh',
    slug: 'andhra-pradesh',
    classes: ['8', '9', '10'],
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    accent: 'bg-purple-600',
    emoji: '🏺',
    description: 'Andhra Pradesh State Board (APSCERT)',
  },
];

export function BoardNav() {
  return (
    <section id="boards" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Board Coverage</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Your Board. Your Syllabus. Your Language.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every chapter mapped exactly to your official curriculum. No irrelevant content — only what you need for your board.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOARDS.map((board) => (
            <div
              key={board.slug}
              className={`border rounded-xl p-6 ${board.color} hover:shadow-md transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-2xl mb-1">{board.emoji}</div>
                  <h3 className="text-xl font-bold">{board.name}</h3>
                  <p className="text-sm opacity-75 mt-1">{board.description}</p>
                </div>
                <span className="text-xs font-medium bg-white/60 rounded-full px-2 py-1 opacity-80">
                  Classes {board.classes[0]}–{board.classes[board.classes.length - 1]}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {board.classes.map((cls) => (
                  <a
                    key={cls}
                    href={`${process.env.NEXT_PUBLIC_STUDENT_PORTAL_URL ?? '#'}/${board.slug}/class-${cls}`}
                    className="bg-white/70 hover:bg-white text-sm font-medium px-3 py-1 rounded-lg transition-colors"
                  >
                    Class {cls}
                  </a>
                ))}
              </div>

              <a
                href="#pricing"
                className="block text-center bg-white/80 hover:bg-white text-sm font-semibold py-2 rounded-lg transition-colors"
              >
                Start Learning →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
