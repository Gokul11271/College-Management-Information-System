// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppWrapper from "./App";
import { AuthProvider } from "./src/auth/AuthProvider";
import "./App.css";

// If you included index.css with tailwind directives, import it here:


const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </React.StrictMode>
);
