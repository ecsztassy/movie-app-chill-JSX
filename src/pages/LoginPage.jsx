import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../components/Logo'
import InputField from '../components/InputField'
import Button from '../components/Button'
import SSOButton from '../components/SSOButton'
import bgLogin from '../assets/bg-login.jpg'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

 const handleLogin = (e) => {
  e.preventDefault()
  localStorage.removeItem('isPremium')
  navigate('/home')
}

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: `linear-gradient(rgba(0,0,0,.80), rgba(0,0,0,.80)), url(${bgLogin})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: isMobile ? '100%' : '420px',
        background: 'rgba(20,20,20,.95)',
        padding: isMobile ? '25px' : '40px',
        borderRadius: '12px',
      }}>
        <Logo width={isMobile ? 80 : 120} />

        <h2 style={{ color: 'white', marginBottom: '20px' }}>Login</h2>

        <form onSubmit={handleLogin}>
          <InputField type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
          <InputField type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

          <div style={{ marginBottom: '15px', fontSize: '14px' }}>
            <Link to="#" style={{ color: '#aaa', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>

          <Button label="Login" type="submit" />

          <div style={{ textAlign: 'center', margin: '20px 0', color: '#888', position: 'relative' }}>
            <span style={{ background: 'rgba(20,20,20,.95)', padding: '0 10px', position: 'relative', zIndex: 1 }}>OR</span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#555', zIndex: 0 }} />
          </div>

          <SSOButton label="Continue with Google" onClick={() => navigate('/home')} />

          <div style={{ marginTop: '20px', textAlign: 'center', color: '#aaa' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage