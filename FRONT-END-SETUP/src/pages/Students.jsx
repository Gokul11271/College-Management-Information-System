import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/students", newStudent)
      .then((res) => {
        setStudents([...students, res.data]);
        setNewStudent({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          department: "",
        });
      })
      .catch((err) => console.error("Error adding student:", err));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Students</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="First Name"
          value={newStudent.firstName}
          onChange={(e) =>
            setNewStudent({ ...newStudent, firstName: e.target.value })
          }
          className="border p-2 rounded w-1/5"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newStudent.lastName}
          onChange={(e) =>
            setNewStudent({ ...newStudent, lastName: e.target.value })
          }
          className="border p-2 rounded w-1/5"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent({ ...newStudent, email: e.target.value })
          }
          className="border p-2 rounded w-1/5"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newStudent.phone}
          onChange={(e) =>
            setNewStudent({ ...newStudent, phone: e.target.value })
          }
          className="border p-2 rounded w-1/5"
        />
        <input
          type="text"
          placeholder="Department"
          value={newStudent.department}
          onChange={(e) =>
            setNewStudent({ ...newStudent, department: e.target.value })
          }
          className="border p-2 rounded w-1/5"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">First Name</th>
            <th className="py-2 px-4 border">Last Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Department</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{s.id}</td>
              <td className="py-2 px-4 border">{s.firstName}</td>
              <td className="py-2 px-4 border">{s.lastName}</td>
              <td className="py-2 px-4 border">{s.email}</td>
              <td className="py-2 px-4 border">{s.phone}</td>
              <td className="py-2 px-4 border">{s.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
