import React from "react";

export default function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <h3 className="text-gray-500 text-sm uppercase">{title}</h3>
      <p className="text-3xl font-bold text-blue-700 mt-2">{value}</p>
    </div>
  );
}
