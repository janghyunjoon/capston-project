import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "./Header.css";
import LogoSvg from './../assets/logo3.png';
=======
import "../style/components/Header.scss";
import LogoSvg from './../assets/logo.png';
>>>>>>> hyunjoon2

function Header() {
  const navigate = useNavigate();

  // 스크롤 여부 감지
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <div className="header-left">
        <a href="/" className="logo">
          <span className="logo-text">제목넣는칸</span>
          <img src={LogoSvg} alt="로고" className="logo-img" />
        </a>

        {/* 네비게이션 */}
        <nav className="nav-links">
          <a onClick={() => handleNavLinkClick("/community")} className="nav-link">커뮤니티</a>
          <a onClick={() => handleNavLinkClick("/support")} className="nav-link">고객지원</a>
        </nav>
      </div>

      {/* 오른쪽 버튼 영역 */}
      <div className="header-right">
        <button onClick={() => handleNavLinkClick("/signin")} className="login-btn">로그인</button>
        <button onClick={() => handleNavLinkClick("/signup")} className="signup-btn">회원가입</button>
      </div>
    </header>
  );
}

export default Header;

