import React from "react";
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="logo">
        <h1>자동차AI</h1>
      </div>

      <div className="login">
        <button>로그인</button>
      </div>
    </header>
  );
}

export default Header;
