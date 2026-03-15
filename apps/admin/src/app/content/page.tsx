export default function ContentManagement() {
  const boards = [
    { name: 'CBSE', chapters: 80, quizzes: 400, status: 'complete' },
    { name: 'ICSE', chapters: 30, quizzes: 150, status: 'in-progress' },
    { name: 'Karnataka', chapters: 60, quizzes: 300, status: 'complete' },
    { name: 'Tamil Nadu', chapters: 50, quizzes: 250, status: 'in-progress' },
    { name: 'Kerala', chapters: 40, quizzes: 200, status: 'planned' },
    { name: 'Andhra Pradesh', chapters: 30, quizzes: 150, status: 'planned' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage syllabus, chapters, and quiz content</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Add Chapter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {boards.map((board) => (
          <div key={board.name} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-gray-900 w-32">{board.name}</h3>
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{board.chapters}</span> chapters
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{board.quizzes}</span> quiz questions
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  board.status === 'complete' ? 'bg-green-100 text-green-700' :
                  board.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {board.status === 'complete' ? '✅ Complete' :
                   board.status === 'in-progress' ? '🔄 In Progress' : '📋 Planned'}
                </span>
                <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                  Edit Content →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
