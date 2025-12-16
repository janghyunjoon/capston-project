import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";
import ChatbotButton from "./components/ChatbotButton";
import Description from "./components/Description";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Oxquiz from "./pages/OXquiz";

import "./App.css";

/* =========================
   공통 레이아웃 (여기에 Outlet)
========================= */
const MainLayout = () => {
  return (
    <div className="main">
      <Header />
      <ChatbotButton />
      <Description />

      {/* ✅ Route로 들어온 페이지만 여기로 렌더링 */}
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* ✅ 공통 레이아웃 그룹 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/oxquiz" element={<Oxquiz />} />

        {/* 예시: 새 페이지 추가는 이렇게만 하면 됨
            <Route path="/newpage" element={<NewPage />} />
        */}
      </Route>

      {/* ✅ 레이아웃 없는 페이지 */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
