import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
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
      }

      setLoading(false);
    };

    getUser();
  }, []);

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
    <div className="p-10 max-w-3xl mx-auto">
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

      <div className="bg-white shadow p-6 rounded space-y-3">
        <p>
          <strong>📛 Full Name:</strong> {userData?.firstName} {userData?.lastName}
        </p>
        <p>
          <strong>🏫 Board:</strong> {userData?.board}
        </p>
        <p>
          <strong>📍 City:</strong> {userData?.city}
        </p>
        <p>
          <strong>🗺️ State:</strong> {userData?.state}
        </p>
        <p>
          <strong>🆔 Student ID:</strong>{" "}
          <span className="text-blue-600">{userData?.studentId}</span>
        </p>
      </div>
    </div>
  );
}
