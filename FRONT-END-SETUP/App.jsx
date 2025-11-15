// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login from "./src/pages/Login";
// import Register from "./src/pages/Register";
// import Fees from "./src/pages/Fees";
// import Course from "./src/pages/Courses";
// import Students from "./src/pages/Students";
// import Marks from "./src/pages/Marks";
// import Dashboard from "./src/MainComponents/Dashboard";

// export default function App() {
//   // 🌟 GLOBAL USER STATE (shared across pages)
//   const [user, setUser] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         {/* Login passes setUser to update global user */}
//         <Route path="/" element={<Login setUser={setUser} />} />
//         <Route path="/login" element={<Login setUser={setUser} />} />

//         <Route path="/register" element={<Register />} />

//         {/* Only show if user exists */}
//         <Route path="/dashboard" element={<Dashboard user={user} />} />

//         <Route path="/fees" element={<Fees user={user} />} />
//         <Route path="/courses" element={<Course user={user} />} />
//         <Route path="/students" element={<Students user={user} />} />
//         <Route path="/mark" element={<Marks user={user} />} />
//       </Routes>
//     </Router>
//   );
// }
// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Fees from "./src/pages/Fees";
import Course from "./src/pages/Courses";
import Students from "./src/pages/Students";
import Marks from "./src/pages/Marks";
import Dashboard from "./src/MainComponents/Dashboard";

export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard */}
        <Route path="/dashboard" element={<Dashboard user={user} />} />

        <Route path="/fees" element={<Fees user={user} />} />
        <Route path="/courses" element={<Course user={user} />} />
        <Route path="/students" element={<Students user={user} />} />
        <Route path="/mark" element={<Marks user={user} />} />
      </Routes>
    </Router>
  );
}
