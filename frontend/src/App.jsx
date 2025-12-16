import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "./App.css";

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
