import { useEffect, useState } from "react";

export default function Fees() {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/fees")
      .then((res) => res.json())
      .then((data) => setFees(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Fees</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Student</th>
            <th className="border px-4 py-2">Amount Paid</th>
            <th className="border px-4 py-2">Amount Due</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((f) => (
            <tr key={f.id}>
              <td className="border px-4 py-2">{f.studentName}</td>
              <td className="border px-4 py-2">{f.amountPaid}</td>
              <td className="border px-4 py-2">{f.amountDue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
