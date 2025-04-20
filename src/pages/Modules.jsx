import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const API_KEY = "AIzaSyA_5hTxftHFLexSQOpYKw4GesNLcvLSBk8";

const playlists = [
  { title: "Mathematics", playlistId: "PLxyGaR3hEy3gk_Li5kx4pJ7TSOYE2EQPQ" },
  { title: "Physics", playlistId: "PLw2ZiQ6OwlOV9hu0ZSsr4s2zNBl1kD1-A" },
  { title: "Chemistry", playlistId: "PL2Li3eVAuCF4WFZbON_4dJ4k5HiGhAQjS" },
  { title: "General Studies", playlistId: "PLw2ZiQ6OwlOVItTF7ZgFLaYQAOuIWkuvr" },
  { title: "Aptitude", playlistId: "PL8p2I9GklV454LdGfDOw0KkNazKuA-6B2" },
  { title: "English", playlistId: "PLt5oqnWoj07h0_H0BjeFqkzw8OSBlXnu2" },
];

export default function Modules() {
  const [watchedMap, setWatchedMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWatchedProgress() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("video_progress")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("❌ Failed to fetch progress:", error);
        return;
      }

      const progressMap = {};

      playlists.forEach((course) => {
        const courseVideos = data.filter((v) => v.playlist_id === course.playlistId);
        const watchedCount = courseVideos.filter((v) => v.watched).length;
        progressMap[course.playlistId] = watchedCount >= 3; // Adjust threshold as needed
      });

      setWatchedMap(progressMap);
    }

    fetchWatchedProgress();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📚 Samkaran Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((course) => (
          <div
            key={course.title}
            onClick={() => navigate(`/course/${course.playlistId}`)}
            className="cursor-pointer bg-white p-4 rounded shadow hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
            <p className="text-sm text-gray-600">
              {watchedMap[course.playlistId] ? "✅ Completed" : "⏳ In Progress"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
