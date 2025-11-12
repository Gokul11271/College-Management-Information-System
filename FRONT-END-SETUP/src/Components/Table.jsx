import React from "react";

export default function Table({ headers, data }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-100">
                {Object.values(row).map((cell, j) => (
                  <td key={j} className="px-6 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
