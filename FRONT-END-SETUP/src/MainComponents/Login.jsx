import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      // Save in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      // If App.jsx passed setUser, update global user state
      if (setUser) setUser(res.data);

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 text-sm">{error}</p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          New user?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
