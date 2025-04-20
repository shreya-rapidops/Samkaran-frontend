import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow bg-white">
      <div className="flex items-center space-x-6 font-medium">
        <Link to="/" className="hover:text-blue-600">🏠 Dashboard</Link>
        <Link to="/modules" className="hover:text-blue-600">📚 Modules</Link>
        <Link to="/quiz" className="hover:text-blue-600">📝 Mock Test</Link> {/* ✅ Add this */}
        <Link to="/final" className="hover:text-blue-600">🧪 Final Exam</Link>
        <Link to="/results" className="hover:text-blue-600">📊 Results</Link>
      </div>

      <div className="space-x-3">
        <Link to="/register" className="bg-blue-600 text-white px-4 py-1 rounded">Register</Link>
        <Link to="/login" className="border px-4 py-1 rounded">Login</Link>
      </div>
    </nav>
  );
}
