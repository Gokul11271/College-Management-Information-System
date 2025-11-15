import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8080/api/students";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(API_URL);
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
    });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🎓 Student Management
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg shadow"
      >
        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full mt-6 border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="text-center">
              <td className="border p-2">{s.id}</td>
              <td className="border p-2">
                {s.firstName} {s.lastName}
              </td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">{s.phone}</td>
              <td className="border p-2">{s.department}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
