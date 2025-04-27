// components/MainLayout.jsx
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const location = useLocation();

  // Routes where we DON'T want navbar (like login/register)
  const noNavbarRoutes = ["/login", "/register"];

  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
}
