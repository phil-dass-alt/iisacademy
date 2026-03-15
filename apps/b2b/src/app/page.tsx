export default function SchoolDashboard() {
  const students = [
    { name: 'Ravi Kumar', class: 10, board: 'CBSE', quizzes: 24, avgScore: 82, streak: 7 },
    { name: 'Divya Nair', class: 8, board: 'CBSE', quizzes: 18, avgScore: 91, streak: 12 },
    { name: 'Suraj Hegde', class: 9, board: 'CBSE', quizzes: 31, avgScore: 74, streak: 3 },
    { name: 'Pooja Reddy', class: 10, board: 'CBSE', quizzes: 15, avgScore: 68, streak: 1 },
    { name: 'Anand Raj', class: 8, board: 'CBSE', quizzes: 42, avgScore: 95, streak: 21 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IIS</span>
            </div>
            <div>
              <div className="font-bold text-gray-900">IIS Academy</div>
              <div className="text-xs text-gray-500">School Portal · St. Mary&apos;s High School</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
              ● Subscription Active until Dec 2025
            </span>
            <a href="/api/auth/signout" className="text-sm text-gray-500 hover:text-gray-700">Sign Out</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Students', value: '156', icon: '👥' },
            { label: 'Active This Week', value: '124', icon: '✅' },
            { label: 'Avg. Score', value: '78%', icon: '📊' },
            { label: 'Quizzes This Month', value: '2,847', icon: '🎯' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">🏆 Top Performers This Week</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Rank</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Class</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Quizzes</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Avg. Score</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student, idx) => (
                <tr key={student.name} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-bold text-gray-600">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-3 text-gray-500">Class {student.class}</td>
                  <td className="px-6 py-3 text-gray-600">{student.quizzes}</td>
                  <td className="px-6 py-3">
                    <span className={`font-semibold ${student.avgScore >= 85 ? 'text-green-600' : student.avgScore >= 70 ? 'text-yellow-600' : 'text-red-500'}`}>
                      {student.avgScore}%
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">🔥 {student.streak} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-indigo-900 mb-2">Need to add more students or classes?</h3>
          <p className="text-indigo-700 text-sm mb-4">Contact us to expand your school subscription or access custom reports.</p>
          <a
            href="mailto:schools@iisacademy.com"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
          >
            Contact School Support
          </a>
        </div>
      </main>
    </div>
  );
}
