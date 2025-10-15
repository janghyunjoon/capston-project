import React from "react";
import "./Header.css";
import Nav from "./Nav";

import LogoSvg from './../assets/logo.png';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={LogoSvg} alt="자동차AI 로고" className="logo-img" />
      </div>
      <Nav />
    </header>
  );
}

export default Header;