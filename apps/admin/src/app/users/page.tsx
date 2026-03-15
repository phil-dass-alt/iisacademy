export default function UserManagement() {
  const users = [
    { id: 1, name: 'Aditya Kumar', email: 'aditya@example.com', board: 'CBSE', class: 10, plan: 'High-5', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Sneha Rao', email: 'sneha@example.com', board: 'Karnataka', class: 8, plan: 'High-5', status: 'active', joined: '2024-01-14' },
    { id: 3, name: 'Vikram Pillai', email: 'vikram@example.com', board: 'Kerala', class: 11, plan: 'High-5', status: 'active', joined: '2024-01-13' },
    { id: 4, name: 'Meera Iyer', email: 'meera@example.com', board: 'Tamil Nadu', class: 9, plan: 'High-5', status: 'expired', joined: '2023-12-01' },
    { id: 5, name: 'Arjun Sharma', email: 'arjun@example.com', board: 'CBSE', class: 12, plan: 'High-5', status: 'active', joined: '2024-01-10' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage student accounts and subscriptions</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search users..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Student</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Board / Class</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Plan</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Joined</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-gray-500 text-xs">{user.email}</div>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {user.board} · Class {user.class}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    {user.plan}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status === 'active' ? '● Active' : '● Expired'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{user.joined}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mr-3">View</button>
                  <button className="text-xs text-red-500 hover:text-red-700 font-medium">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
