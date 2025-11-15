import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match!");
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch {
      alert("User already registered");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
          Create Account
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Register
        </button>
        <p className="text-sm text-center mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
