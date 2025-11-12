// src/pages/Faculty.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [newFaculty, setNewFaculty] = useState({
    name: "",
      email: "",
      phone: "",
      department: "",
    designation: "",
  });
// private String name;
//     private String email;
//     private String phone;
//     private String department;
//     private String designation;
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/faculty")

      .then((res) => setFaculty(res.data))
      .catch((err) => console.error("Error fetching faculty:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/faculty", newFaculty)
      .then((res) => {
        setFaculty([...faculty, res.data]);
        setNewFaculty({
          name: "",
            email: "",
            phone: "",
          department: "",
          designation: "",
        });
      })
      .catch((err) => console.error("Error adding faculty:", err));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Faculty Management</h2>

      {/* Add Faculty Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Name"
          value={newFaculty.name}
          onChange={(e) =>
            setNewFaculty({ ...newFaculty, name: e.target.value })
          }
          className="border p-2 rounded w-1/4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newFaculty.email}
          onChange={(e) =>
            setNewFaculty({ ...newFaculty, email: e.target.value })
          }
          className="border p-2 rounded w-1/4"
          required
        />
        <input
          type="phone"
          placeholder="phone"
          value={newFaculty.phone}
          onChange={(e) =>
            setNewFaculty({ ...newFaculty, phone: e.target.value })
          }
          className="border p-2 rounded w-1/4"
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={newFaculty.department}
          onChange={(e) =>
            setNewFaculty({ ...newFaculty, department: e.target.value })
          }
          className="border p-2 rounded w-1/4"
          required
        />
        <input
          type="text"
          placeholder="designation"
          value={newFaculty.designation}
          onChange={(e) =>
            setNewFaculty({ ...newFaculty, designation: e.target.value })
          }
          className="border p-2 rounded w-1/4"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      {/* Faculty Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>

            <th className="py-2 px-4 border">Department</th>
            <th className="py-2 px-4 border">Designation</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((f) => (
            <tr key={f.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{f.id}</td>
              <td className="py-2 px-4 border">{f.name}</td>
              <td className="py-2 px-4 border">{f.email}</td>
              <td className="py-2 px-4 border">{f.phone}</td>
              <td className="py-2 px-4 border">{f.department}</td>
              <td className="py-2 px-4 border">{f.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
