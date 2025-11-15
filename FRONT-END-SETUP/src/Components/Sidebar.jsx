// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";


export default function Sidebar() {
  const loc = useLocation();

  const items = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/courses", label: "Courses" },
    { to: "/students", label: "Students" },
    { to: "/fees", label: "Fees" },
    { to: "/mark", label: "Marks" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-5">
      <div className="text-lg font-bold mb-6">CMS</div>

      <nav className="flex-1 space-y-1">
        {items.map((it) => {
          const active = loc.pathname === it.to;
          return (
            <Link
              to={it.to}
              key={it.to}
              className={`block px-4 py-2 rounded-md ${
                active ? "bg-gray-800" : "hover:bg-gray-800/50"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="text-xs text-gray-400 mt-6">v1.0</div>
    </aside>
  );
}
