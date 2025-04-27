
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
    <nav className="flex items-center justify-between px-6 py-3 shadow bg-white">
      <Link to="/" className="text-xl font-bold text-blue-600">Samkaran</Link>
      <div className="flex items-center space-x-6">
        {session ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/modules">Modules</Link>
            <Link to="/quiz">Mock Test</Link>
            <Link to="/final-exam">Final Exam</Link>
            <Link to="/results">Results</Link>
            
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// // src/components/Navbar.jsx
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function Navbar() {
//   const [session, setSession] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow p-4 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold text-blue-600">Samkaran</Link>

//       <div className="space-x-4">
//         {session ? (
//           <>
//             <Link to="/dashboard" className="hover:underline">Dashboard</Link>
//             <Link to="/modules" className="hover:underline">Modules</Link>
//             <Link to="/quiz" className="hover:underline">Quiz</Link>
//             <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:underline">Login</Link>
//             <Link to="/register" className="hover:underline">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
