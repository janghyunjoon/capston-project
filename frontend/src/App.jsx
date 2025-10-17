import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import ChatbotButton from "./components/ChatbotButton";
import Home from "./pages/Home";
import Description from "./components/Description";
import TrafficEventTable from "./components/TrafficEventTable";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import './App.css';

function App() {
  const location = useLocation();

  // 로그인/회원가입 페이지 여부 확인
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
      {/* 로그인/회원가입 페이지가 아닐 때만 Header와 ChatbotButton을 렌더링 */}
      {!isAuthPage && <Header />}
      {!isAuthPage && <ChatbotButton />}

      <div className="main">
        {/* 로그인/회원가입 페이지 아닐 때만 공통 컴포넌트 표시 */}
        {!isAuthPage && <Description />}

        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Home />} />

          {/* 로그인 페이지 */}
          <Route path="/signin" element={<SignIn />} />

          {/* 회원가입 페이지 */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        {/* 메인 전용 테이블 */}
        {!isAuthPage && <TrafficEventTable />}
      </div>
    </>
  );
}

export default App;
