import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import api from "../api/api";
import Loading from "../Components/Loading";

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI form mapped to backend Fee model fields
  const [form, setForm] = useState({
    studentName: "",
    totalFee: "",
    paidAmount: "",
    balance: "",
  });

  useEffect(() => {
    fetchFees();
  }, []);

  async function fetchFees() {
    setLoading(true);
    try {
      const res = await api.get("/fees");
      setFees(res.data || []);
    } catch {
      setFees([]);
    }
    setLoading(false);
  }

  async function createFee(e) {
    e.preventDefault();
    try {
      const payload = {
        studentName: form.studentName,
        totalFee: Number(form.totalFee),
        paidAmount: Number(form.paidAmount),
        balance: Number(form.totalFee) - Number(form.paidAmount),
      };

      await api.post("/fees", payload);

      setForm({
        studentName: "",
        totalFee: "",
        paidAmount: "",
        balance: "",
      });

      fetchFees();
    } catch (e) {
      alert("Create fee failed");
    }
  }

  async function deleteFee(id) {
    if (!confirm("Delete fee record?")) return;
    try {
      await api.delete(`/fees/${id}`);
      fetchFees();
    } catch {
      alert("Delete failed");
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Fees</h2>
          </div>

          {/* Create Fee Form */}
          <form
            onSubmit={createFee}
            className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            <input
              required
              placeholder="Student Name"
              value={form.studentName}
              onChange={(e) =>
                setForm({ ...form, studentName: e.target.value })
              }
              className="p-2 border rounded"
            />

            <input
              required
              type="number"
              placeholder="Total Fee"
              value={form.totalFee}
              onChange={(e) => setForm({ ...form, totalFee: e.target.value })}
              className="p-2 border rounded"
            />

            <input
              required
              type="number"
              placeholder="Paid Amount"
              value={form.paidAmount}
              onChange={(e) => setForm({ ...form, paidAmount: e.target.value })}
              className="p-2 border rounded"
            />

            <button className="bg-green-600 text-white rounded px-4 py-2">
              Add
            </button>
          </form>

          {/* Fees List */}
          {loading ? (
            <Loading />
          ) : (
            <ul className="space-y-3">
              {fees.map((f) => (
                <li
                  key={f.id}
                  className="bg-white p-4 rounded shadow flex justify-between"
                >
                  <div>
                    <div className="font-semibold">{f.studentName}</div>
                    <div className="text-sm text-gray-500">
                      Balance: ₹{f.balance}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="font-semibold">
                      Paid: ₹{f.paidAmount} / ₹{f.totalFee}
                    </div>
                    <button
                      onClick={() => deleteFee(f.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
