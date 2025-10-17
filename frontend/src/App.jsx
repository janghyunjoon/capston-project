// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TopBanner from "./components/TopBanner"; // 👈 TopBanner import
import './App.css';

function App() {
  return (
    <>
      {/* ✅ TopBanner를 가장 위에 렌더링 */}
      <TopBanner /> 

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;