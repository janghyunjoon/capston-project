import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Auth.css' // 스타일 따로 관리 (선택사항)

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const res = await axios.post(
        `${BASE_URL}/signup`, // 포트 제거
        formData,
        { withCredentials: true }
      )
      setMessage(res.data.message)
      setTimeout(() => navigate('/signin'), 1500)
    } catch (err) {
      setMessage(
        err.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
      )
    }
  }

  return (
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
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      <p className="auth-switch">
        이미 계정이 있나요?{' '}
        <span onClick={() => navigate('/signin')}>로그인하기</span>
      </p>
    </div>
  )
}

export default SignUp
