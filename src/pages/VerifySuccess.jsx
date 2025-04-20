import { Link } from "react-router-dom";

export default function VerifySuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-md w-full text-center bg-gray-50 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Email Verified!</h1>
        <p className="text-gray-700 mb-6">
          Your email has been successfully confirmed. You can now log in and access your dashboard.
        </p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go to Login →
        </Link>
      </div>
    </div>
  );
}
