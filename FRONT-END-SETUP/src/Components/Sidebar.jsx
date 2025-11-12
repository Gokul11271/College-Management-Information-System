import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-blue-700">
        CMS Menu
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link to="/" className="block hover:bg-blue-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/students" className="block hover:bg-blue-700 p-2 rounded">
          Students
        </Link>
        <Link to="/faculty" className="block hover:bg-blue-700 p-2 rounded">
          Faculty
        </Link>
        <Link to="/courses" className="block hover:bg-blue-700 p-2 rounded">
          Courses
        </Link>
        <Link to="/departments" className="block hover:bg-blue-700 p-2 rounded">
          Departments
        </Link>
        <Link to="/fees" className="block hover:bg-blue-700 p-2 rounded">
          Fees
        </Link>
      </nav>
    </div>
  );
}
