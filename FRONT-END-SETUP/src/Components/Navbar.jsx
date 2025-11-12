import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        College Management System
      </h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Logout
      </button>
    </nav>
  );
}
