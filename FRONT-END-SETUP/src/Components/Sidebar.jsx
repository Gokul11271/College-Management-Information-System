import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/students", label: "Students" },
    { to: "/faculty", label: "Faculty" },
    { to: "/courses", label: "Courses" },
    { to: "/departments", label: "Departments" },
    { to: "/fees", label: "Fees" },
  ];

  return (
    <aside className="w-64 bg-blue-700 text-white h-screen p-5">
      <h2 className="text-xl font-semibold mb-8">Menu</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`block px-3 py-2 rounded hover:bg-blue-500 ${
                location.pathname === link.to ? "bg-blue-500" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
