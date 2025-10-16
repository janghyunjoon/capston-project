import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLink = [
    { name: '새소식', path: '/news' },
    { name: '고객센터', path: '/support' }
  ];

  const toggleMenu = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    document.body.style.overflow = nextIsOpen ? 'hidden' : 'auto';
  };

  const handleButtonClick = (action) => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
    if (action === 'Sign Up') {
      navigate('/signup'); // 회원가입 페이지로 이동
    } else if (action === 'Sign In') {
      navigate('/signin'); // 로그인 페이지로 이동
    }
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className={isOpen ? 'nav-open' : ''}>
      <button
        className="nav-toggle"
        onClick={toggleMenu}
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className="full-screen-menu">
        <ul className="nav-list">
          {navLink.map((nav, i) => (
            <li key={i} onClick={handleNavLinkClick}>
              <Link to={nav.path}>{nav.name}</Link>
            </li>
          ))}
        </ul>

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
