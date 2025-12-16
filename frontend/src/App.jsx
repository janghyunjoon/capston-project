import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "./App.css";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  return (
<<<<<<< HEAD
    <>
      <div className="main">
        {/* 홈 슬라이드, Header보다 먼저 렌더링 */}

        {/* 로그인/회원가입 페이지가 아닐 때만 Header와 버튼 */}
        {!isAuthPage && <Header />}
        {!isAuthPage && <ChatbotButton />}
      

        {/* 공통 컴포넌트 */}
        {!isAuthPage && <Description />}
        {!isAuthPage && <TrafficEventTable />}

        {/* 로그인/회원가입 페이지 */}
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
=======
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
>>>>>>> hyunjoon2
  );
}

export default App;
