export default function AdminDashboard() {
  const stats = [
    { label: 'Total Students', value: '1,247', change: '+12%', icon: '👥', color: 'blue' },
    { label: 'Active Subscriptions', value: '983', change: '+8%', icon: '💳', color: 'green' },
    { label: 'Revenue (This Month)', value: '₹24,850', change: '+18%', icon: '💰', color: 'indigo' },
    { label: 'Quizzes Taken Today', value: '3,492', change: '+5%', icon: '🎯', color: 'purple' },
    { label: 'Schools (B2B)', value: '14', change: '+2', icon: '🏫', color: 'yellow' },
    { label: 'Avg. Session Time', value: '18 min', change: '+2 min', icon: '⏱️', color: 'pink' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">IIS Academy platform overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-xs text-green-600 mt-2 font-medium">{stat.change} from last month</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Recent Signups</h2>
          <div className="space-y-3">
            {[
              { name: 'Aditya Kumar', board: 'CBSE', class: 10, time: '2 min ago' },
              { name: 'Sneha Rao', board: 'Karnataka', class: 8, time: '15 min ago' },
              { name: 'Vikram Pillai', board: 'Kerala', class: 11, time: '1 hr ago' },
              { name: 'Meera Iyer', board: 'Tamil Nadu', class: 9, time: '2 hr ago' },
              { name: 'Arjun Sharma', board: 'CBSE', class: 12, time: '3 hr ago' },
            ].map((student) => (
              <div key={student.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.board} · Class {student.class}</p>
                </div>
                <span className="text-xs text-gray-400">{student.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Revenue Breakdown</h2>
          <div className="space-y-3">
            {[
              { source: 'High-5 (Individual)', amount: '₹19,402', percent: 78 },
              { source: 'B2B Schools', amount: '₹4,975', percent: 20 },
              { source: 'Renewals', amount: '₹473', percent: 2 },
            ].map((item) => (
              <div key={item.source}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.source}</span>
                  <span className="font-semibold text-gray-900">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
