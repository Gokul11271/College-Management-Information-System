import React from "react";

export default function Button({ text, onClick, color = "blue" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-600 text-white px-4 py-2 rounded hover:bg-${color}-700 transition`}
    >
      {text}
    </button>
  );
}
