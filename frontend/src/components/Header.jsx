import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/components/Header.scss";
import LogoSvg from "./../assets/alogo.png";

const ME_URL = "/api/user/me";
const LOGOUT_URL = "/api/user/logout";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // 스크롤 여부 감지
  const [isScrolled, setIsScrolled] = useState(false);

  // 로그인 유저 상태
  const [user, setUser] = useState(null);

  // 드롭다운 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleScroll = () => setIsScrolled(window.scrollY > 0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (path) => navigate(path);

  // ✅ 로그인 상태 확인 (/me)
  const fetchMe = async () => {
    try {
      const res = await axios.get(ME_URL, { withCredentials: true });
      setUser(res.data?.user || null);
    } catch (e) {
      setUser(null);
    }
  };

  // ✅ 페이지 이동 시마다 갱신(로그인 후 돌아오면 헤더가 바로 바뀌도록)
  useEffect(() => {
    fetchMe();
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // ✅ 바깥 클릭하면 드롭다운 닫기
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT_URL, {}, { withCredentials: true });
    } catch (e) {
      // 실패해도 UI는 로그아웃 처리
    } finally {
      setUser(null);
      setIsDropdownOpen(false);
      navigate("/");
    }
  };

  const username = user?.username;
  // user 모델에 profileImage 같은 필드가 없을 수도 있어서 안전하게 처리
  const profileImage = user?.profileImage || user?.avatarUrl || user?.profileUrl || "";

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <div className="header-left">
        <a href="/" className="logo">
          <img src={LogoSvg} alt="로고" className="logo-img" />
        </a>
        {/* 네비게이션 */}
      </div>

      <div className="header-right">
        {!username ? (
          <>
            <button onClick={() => handleNavLinkClick("/signin")} className="login-btn">
              로그인
            </button>
            <button onClick={() => handleNavLinkClick("/signup")} className="signup-btn">
              회원가입
            </button>
          </>
        ) : (
          <div className="header-user-wrap" ref={dropdownRef}>
            {/* ✅ 유저네임 버튼(클릭하면 드롭다운) */}
            <button
              type="button"
              className="user-menu-btn"
              onClick={() => setIsDropdownOpen((v) => !v)}
            >
              {username}님
              <span className={`user-menu-caret ${isDropdownOpen ? "open" : ""}`}></span>
            </button>

            {/* ✅ 드롭다운 */}
            {isDropdownOpen && (
              <div className="user-dropdown">
                <div className="user-dropdown-top">
                  {profileImage ? (
                    <img className="user-avatar" src={profileImage} alt="프로필" />
                  ) : (
                    <div className="user-avatar placeholder">
                      {String(username).slice(0, 1).toUpperCase()}
                    </div>
                  )}

                  <div className="user-info">
                    <div className="user-name">{username}님</div>
                  </div>
                </div>

                <div className="user-dropdown-divider" />

                <button type="button" className="user-logout-btn" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
