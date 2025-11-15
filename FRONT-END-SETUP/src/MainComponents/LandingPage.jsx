import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-indigo-300">
      <h1 className="text-5xl font-bold text-indigo-700 mb-6">
        College Management System
      </h1>
      <p className="text-gray-700 mb-10">
        Manage Courses, Fees, and Marks with ease!
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
