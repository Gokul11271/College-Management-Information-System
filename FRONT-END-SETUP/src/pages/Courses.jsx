// src/pages/Course.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseCode: "",
    courseName: "",
    credits: "",
    facultyInCharge: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/courses", {
        ...newCourse,
        credits: parseInt(newCourse.credits, 10),
      })
      .then((res) => {
        setCourses([...courses, res.data]);
        setNewCourse({
          courseCode: "",
          courseName: "",
          credits: "",
          facultyInCharge: "",
        });
      })
      .catch((err) => console.error("Error adding course:", err));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Course Management</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Course Code"
          value={newCourse.courseCode}
          onChange={(e) =>
            setNewCourse({ ...newCourse, courseCode: e.target.value })
          }
          className="border p-2 rounded w-1/5"
          required
        />
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.courseName}
          onChange={(e) =>
            setNewCourse({ ...newCourse, courseName: e.target.value })
          }
          className="border p-2 rounded w-1/5"
          required
        />
        <input
          type="number"
          placeholder="Credits"
          value={newCourse.credits}
          onChange={(e) =>
            setNewCourse({ ...newCourse, credits: e.target.value })
          }
          className="border p-2 rounded w-1/5"
          required
        />
        <input
          type="text"
          placeholder="Faculty In Charge"
          value={newCourse.facultyInCharge}
          onChange={(e) =>
            setNewCourse({ ...newCourse, facultyInCharge: e.target.value })
          }
          className="border p-2 rounded w-1/5"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Code</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Credits</th>
            <th className="py-2 px-4 border">Faculty In Charge</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{c.id}</td>
              <td className="py-2 px-4 border">{c.courseCode}</td>
              <td className="py-2 px-4 border">{c.courseName}</td>
              <td className="py-2 px-4 border">{c.credits}</td>
              <td className="py-2 px-4 border">{c.facultyInCharge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
