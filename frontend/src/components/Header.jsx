import React from "react";
import "./Header.css";
import Nav from "./Nav";

import LogoSvg from './../assets/logo.png';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={LogoSvg} alt="자동차AI 로고" className="logo-img" />
        <p>과실비율 AI</p>
      </div>
      <Nav />
      <div className="login">
        <button>로그인</button>
      </div>
    </header>
  );
}

export default Header;