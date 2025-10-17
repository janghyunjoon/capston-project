import React, { useState } from 'react'
import './Nav.css'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    // 요청하신 대로 '새소식', '고객센터' 두 개만 남김
    const navLink = ['새소식', '고객센터'] 
    
    const toggleMenu = () => {
        const nextIsOpen = !isOpen;
        setIsOpen(nextIsOpen);
        
        // 스크롤 잠금/해제 로직 수정:
        // 메뉴가 열리면 (nextIsOpen = true) 스크롤 잠금
        // 메뉴가 닫히면 (nextIsOpen = false) 스크롤 잠금 해제
        document.body.style.overflow = nextIsOpen ? 'hidden' : 'auto';
    };

    const handleButtonClick = (action) => {
        // 실제 로그인/회원가입 로직 또는 페이지 이동 로직
        console.log(`${action} 버튼 클릭됨`);
        setIsOpen(false);
        document.body.style.overflow = 'auto'; // 메뉴 닫을 때 스크롤 잠금 해제
    }

    const handleNavLinkClick = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto'; // 링크 클릭 시 스크롤 잠금 해제
    }

    return (
        <nav className={isOpen ? 'nav-open' : ''}> 
            
            {/* 햄버거/닫기(X) 토글 버튼 */}
            <button className="nav-toggle" onClick={toggleMenu} aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            {/* 전체 화면으로 표시될 메뉴 컨테이너 */}
            <div className="full-screen-menu">
                <ul className="nav-list"> 
                    {navLink.map((nav, i) => (
                        <li key={i} onClick={handleNavLinkClick}>
                            <a href={`#${nav}`}>
                                {nav}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* 로그인/회원가입 버튼 영역 */}
                <div className="auth-buttons">
                    <button 
                        className="btn-signup" 
                        onClick={() => handleButtonClick('Sign Up')}
                    >
                        Sign Up
                    </button>
                    <button 
                        className="btn-signin" 
                        onClick={() => handleButtonClick('Sign In')}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Nav