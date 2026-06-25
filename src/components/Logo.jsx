import logo from '../assets/logo.png'

function Logo({ width = 120 }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '25px' }}>
      <img src={logo} alt="Logo Chill" style={{ width }} />
    </div>
  )
}

export default Logo