import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../components/Logo'
import InputField from '../components/InputField'
import Button from '../components/Button'
import SSOButton from '../components/SSOButton'
import bgRegister from '../assets/bg-register.jpg'

function RegisterPage() {
  const [form, setForm] = useState({ nama: '', email: '', noHp: '', password: '', confirmPassword: '' })
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: `linear-gradient(rgba(0,0,0,.80), rgba(0,0,0,.80)), url(${bgRegister})`,
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

        <h2 style={{ color: 'white', marginBottom: '20px' }}>Create Account</h2>

        <form onSubmit={handleRegister}>
          <InputField type="text" placeholder="Nama Lengkap" value={form.nama} onChange={handleChange('nama')} required />
          <InputField type="email" placeholder="Email" value={form.email} onChange={handleChange('email')} required />
          <InputField type="tel" placeholder="No. HP" value={form.noHp} onChange={handleChange('noHp')} required />
          <InputField type="password" placeholder="Password" value={form.password} onChange={handleChange('password')} required />
          <InputField type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange('confirmPassword')} required />

          <Button label="Register" type="submit" />

          <div style={{ textAlign: 'center', margin: '20px 0', color: '#888', position: 'relative' }}>
            <span style={{ background: 'rgba(20,20,20,.95)', padding: '0 10px', position: 'relative', zIndex: 1 }}>OR</span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#555', zIndex: 0 }} />
          </div>

          <SSOButton label="Register with Google" onClick={() => navigate('/home')} />

          <div style={{ marginTop: '20px', textAlign: 'center', color: '#aaa' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage