import React from "react";
import "./Header.css";

// 🚨 1. assets 폴더의 logo.svg 파일을 import 합니다.
import LogoSvg from './../assets/logo.svg'; 

function Header() {
  return (
    <header>
      <div className="logo">
        {/* 🚨 2. <h1> 태그를 <img> 태그로 대체합니다. */}
        <img src={LogoSvg} alt="자동차AI 로고" className="logo-img" />
      </div>

      <div className="login">
        <button>로그인</button>
      </div>
    </header>
  );
}

export default Header;