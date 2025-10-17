import React, { useState, useEffect } from "react";
import "./Header.css";
import LogoSvg from './../assets/logo.png';

function Header() {
  // 스크롤 여부를 감지하는 state (true: 스크롤됨, false: 맨 위)
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    // window.scrollY가 0보다 크면 true, 아니면 false
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // 스크롤 이벤트 리스너 등록 및 해제
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // []를 비워두어 처음 렌더링될 때 한 번만 실행되도록 함

  return (
    // isScrolled 상태에 따라 'scrolled' 클래스를 동적으로 추가/제거
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="header-left">
        <a href="/" className="logo"> 
          <span className="logo-text">제목넣는칸</span>
          <img src={LogoSvg} alt="로고" className="logo-img" />
        </a>
        
        <nav className="nav-links">
          <a href="/community" className="nav-link">커뮤니티</a>
          <a href="/support" className="nav-link">고객지원</a>
        </nav>
      </div>

      {/* 오른쪽 버튼 영역 */}
      <div className="header-right">
        <button className="login-btn">로그인</button>
        <button className="signup-btn">회원가입</button>
      </div>
    </header>
  );
}

export default Header;