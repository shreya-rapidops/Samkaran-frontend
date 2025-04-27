import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Toaster } from "react-hot-toast";


// Pages and Components
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import FinalExam from "./pages/FinalExam";
import Results from "./pages/Results";
import VerifySuccess from "./pages/VerifySuccess";
import CourseDetail from "./pages/CourseDetail";
import QuizLanding from "./pages/QuizLanding";
import CourseQuiz from "./pages/CourseQuiz";

// Access Control
import { ProtectedRoute, GuestOnlyRoute } from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth changed:", session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Guest only pages (login/register) */}
        <Route path="/" element={<GuestOnlyRoute><Navigate to="/login" /></GuestOnlyRoute>} />
        <Route path="/login" element={<GuestOnlyRoute><Login /></GuestOnlyRoute>} />
        <Route path="/register" element={<GuestOnlyRoute><Register /></GuestOnlyRoute>} />
        
        {/* Protected pages (only after login) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/modules" element={<ProtectedRoute><Modules /></ProtectedRoute>} />
        <Route path="/final-exam" element={<ProtectedRoute><FinalExam /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/verify-success" element={<ProtectedRoute><VerifySuccess /></ProtectedRoute>} />
        <Route path="/course/:playlistId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><QuizLanding /></ProtectedRoute>} />
        <Route path="/quiz/:categoryId" element={<ProtectedRoute><CourseQuiz /></ProtectedRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;


// import { useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { supabase } from "./supabaseClient";

// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Modules from "./pages/Modules";
// import FinalExam from "./pages/FinalExam";
// import Results from "./pages/Results";
// import VerifySuccess from "./pages/VerifySuccess";
// import CourseDetail from "./pages/CourseDetail";
// import QuizLanding from "./pages/QuizLanding";
// import CourseQuiz from "./pages/CourseQuiz";
// import MainLayout from "./components/MainLayout";
// import { ProtectedRoute, GuestOnlyRoute } from "./components/ProtectedRoute";

// function App() {
//   useEffect(() => {
//     // On initial load, you can get the session here if needed
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       console.log("Initial session:", session);
//     });

//     // Auth state change listener
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       console.log("Auth changed:", session);
//     });

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <Routes>
//       <Route path="/" element={<GuestOnlyRoute><Login /></GuestOnlyRoute>} />
//         <Route path="/login" element={<GuestOnlyRoute><Login /></GuestOnlyRoute>} />
//         <Route path="/register" element={<GuestOnlyRoute><Register /></GuestOnlyRoute>} />
//         {/* <Route path="/" element={<Navigate to="/login" />} /> */}
//         {/* <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} /> */}
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/modules" element={<Modules />} />
//         <Route path="/final-exam" element={<FinalExam />} />
//         <Route path="/results" element={<Results />} />
//         <Route path="/verify-success" element={<VerifySuccess />} />
//         <Route path="/course/:playlistId" element={<CourseDetail />} />
//         <Route path="/quiz" element={<QuizLanding />} />
//         <Route path="/quiz/:categoryId" element={<CourseQuiz />} />
        
//       </Routes>
//     </>
//   );
// }

// export default App;
