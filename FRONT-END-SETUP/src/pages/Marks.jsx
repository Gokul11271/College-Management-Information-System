import React, { useState } from "react";
import axios from "axios";

export default function Marks() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/marks/search?name=${search}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error("Error fetching marks:", err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Search Student Marks</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter student name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Marks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id}>
              <td className="border px-4 py-2">{r.studentName}</td>
              <td className="border px-4 py-2">{r.subject}</td>
              <td className="border px-4 py-2">{r.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
