import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user || error) {
        navigate("/login");
      } else {
        setUserData(user.user_metadata);
        fetchProgress(user.id);
        fetchNews();
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const fetchProgress = async (userId) => {
    const { data, error } = await supabase
      .from("video_progress")
      .select("playlist_id, watched")
      .eq("user_id", userId);

    if (!error && data) {
      const courseMap = {};
      data.forEach((entry) => {
        if (!courseMap[entry.playlist_id]) courseMap[entry.playlist_id] = 0;
        if (entry.watched) courseMap[entry.playlist_id]++;
      });
      const progressList = Object.entries(courseMap).map(([id, count]) => ({
        title: id, // Ideally map ID to course name
        completedModules: count,
        totalModules: 5,
      }));
      setProgressData(progressList);
    }
  };

  const fetchNews = async () => {
    // Hardcoded news for now
    setNewsItems([
      {
        title: "📢 SSC CGL Notification Released – Apply Now!",
        link: "https://ssc.nic.in/"
      },
      {
        title: "📚 CUET 2025 Exam Dates Announced",
        link: "https://cuet.samarth.ac.in/"
      },
      {
        title: "🚀 ISRO Technician Recruitment – Open for All Boards",
        link: "https://www.isro.gov.in/"
      }
    ]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        🔄 Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          👋 Welcome, {userData?.firstName || "User"}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow p-6 rounded space-y-3 mb-8">
        <p><strong>📛 Full Name:</strong> {userData?.firstName} {userData?.lastName}</p>
        <p><strong>🏫 Board:</strong> {userData?.board}</p>
        <p><strong>📍 City:</strong> {userData?.city}</p>
        <p><strong>🗺️ State:</strong> {userData?.state}</p>
        <p><strong>🆔 Student ID:</strong> <span className="text-blue-600">{userData?.studentId}</span></p>
      </div>

      <div className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">📈 Your Course Progress</h2>
        {progressData.length === 0 ? (
          <p>No progress yet. Start learning today!</p>
        ) : (
          <ul>
            {progressData.map((course, idx) => (
              <li key={idx} className="mb-4">
                <div className="flex justify-between">
                  <span>{course.title}</span>
                  <span>{course.completedModules}/{course.totalModules} Modules</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(course.completedModules / course.totalModules) * 100}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">🗞️ Latest Exam & Govt Job News</h2>
        <ul className="list-disc list-inside">
          {newsItems.map((news, index) => (
            <li key={index} className="mb-2">
              <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {news.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}