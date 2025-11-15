import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import api from "../api/api";
import Loading from "../Components/Loading";

export default function Students() {
  const [search, setSearch] = useState("");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    try {
      const res = await api.get("/students");
      setStudents(res.data || []);
    } catch {
      setStudents([]);
    }
    setLoading(false);
  }

  async function createStudent(e) {
    e.preventDefault();
    try {
      await api.post("/students", form);
      setForm({ firstName: "", lastName: "", email: "", phone: "" });
      fetchStudents();
    } catch {
      alert("Create failed");
    }
  }

  async function deleteStudent(id) {
    if (!confirm("Delete student?")) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch {
      alert("Delete failed");
    }
  }

  const filteredStudents = students.filter((s) =>
    `${s.firstName} ${s.lastName} ${s.email} ${s.phone}`
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
            <h2 className="text-2xl font-bold">Students</h2>
          </div>

          {/* 🔍 Search Bar */}
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 p-3 w-full md:w-1/3 border rounded shadow-sm"
          />

          {/* Add Student Form */}
          <form
            onSubmit={createStudent}
            className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            <input
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="p-2 border rounded"
            />
            <div />
            <button className="bg-green-600 text-white rounded px-4 py-2">
              Add Student
            </button>
          </form>

          {/* Students List */}
          {loading ? (
            <Loading />
          ) : (
            <ul className="space-y-3">
              {filteredStudents.map((s) => (
                <li
                  key={s.id}
                  className="bg-white p-4 rounded shadow flex justify-between"
                >
                  <div>
                    <div className="font-semibold">
                      {s.firstName} {s.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{s.email}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => deleteStudent(s.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
