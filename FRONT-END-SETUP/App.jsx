import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./src/Components/Navbar";
import Sidebar from "./src/Components/Sidebar";
import Dashboard from "./src/pages/Dashboard";
import Students from "./src/pages/Students";
import Faculty from "./src/pages/Faculty";
import Courses from "./src/pages/Courses";
import Departments from "./src/pages/Departments";
import Fees from "./src/pages/Fees";
import Login from "./src/pages/Login";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
