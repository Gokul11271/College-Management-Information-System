import React, { useState, useEffect } from "react";
import axios from "axios";

const FeeManagement = () => {
  const [fees, setFees] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    totalFee: "",
    paidAmount: "",
    balance: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/fees");
      setFees(response.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/fees/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:8080/api/fees", form);
      }
      setForm({ studentName: "", totalFee: "", paidAmount: "", balance: "" });
      fetchFees();
    } catch (error) {
      console.error("Error saving fee:", error);
    }
  };

  const handleEdit = (fee) => {
    setEditingId(fee.id);
    setForm(fee);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/fees/${id}`);
      fetchFees();
    } catch (error) {
      console.error("Error deleting fee:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        💰 Fee Management System
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto"
      >
        <input
          type="text"
          name="studentName"
          value={form.studentName}
          onChange={handleChange}
          placeholder="Student Name"
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="number"
          name="totalFee"
          value={form.totalFee}
          onChange={handleChange}
          placeholder="Total Fee"
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="number"
          name="paidAmount"
          value={form.paidAmount}
          onChange={handleChange}
          placeholder="Paid Amount"
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="number"
          name="balance"
          value={form.balance}
          onChange={handleChange}
          placeholder="Balance"
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Fee" : "Add Fee"}
        </button>
      </form>

      <div className="mt-10 max-w-4xl mx-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Student</th>
              <th className="p-3">Total Fee</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Balance</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id} className="border-b hover:bg-gray-100">
                <td className="p-3 text-center">{fee.id}</td>
                <td className="p-3">{fee.studentName}</td>
                <td className="p-3 text-right">₹{fee.totalFee}</td>
                <td className="p-3 text-right">₹{fee.paidAmount}</td>
                <td className="p-3 text-right">₹{fee.balance}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleEdit(fee)}
                    className="bg-yellow-400 px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fee.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeManagement;
