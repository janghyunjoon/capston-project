import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
<<<<<<< HEAD
import './Auth.css'
import Header from '../components/Header' // 이미 import 되어 있습니다.
=======
import '../style/pages/Auth.scss'
import Header from '../components/Header'
>>>>>>> hyunjoon2

const BASE_URL = '/api/user'

const SignIn = () => {
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
      const res = await axios.post(`${BASE_URL}/login`, formData, {
        withCredentials: true,
      })
      setMessage('로그인 성공!')
      localStorage.setItem('token', res.data.token)
      setTimeout(() => navigate('/'), 1000)
    } catch (err) {
      setMessage(err.response?.data?.message || '로그인 중 오류가 발생했습니다.')
    }
  }

  return (
    // ✅ React Fragment로 전체를 감싸줍니다.
    <>
      <Header /> {/* ✅ 여기에 Header 컴포넌트를 추가합니다. */}

      <div className="auth-container">
        <h2>로그인</h2>
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
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">로그인</button>
        </form>

        {message && <p className="auth-message">{message} </p>}

        <p className="auth-switch">
          계정이 없나요?{' '}
          <span onClick={() => navigate('/signup')}>회원가입</span>
        </p>
      </div>
    </>
  )
}

export default SignIn