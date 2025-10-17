import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 네비게이션 링크 목록 정의
  const navLink = [
    { name: '새소식', path: '/news' },
    { name: '고객센터', path: '/support' }
  ];

  // 햄버거 메뉴 열기/닫기 토글 함수
  const toggleMenu = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    // 메뉴가 열리면 뒷 배경 스크롤 방지
    document.body.style.overflow = nextIsOpen ? 'hidden' : 'auto';
  };

  // 인증(로그인/회원가입) 버튼 클릭 핸들러
  const handleButtonClick = (action) => {
    // 메뉴 닫고 스크롤 복원
    setIsOpen(false);
    document.body.style.overflow = 'auto';

    if (action === 'Sign Up') {
      navigate('/signup'); // 회원가입 페이지로 이동
    } else if (action === 'Sign In') {
      navigate('/signin'); // 로그인 페이지로 이동
    }
  };

  // 네비게이션 링크 클릭 핸들러
  const handleNavLinkClick = () => {
    // 메뉴 닫고 스크롤 복원
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    // 메뉴 상태에 따라 'nav-open' 클래스 적용
    <nav className={isOpen ? 'nav-open' : ''}>
      
      {/* 햄버거/닫기 토글 버튼 */}
      <button
        className="nav-toggle"
        onClick={toggleMenu}
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* 전체 화면 메뉴 (Full-Screen Menu) */}
      <div className="full-screen-menu">
        
        {/* 네비게이션 링크 리스트 */}
        <ul className="nav-list">
          {navLink.map((nav, i) => (
            <li key={i} onClick={handleNavLinkClick}>
              <Link to={nav.path}>{nav.name}</Link>
            </li>
          ))}
        </ul>

        {/* 로그인/회원가입 버튼 영역 */}
        <div className="auth-buttons">
          <button className="btn-signup" onClick={() => handleButtonClick('Sign Up')}>
            Sign Up
          </button>
          <button className="btn-signin" onClick={() => handleButtonClick('Sign In')}>
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;