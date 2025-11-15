// src/components/Loading.jsx
import React from "react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent mx-auto" />
        <p className="mt-3 text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
}
