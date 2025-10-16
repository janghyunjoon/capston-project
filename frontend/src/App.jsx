import React from "react";
// BrowserRouter 대신 Router를 import하고 있으며, 이는 BrowserRouter와 동일하게 작동합니다.
// ⚠️ 주의: App 컴포넌트 내부에서 Router를 사용하지 않으므로 import에서 제거합니다.
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ChatbotButton from "./components/ChatbotButton";
import Home from "./pages/Home";
import Description from "./components/Description";
import TrafficEventTable from "./components/TrafficEventTable";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import './App.css';

function App() {
  return (
    <>
    < Header /> 
      <ChatbotButton />
      
      <div className="main">
        {/* Description과 TrafficEventTable도 Routes 밖에 있어 모든 페이지에 표시됩니다. */}
        <Description />

        <Routes>
          {/* 1. 메인 페이지 */}
          <Route path="/" element={<Home />} />
          
          {/* 2. 로그인 페이지 추가 */}
          <Route path="/signin" element={<SignIn />} />
          
          {/* 3. 회원가입 페이지 추가 */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        <TrafficEventTable />
      </div>
    </>
  );
}

export default App;
