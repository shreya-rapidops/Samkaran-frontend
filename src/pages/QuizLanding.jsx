// pages/QuizLanding.jsx
import { Link } from "react-router-dom";

const subjectMap = [
  { name: "Mathematics", id: "19" },      // OpenTDB: Mathematics
  { name: "Physics", id: "17" },          // Science & Nature
  { name: "Chemistry", id: "27" },        // Animals (Closest science placeholder)
  { name: "General Studies", id: "9" },   // General Knowledge
  { name: "Aptitude", id: "18" },         // Computers
  { name: "English", id: "10" },          // Books
];

export default function QuizLanding() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">📝 Mock Tests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectMap.map((subj) => (
          <Link
            to={`/quiz/${subj.id}`}
            key={subj.id}
            className="bg-white p-6 shadow rounded hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold mb-2">{subj.name}</h2>
            <p className="text-sm text-blue-600">Start Mock Test →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
