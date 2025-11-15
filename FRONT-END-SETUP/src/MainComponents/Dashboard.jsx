import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard({ user, logout }) {
  if (!user) return null; // Prevent crash

  const [courses, setCourses] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then(setCourses)
      .catch(() => setCourses([]));

    fetch("http://localhost:8080/api/fees")
      .then((res) => res.json())
      .then(setFees)
      .catch(() => setFees([]));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <div className="text-xl font-bold mb-6">College Dashboard</div>

        <nav className="space-y-3">
          <button className="w-full bg-blue-600 py-2 rounded-lg">Home</button>
          <button className="w-full hover:bg-gray-800 py-2 rounded-lg">
            Courses
          </button>
          <button className="w-full hover:bg-gray-800 py-2 rounded-lg">
            Fees
          </button>
          <button className="w-full hover:bg-gray-800 py-2 rounded-lg">
            Attendance
          </button>
          <button className="w-full hover:bg-gray-800 py-2 rounded-lg">
            Results
          </button>
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-600 hover:bg-red-700 py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">
          Welcome, {user.email} ({user.role})
        </h1>

        {/* BOX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="p-6 bg-blue-500 text-white rounded-xl shadow-lg"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-lg font-semibold">Total Courses</h2>
            <p className="text-3xl font-bold mt-2">{courses.length}</p>
          </motion.div>

          <motion.div
            className="p-6 bg-yellow-500 text-white rounded-xl shadow-lg"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-lg font-semibold">Total Fees Records</h2>
            <p className="text-3xl font-bold mt-2">{fees.length}</p>
          </motion.div>

          <motion.div
            className="p-6 bg-green-500 text-white rounded-xl shadow-lg"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-lg font-semibold">Present Today</h2>
            <p className="text-3xl font-bold mt-2">78%</p>
          </motion.div>
        </div>

        {/* DETAILS SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Courses</h2>
            <ul className="space-y-2">
              {courses.map((c) => (
                <li
                  key={c.id}
                  className="border p-3 rounded-lg hover:bg-gray-100"
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Fees</h2>
            <ul className="space-y-2">
              {fees.map((f) => (
                <li
                  key={f.id}
                  className="border p-3 rounded-lg hover:bg-gray-100"
                >
                  ₹ {f.amount} – {f.status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
