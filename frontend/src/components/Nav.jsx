import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Nav.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['새소식', '고객센터'];

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <nav className="nav">
      {/* 아이콘 메뉴 버튼 */}
      <button className="nav-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* 전체화면 메뉴 리스트 */}
      <div className={`full-screen-menu ${isOpen ? 'nav-open' : ''}`}>
        <ul className="nav-list">
          {navLinks.map((link, index) => (
            <li key={index} onClick={closeMenu}>
              <a href={`#${link}`}>{link}</a>
            </li>
          ))}
        </ul>
        <div className="menu-divider"></div>
      </div>

      {/* 로그인/회원가입 버튼 별도 섹션 */}
      <div className={`full-screen-auth ${isOpen ? 'nav-open' : ''}`}>
        <button className="btn-signup" onClick={closeMenu}>
          Sign Up
        </button>
        <button className="btn-signin" onClick={closeMenu}>
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Nav;
