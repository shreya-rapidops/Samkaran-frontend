// pages/VerifySuccess.jsx
import { Link } from "react-router-dom";

export default function VerifySuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-green-600">✅ Registration Successful!</h1>
        <p className="text-gray-700 mb-6">
          Please check your email and verify your account before logging in.
        </p>
        <Link to="/login">
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
}
