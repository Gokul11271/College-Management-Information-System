// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password || !form.confirm) {
      return setError("Please fill all fields");
    }
    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }

    try {
      await api.post("/auth/register", {
        email: form.email,
        password: form.password,
        role: form.role,
      });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Create account
        </h2>

        {error && (
          <div className="text-sm text-red-600 text-center mb-4">{error}</div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded-lg mb-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded-lg mb-3"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          className="w-full p-3 border rounded-lg mb-3"
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-3 border rounded-lg mb-4"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
          Register
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
