import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'
import { useState } from 'react'

function Header({ onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  return (
    <header style={{ background: '#101010', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Link to="/home"><img src={logo} alt="Logo Chill" style={{ width: '100px' }} /></Link>
        <nav style={{ display: 'flex', gap: '22px' }}>
          <Link to="/series" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Series</Link>
          <Link to="/film" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Film</Link>
          <Link to="/daftar-saya" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Daftar Saya</Link>
        </nav>
      </div>
      <div style={{ position: 'relative' }}>
        <div onClick={() => setDropdownOpen(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <img src={profil} alt="profile" style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ color: '#aaa', fontSize: '12px' }}>▼</span>
        </div>
        {dropdownOpen && (
          <div style={{ position: 'absolute', top: '45px', right: 0, width: '180px', background: '#222', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,.4)', zIndex: 999 }}>
            <Link to="/profile" style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white', borderBottom: '1px solid #333' }}>👤Profil Saya</Link>
            <Link to="/premium" style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white', borderBottom: '1px solid #333' }}>⭐Ubah Premium</Link>
            <a href="#" onClick={onLogout} style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white' }}>⬅️Logout</a>
          </div>
        )}
      </div>
    </header>
  )
}

const pakets = [
  {
    id: 'individual',
    label: 'Individual',
    harga: 'Mulai dari Rp49.990/bulan\n1 Akun',
    nominal: 49990,
    fitur: ['Tidak ada Iklan', 'Kualitas 720p', 'Download konten pilihan'],
  },
  {
    id: 'berdua',
    label: 'Berdua',
    harga: 'Mulai dari Rp79.990/bulan\n2 Akun',
    nominal: 79990,
    fitur: ['Tidak ada Iklan', 'Kualitas 1080p', 'Download konten pilihan'],
  },
  {
    id: 'keluarga',
    label: 'Keluarga',
    harga: 'Mulai dari Rp159.990/bulan\n3-7 Akun',
    nominal: 159990,
    fitur: ['Tidak ada Iklan', 'Kualitas 4K', 'Download konten pilihan'],
  }
]

function PremiumPage() {
  const navigate = useNavigate()
  const [selectedPaket, setSelectedPaket] = useState('individual')

  const features = [
    { icon: '⬇️', label: 'Download Konten\nPilihan' },
    { icon: '🚫', label: 'Tidak Ada Iklan' },
    { icon: '🎬', label: 'Tonton Semua Konten' },
    { icon: '4K', label: 'Kualitas Maksimal\nSampal Dengan 4K', is4k: true },
    { icon: '💻', label: 'Tonton di Tv, Tablet,\nMobile, dan Laptop' },
    { icon: '💬', label: 'Subtitle Untuk Konten\nPilihan' },
  ]

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => {
  localStorage.removeItem('isPremium')
localStorage.removeItem('premiumPlan')
  navigate('/login')
}} />

      {/* Kenapa Harus Berlangganan */}
      <div style={{ padding: '50px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '40px' }}>Kenapa Harus Berlangganan?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', maxWidth: '600px', margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '50px', height: '50px', borderRadius: '10px',
                background: '#2a2a2a', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: f.is4k ? '14px' : '22px',
                fontWeight: f.is4k ? 'bold' : 'normal', color: f.is4k ? '#3b5bdb' : 'white',
              }}>
                {f.icon}
              </div>
              <div style={{ fontSize: '12px', color: '#ccc', textAlign: 'center', lineHeight: '1.5', whiteSpace: 'pre-line' }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pilih Paket */}
      <div style={{ background: '#1a1a2e', padding: '50px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '8px' }}>Pilih Paketmu</h2>
        <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '30px' }}>Temukan paket sesuai kebutuhanmu!</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {pakets.map(p => (
            <div
              key={p.id}
              onClick={() => setSelectedPaket(p.id)}
              style={{
                width: '200px', background: selectedPaket === p.id ? '#3b5bdb' : '#252540',
                borderRadius: '12px', padding: '20px',
                cursor: 'pointer', transition: '0.2s',
                border: selectedPaket === p.id ? '2px solid #5c7cfa' : '2px solid transparent',
              }}
            >
              <div style={{
                display: 'inline-block', background: selectedPaket === p.id ? 'rgba(255,255,255,0.2)' : '#3b5bdb',
                borderRadius: '20px', padding: '4px 14px', fontSize: '12px',
                fontWeight: 'bold', marginBottom: '12px',
              }}>
                {p.label}
              </div>
              <div style={{ fontSize: '11px', color: '#ddd', marginBottom: '16px', textAlign: 'left', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{p.harga}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', textAlign: 'left' }}>
                {p.fitur.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#ddd' }}>
                    <span style={{ color: '#69db7c' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/pembayaran', { state: { paket: p } })}
                style={{
                  width: '100%', padding: '9px', border: 'none', borderRadius: '6px',
                  background: selectedPaket === p.id ? 'white' : '#3b5bdb',
                  color: selectedPaket === p.id ? '#3b5bdb' : 'white',
                  cursor: 'pointer', fontWeight: 'bold', fontSize: '13px',
                }}
              >
                Langganan
              </button>
              <div style={{ fontSize: '10px', color: '#aaa', marginTop: '8px' }}>Syarat dan Ketentuan Berlaku</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#111', padding: '40px', marginTop: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '60px' }}>
          <div style={{ minWidth: '220px' }}>
            <img src={logo} alt="Logo Chill" style={{ width: '110px', marginBottom: '15px' }} />
            <p style={{ color: '#888', fontSize: '13px' }}>©2026 Chill All Rights Reserved.</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '14px' }}>Genre</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
              {[['Aksi', 'Anak-anak', 'Anime', 'Britania'], ['Drama', 'Fantasi Ilmiah & Fantasi', 'Kejahatan', 'KDrama'], ['Komedi', 'Petualangan', 'Perang', 'Romantis'], ['Sains & Alam', 'Thriller']].map((col, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.map(g => <a key={g} href="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>{g}</a>)}
                </div>
              ))}
            </div>
          </div>
          <div style={{ minWidth: '160px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Bantuan</div>
            {['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan'].map(item => (
              <a key={item} href="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PremiumPage