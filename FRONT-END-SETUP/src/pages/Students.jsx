// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Students() {
//   const [students, setStudents] = useState([]);
//   const [newStudent, setNewStudent] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     department: "",
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/students")
//       .then((res) => setStudents(res.data))
//       .catch((err) => console.error("Error fetching students:", err));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:8080/api/students", newStudent)
//       .then((res) => {
//         setStudents([...students, res.data]);
//         setNewStudent({
//           firstName: "",
//           lastName: "",
//           email: "",
//           phone: "",
//           department: "",
//         });
//       })
//       .catch((err) => console.error("Error adding student:", err));
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Students</h2>

//       <form onSubmit={handleSubmit} className="mb-6 flex gap-3 flex-wrap">
//         <input
//           type="text"
//           placeholder="First Name"
//           value={newStudent.firstName}
//           onChange={(e) =>
//             setNewStudent({ ...newStudent, firstName: e.target.value })
//           }
//           className="border p-2 rounded w-1/5"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Last Name"
//           value={newStudent.lastName}
//           onChange={(e) =>
//             setNewStudent({ ...newStudent, lastName: e.target.value })
//           }
//           className="border p-2 rounded w-1/5"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newStudent.email}
//           onChange={(e) =>
//             setNewStudent({ ...newStudent, email: e.target.value })
//           }
//           className="border p-2 rounded w-1/5"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Phone"
//           value={newStudent.phone}
//           onChange={(e) =>
//             setNewStudent({ ...newStudent, phone: e.target.value })
//           }
//           className="border p-2 rounded w-1/5"
//         />
//         <input
//           type="text"
//           placeholder="Department"
//           value={newStudent.department}
//           onChange={(e) =>
//             setNewStudent({ ...newStudent, department: e.target.value })
//           }
//           className="border p-2 rounded w-1/5"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 rounded">
//           Add
//         </button>
//       </form>

//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="py-2 px-4 border">ID</th>
//             <th className="py-2 px-4 border">First Name</th>
//             <th className="py-2 px-4 border">Last Name</th>
//             <th className="py-2 px-4 border">Email</th>
//             <th className="py-2 px-4 border">Phone</th>
//             <th className="py-2 px-4 border">Department</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((s) => (
//             <tr key={s.id} className="hover:bg-gray-50">
//               <td className="py-2 px-4 border">{s.id}</td>
//               <td className="py-2 px-4 border">{s.firstName}</td>
//               <td className="py-2 px-4 border">{s.lastName}</td>
//               <td className="py-2 px-4 border">{s.email}</td>
//               <td className="py-2 px-4 border">{s.phone}</td>
//               <td className="py-2 px-4 border">{s.department}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// src/pages/Students.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import api from "../api/api"
import Loading from "../Components/Loading";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

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

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Students</h2>
          </div>

          <form onSubmit={createStudent} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
            <input placeholder="First name" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} className="p-2 border rounded"/>
            <input placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} className="p-2 border rounded"/>
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="p-2 border rounded"/>
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="p-2 border rounded"/>
            <div />
            <button className="bg-green-600 text-white rounded px-4 py-2">Add Student</button>
          </form>

          {loading ? <Loading /> : (
            <ul className="space-y-3">
              {students.map(s=>(
                <li key={s.id} className="bg-white p-4 rounded shadow flex justify-between">
                  <div>
                    <div className="font-semibold">{s.firstName} {s.lastName}</div>
                    <div className="text-sm text-gray-500">{s.email}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={()=>deleteStudent(s.id)} className="text-red-600">Delete</button>
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
