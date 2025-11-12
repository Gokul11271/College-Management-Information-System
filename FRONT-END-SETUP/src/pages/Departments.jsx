import { useEffect, useState } from "react";

export default function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <ul className="list-disc pl-6">
        {departments.map((d) => (
          <li key={d.id} className="mb-2">
            <span className="font-semibold">{d.name}</span> — {d.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
