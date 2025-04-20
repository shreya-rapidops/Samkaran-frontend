import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left: Navigation Links */}
      <div className="flex gap-6 text-lg font-medium">
        <Link to="/" className="hover:text-blue-600">🏠 Dashboard</Link>
        <Link to="/modules" className="hover:text-blue-600">📚 Modules</Link>
        <Link to="/quiz" className="hover:text-blue-600">📝 Quiz</Link>
        <Link to="/final-exam" className="hover:text-blue-600">📅 Final Exam</Link>
        <Link to="/results" className="hover:text-blue-600">📈 Results</Link>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex gap-4">
        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Register
        </Link>
        <Link to="/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
          Login
        </Link>
      </div>
    </nav>
  );
}
