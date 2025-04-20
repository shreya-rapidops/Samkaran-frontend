// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import FinalExam from "./pages/FinalExam";
import Results from "./pages/Results";
import VerifySuccess from "./pages/VerifySuccess";
import Quiz from "./pages/Quiz";
import Navbar from "./components/Navbar";
import CourseDetail from "./pages/CourseDetail";




function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/final-exam" element={<FinalExam />} />
        <Route path="/results" element={<Results />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/course/:playlistId" element={<CourseDetail />} />
      </Routes>
    </>
  );
}

export default App;
