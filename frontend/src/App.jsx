import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ChatbotButton from "./components/ChatbotButton";
import Home from './pages/Home';
import Description from './components/Description'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      
      <ChatbotButton/>
      <div className="main">
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      </div>
      <Description/>
    </Router>
  );
}

export default App;
