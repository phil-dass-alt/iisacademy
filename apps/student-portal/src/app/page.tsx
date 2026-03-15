import Link from 'next/link';

const BOARDS = [
  { name: 'CBSE', slug: 'cbse', emoji: '🇮🇳', classes: [8, 9, 10, 11, 12], color: 'blue' },
  { name: 'ICSE', slug: 'icse', emoji: '📗', classes: [8, 9, 10], color: 'green' },
  { name: 'Karnataka', slug: 'karnataka', emoji: '🏛️', classes: [8, 9, 10, 11, 12], color: 'yellow' },
  { name: 'Tamil Nadu', slug: 'tamil-nadu', emoji: '🎭', classes: [8, 9, 10, 11, 12], color: 'red' },
  { name: 'Kerala', slug: 'kerala', emoji: '🌴', classes: [8, 9, 10, 11, 12], color: 'emerald' },
  { name: 'Andhra Pradesh', slug: 'andhra-pradesh', emoji: '🏺', classes: [8, 9, 10], color: 'purple' },
];

const SUBJECTS = ['Science', 'Mathematics', 'Social Science', 'English'];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IIS</span>
            </div>
            <span className="font-bold text-gray-900">IIS Academy</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Dashboard</Link>
            <Link href="/profile" className="hover:text-gray-900">Profile</Link>
            <Link href="/api/auth/signout" className="text-red-500 hover:text-red-700">Sign Out</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
          <p className="text-gray-600 mt-1">Choose your board and class to continue learning.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Chapters Completed', value: '0', icon: '📚' },
            { label: 'Quizzes Taken', value: '0', icon: '🎯' },
            { label: 'Current Streak', value: '1 day', icon: '🔥' },
            { label: 'Avg. Score', value: '—', icon: '📊' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Board Selection */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">Select Your Board &amp; Class</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {BOARDS.map((board) => (
            <div key={board.slug} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{board.emoji}</span>
                <h3 className="font-bold text-gray-900">{board.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {board.classes.map((cls) => (
                  <Link
                    key={cls}
                    href={`/${board.slug}/class-${cls}/science`}
                    className="text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Class {cls}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Subjects Quick Access */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Access – CBSE Class 8</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject}
              href={`/cbse/class-8/${subject.toLowerCase().replace(/ /g, '-')}`}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">
                {subject === 'Science' ? '🔬' : subject === 'Mathematics' ? '📐' : subject === 'Social Science' ? '🌍' : '📖'}
              </div>
              <div className="text-sm font-semibold text-gray-900">{subject}</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
