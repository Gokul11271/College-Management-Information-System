import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import api from "../api/api";
import Loading from "../Components/Loading";

export default function Courses() {
  const [search, setSearch] = useState("");

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    courseName: "",
    courseCode: "",
    credits: 0,
    department: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    try {
      const res = await api.get("/courses");
      setCourses(res.data || []);
    } catch {
      setCourses([]);
    }
    setLoading(false);
  }

  async function createCourse(e) {
    e.preventDefault();
    try {
      await api.post("/courses", form);
      setShowForm(false);

      setForm({
        courseName: "",
        courseCode: "",
        credits: 0,
        department: "",
      });

      fetchCourses();
    } catch (e) {
      alert("Failed to create course");
    }
  }

  async function deleteCourse(id) {
    if (!confirm("Delete course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch {
      alert("Failed to delete");
    }
  }

  // 🔍 SEARCH FILTER
  const filteredCourses = courses.filter((c) =>
    `${c.courseName} ${c.courseCode} ${c.department} ${c.credits}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Courses</h2>
            <button
              onClick={() => setShowForm((s) => !s)}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              {showForm ? "Close" : "Add Course"}
            </button>
          </div>

          {/* 🔍 SEARCH BAR */}
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 p-3 w-full md:w-1/3 border rounded shadow-sm"
          />

          {/* Add Course Form */}
          {showForm && (
            <form onSubmit={createCourse} className="mb-6 space-y-3">
              <input
                className="w-full p-3 border rounded"
                placeholder="Course Name"
                value={form.courseName}
                onChange={(e) =>
                  setForm({ ...form, courseName: e.target.value })
                }
                required
              />

              <input
                className="w-full p-3 border rounded"
                placeholder="Course Code"
                value={form.courseCode}
                onChange={(e) =>
                  setForm({ ...form, courseCode: e.target.value })
                }
                required
              />

              <input
                className="w-full p-3 border rounded"
                type="number"
                placeholder="Credits"
                value={form.credits}
                onChange={(e) =>
                  setForm({ ...form, credits: Number(e.target.value) })
                }
                required
              />

              <input
                className="w-full p-3 border rounded"
                placeholder="Department"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                required
              />

              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </form>
          )}

          {/* Courses List */}
          {loading ? (
            <Loading />
          ) : (
            <ul className="space-y-3">
              {filteredCourses.map((c) => (
                <li
                  key={c.id}
                  className="bg-white p-4 rounded shadow flex justify-between"
                >
                  <div>
                    <div className="font-semibold">{c.courseName}</div>
                    <div className="text-sm text-gray-500">{c.courseCode}</div>
                    <div className="text-sm">{c.department}</div>
                    <div className="text-sm text-gray-600">
                      {c.credits} credits
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCourse(c.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
