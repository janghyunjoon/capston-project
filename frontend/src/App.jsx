import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ChatbotButton from "./components/ChatbotButton";
import Home from './pages/Home';
import Description from './components/Description'
import TrafficEventTable from "./components/TrafficEventTable";
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      
      <ChatbotButton/>
      <div className="main">
        <Description/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <TrafficEventTable /> 
      </div>
      
    </Router>
  );
}

export default App;
