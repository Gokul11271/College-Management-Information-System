// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Fill all fields");

    try {
      const res = await api.post("/auth/login", { email, password });
      // API may return user or user+token - we store whole thing
      const data = res.data;
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid credentials or server error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Sign in
        </h2>

        {error && (
          <div className="text-sm text-red-600 text-center mb-4">{error}</div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-300"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-300"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          New user?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
