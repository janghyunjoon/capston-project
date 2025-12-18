import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/pages/Auth.scss";
import Header from "../components/Header";

const BASE_URL = "/api/user";

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/signup`, formData);
      setMessage(res.data?.message || "회원가입이 완료 되었습니다.");

      setTimeout(() => navigate("/signin"), 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="auth-container">
        <h2>회원가입</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="비밀번호 (6자 이상)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <button type="submit" disabled={loading}>
            {loading ? "처리중..." : "회원가입"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-switch">
          이미 계정이 있나요?{" "}
          <span onClick={() => navigate("/signin")}>로그인</span>
        </p>
      </div>
    </>
  );
};

export default SignUp;
