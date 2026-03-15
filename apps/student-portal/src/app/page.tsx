import Link from 'next/link';

const BOARDS = [
  { name: 'CBSE', slug: 'cbse', emoji: '🇮🇳', classes: [8, 9, 10, 11, 12], color: 'blue' },
  { name: 'ICSE', slug: 'icse', emoji: '📗', classes: [8, 9, 10, 11, 12], color: 'green' },
  { name: 'Karnataka', slug: 'karnataka', emoji: '🏛️', classes: [8, 9, 10, 11, 12], color: 'yellow' },
  { name: 'Tamil Nadu', slug: 'tamil-nadu', emoji: '🎭', classes: [8, 9, 10, 11, 12], color: 'red' },
  { name: 'Kerala', slug: 'kerala', emoji: '🌴', classes: [8, 9, 10, 11, 12], color: 'emerald' },
  { name: 'Andhra Pradesh', slug: 'andhra-pradesh', emoji: '🏺', classes: [8, 9, 10, 11, 12], color: 'purple' },
];

const JUNIOR_SUBJECTS = ['Science', 'Mathematics', 'Social Science', 'English'];
const SENIOR_SCIENCE = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'];
const SENIOR_COMMERCE = ['Economics', 'Accountancy', 'Business Studies', 'Mathematics', 'English'];
const SENIOR_ARTS = ['History', 'Political Science', 'Geography', 'Sociology', 'English'];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Payment / Promotional Banner */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-3 px-4 text-center text-sm font-medium">
        🎓 <strong>Pay ₹5999 + 18% GST</strong> — Why wait to prepare yourself in advance?{' '}
        <span className="opacity-90">Get access to all classes, competitive plugins &amp; voice-enabled learning.</span>{' '}
        <Link href="/pricing" className="underline font-bold ml-2 hover:opacity-80">Get Started →</Link>
      </div>

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

        {/* Board Selection — Junior Wing (8–10) */}
        <h2 className="text-lg font-bold text-gray-900 mb-1">Junior Wing – Classes 8–10</h2>
        <p className="text-sm text-gray-500 mb-4">Foundation, enhancement lessons &amp; AI-powered quizzes.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {BOARDS.map((board) => (
            <div key={board.slug} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{board.emoji}</span>
                <h3 className="font-bold text-gray-900">{board.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {board.classes.filter((c) => c <= 10).map((cls) => (
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

        {/* Senior Wing (11–12) */}
        <h2 className="text-lg font-bold text-gray-900 mb-1">Senior Wing – Classes 11–12 🏆</h2>
        <p className="text-sm text-gray-500 mb-4">
          Dual-Track lessons with Competitive Plugin (JEE / NEET / CA / Design) + Intelligence Age add-ons.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {BOARDS.map((board) => (
            <div key={board.slug} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{board.emoji}</span>
                <h3 className="font-bold text-gray-900">{board.name}</h3>
                <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">11–12</span>
              </div>
              <div className="space-y-2">
                {[11, 12].map((cls) => (
                  <div key={cls}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Class {cls}</p>
                    <div className="flex flex-wrap gap-1.5">
                      <Link href={`/${board.slug}/class-${cls}/physics`} className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors">Physics</Link>
                      <Link href={`/${board.slug}/class-${cls}/chemistry`} className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-2 py-0.5 rounded transition-colors">Chemistry</Link>
                      <Link href={`/${board.slug}/class-${cls}/mathematics`} className="text-xs bg-orange-50 text-orange-700 hover:bg-orange-100 px-2 py-0.5 rounded transition-colors">Maths</Link>
                      <Link href={`/${board.slug}/class-${cls}/biology`} className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2 py-0.5 rounded transition-colors">Biology</Link>
                      <Link href={`/${board.slug}/class-${cls}/economics`} className="text-xs bg-yellow-50 text-yellow-700 hover:bg-yellow-100 px-2 py-0.5 rounded transition-colors">Economics</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access — Subjects */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Access – CBSE Class 8</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {JUNIOR_SUBJECTS.map((subject) => (
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

        {/* Competitive Plugin Info */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🚀</span>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Competitive Plugin — Activate for Class 11 &amp; 12</h3>
              <p className="text-sm text-gray-600">3-tier adaptive quiz: Board → JEE/NEET Level → Intelligence Age</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '📗', label: 'JEE / Engineering', desc: 'Pattern recognition, Vedic Math, 3D geometry, complex problem-solving' },
              { icon: '🔬', label: 'NEET / Medical', desc: 'Mnemonics for biology, AI diagnosis, clinical reasoning, genetics deep-dives' },
              { icon: '🌐', label: 'Intelligence Age', desc: 'AI, robotics, quantum computing, molecular simulation, computational biology' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-4 border border-indigo-100">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{item.label}</div>
                <div className="text-xs text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Senior Subjects Quick Access */}
        <h2 className="text-lg font-bold text-gray-900 mb-3">CBSE Class 11 – Stream Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="font-bold text-blue-700 mb-3">🔬 Science Stream</div>
            <div className="flex flex-col gap-2">
              {SENIOR_SCIENCE.map((s) => (
                <Link key={s} href={`/cbse/class-11/${s.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-gray-700 hover:text-indigo-700 hover:underline">
                  {s}
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="font-bold text-green-700 mb-3">💼 Commerce Stream</div>
            <div className="flex flex-col gap-2">
              {SENIOR_COMMERCE.map((s) => (
                <Link key={s} href={`/cbse/class-11/${s.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-gray-700 hover:text-indigo-700 hover:underline">
                  {s}
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="font-bold text-purple-700 mb-3">🎨 Arts / Humanities Stream</div>
            <div className="flex flex-col gap-2">
              {SENIOR_ARTS.map((s) => (
                <Link key={s} href={`/cbse/class-11/${s.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-gray-700 hover:text-indigo-700 hover:underline">
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-gray-100 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
          <strong>© Copyright Disclaimer:</strong> Textbook content belongs exclusively to its respective authors and authorities (NCERT, KSEAB, CISCE, Tamil Nadu, Kerala, AP State Boards). IIS Academy content offers enhancement, supplemental insights, and technology-powered add-ons strictly for educational purposes. Students are expected to have purchased official textbooks. IIS Academy does not reproduce copyrighted material.{' '}
          <Link href="/legal/terms" className="underline text-gray-600 hover:text-gray-800">Terms &amp; Conditions</Link>
        </div>
      </main>
    </div>
  );
}
