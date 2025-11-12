export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter password"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Sign In
          </button>
          <p className="text-sm text-center mt-2 text-gray-500">
            New user?{" "}
            <a href="/register" className="text-blue-600">
              Create Account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
