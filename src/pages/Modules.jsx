const mockModules = [
    {
      week: <a href="/quiz" className="text-blue-600 mt-2 inline-block">
      Take Quiz →
    </a>
    ,
      title: "Python Basics",
      quiz: "Completed",
      lab: "Data Types",
      status: "✅",
    },
    {
      week: 2,
      title: "Control Flow",
      quiz: "Pending",
      lab: "If-Else Conditions",
      status: "🔄",
    },
    {
      week: 3,
      title: "Machine Learning Basics",
      quiz: "Upcoming",
      lab: "Linear Regression",
      status: "🕒",
    },
  ];
  
  export default function Modules() {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">📚 Weekly Modules</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockModules.map((mod) => (
            <div key={mod.week} className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">Week {mod.week}: {mod.title}</h2>
              <p><b>Quiz:</b> {mod.quiz}</p>
              <p><b>Lab:</b> {mod.lab}</p>
              <p className="mt-2"><b>Status:</b> <span className="text-xl">{mod.status}</span></p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  