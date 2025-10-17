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

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
      <div className="main">
        {/* 홈 슬라이드, Header보다 먼저 렌더링 */}
        

        {/* 로그인/회원가입 페이지가 아닐 때만 Header와 버튼 */}
        {!isAuthPage && <Header />}
        {!isAuthPage && <ChatbotButton />}

        {/* 공통 컴포넌트 */}
        {!isAuthPage && <Description />}
        {!isAuthPage && <TrafficEventTable />}
        {!isAuthPage && <Home />}

        {/* 로그인/회원가입 페이지 */}
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

// ✅ 반드시 default export
export default App;
