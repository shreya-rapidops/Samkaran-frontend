// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">Samkaran</Link>

      <div className="space-x-4">
        {session ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/modules" className="hover:underline">Modules</Link>
            <Link to="/quiz" className="hover:underline">Quiz</Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
