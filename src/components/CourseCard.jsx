import { Link } from "react-router-dom";

export default function CourseCard({ title, playlistId, completed }) {
  return (
    <Link to={`/course/${playlistId}`}>
      <div className="bg-white shadow p-4 rounded-lg hover:shadow-lg transition">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className={`text-sm ${completed ? "text-green-600" : "text-yellow-500"}`}>
          {completed ? "✅ Completed" : "🕒 In Progress"}
        </p>
      </div>
    </Link>
  );
}