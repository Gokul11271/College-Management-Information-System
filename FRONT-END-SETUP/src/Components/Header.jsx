import React from "react";
import { useAuth } from "../auth/AuthProvider";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <h1 className="text-xl font-bold">College Management</h1>

      {user ? (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-medium">{user.email}</div>
            <div className="text-xs text-gray-500">{user.role}</div>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-sm text-gray-600">Not logged in</div>
      )}
    </header>
  );
}
