export default function Dashboard() {
    const user = { name: "Abhijeet" };
  
    return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-5">
          <h1 className="text-2xl font-bold mb-6">🧠 Samkaran</h1>
          <nav className="space-y-4">
            <a href="/dashboard" className="block text-blue-600 font-semibold">🏠 Dashboard</a>
            <a href="/modules" className="block">📚 Modules</a>
            <a href="/final-exam" className="block">📝 Final Exam</a>
            <a href="/results" className="block">📈 Results</a>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-10">
          <h2 className="text-3xl font-bold mb-6">👋 Welcome, {user.name}</h2>
  
          {/* Progress Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">📊 Course Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">6/10 Modules Completed</p>
            </div>
  
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">📝 Final Exam</h3>
              <p className="text-lg text-gray-700">Scheduled: <b>May 5, 2025</b></p>
              <p className="text-sm text-green-600 mt-1">You're on track!</p>
            </div>
  
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">🏆 All India Rank</h3>
              <p className="text-2xl font-bold text-blue-600">#1345</p>
              <p className="text-sm text-gray-500">Based on practice exams</p>
            </div>
          </div>
  
          {/* Weekly Module Highlight */}
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-2">🔥 This Week’s Module</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Lecture: <b>Machine Learning Basics</b></li>
              <li>Quiz: <b>Week 3 Assessment</b></li>
              <li>Lab Task: <b>Linear Regression</b></li>
            </ul>
            <a href="/modules" className="text-blue-600 mt-2 inline-block">Go to Module →</a>
          </div>
  
          {/* AI Recommendation */}
          <div className="bg-yellow-50 p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-2">🤖 AI Recommendation</h3>
            <p className="text-gray-700">You struggled with <b>Week 1: Python Basics</b>. Consider reviewing the content and retaking the quiz.</p>
            <a href="/modules?week=1" className="text-blue-600 mt-2 inline-block">Review Week 1 →</a>
          </div>
        </main>
      </div>
    );
  }
  