import { useState, useRef } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'
import warkop from '../assets/warkop.jpg'
import colony from '../assets/Colony.jpg'
import sekawanlimo from '../assets/sekawanlimo.jpg'
import harusnyahoror from '../assets/harusnyahoror.jpg'
import toystory from '../assets/toystory.jpg'
import ibu from '../assets/ibu.jpg'


const daftarSaya = [
  { img: warkop, alt: 'warkop', badge: 'Episode Baru', top: '10' },
  { img: colony, alt: 'colony', badge: 'Episode Baru', top: null },
  { img: sekawanlimo, alt: 'sekawanlimo', badge: 'Episode Baru', top: null },
  { img: harusnyahoror, alt: 'harusnyahoror', badge: 'Episode Baru', top: null },
  { img: toystory, alt: 'toystory', badge: 'Episode Baru', top: '10' },
  { img: ibu, alt: 'ibu', badge: 'Episode Baru', top: null },
]

function Header({ onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const isMobile = useIsMobile() // ← tambah ini
  return (
    <header style={{ background: '#101010', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 15px' : '18px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Link to="/home"><img src={logo} alt="Logo Chill" style={{ width: '100px', cursor: 'pointer' }} /></Link>
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
            <Link to="/profile" style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white', borderBottom: '1px solid #333' }}>👤 Profil Saya</Link>
            <Link to="/premium" style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white', borderBottom: '1px solid #333' }}>⭐ Ubah Premium</Link>
            <a href="#" onClick={onLogout} style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white' }}>⬅️ Logout</a>
          </div>
        )}
      </div>
    </header>
  )
}

function MovieCard({ img, alt, badge, top }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minWidth: '150px', height: '210px', borderRadius: '8px', cursor: 'pointer', flexShrink: 0, position: 'relative', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: '0.3s ease', zIndex: hovered ? 10 : 1 }}
    >
      <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
      {badge && <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#E50914', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px' }}>{badge}</div>}
      {top && <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#E50914', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px', textAlign: 'center', lineHeight: '1.3' }}>Top<br />{top}</div>}
    </div>
  )
}

function ProfilePage() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const fileInputRef = useRef(null)

  const [avatarSrc, setAvatarSrc] = useState(profil)
  const [form, setForm] = useState({
    nama: localStorage.getItem('profileNama') || 'Williams',
    email: localStorage.getItem('profileEmail') || 'william1980@gmail.com',
    password: '',
  })
  const [editNama, setEditNama] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)
  const [fotoError, setFotoError] = useState('')

  const isPremium = localStorage.getItem('isPremium') === 'true'
  const premiumPlan = JSON.parse(localStorage.getItem('premiumPlan')) || { label: 'Individual', nominal: 49990 }

  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSimpan = () => {
    localStorage.setItem('profileNama', form.nama)
    localStorage.setItem('profileEmail', form.email)
    setSavedMsg(true)
    setEditNama(false)
    setEditPassword(false)
    setTimeout(() => setSavedMsg(false), 2500)
  }

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setFotoError('Ukuran file melebihi 2MB!')
      return
    }
    setFotoError('')
    const reader = new FileReader()
    reader.onload = (ev) => setAvatarSrc(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => {
        localStorage.removeItem('isPremium')
        localStorage.removeItem('premiumPlan')
        navigate('/login')
      }} />

      <div style={{ padding: isMobile ? '20px 15px' : '40px', maxWidth: '900px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '30px' }}>Profil Saya</h1>

        {/* Notif Simpan */}
        {savedMsg && (
          <div style={{ background: '#2d7ef7', color: 'white', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
            ✅ Perubahan berhasil disimpan!
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '30px', alignItems: 'flex-start', marginBottom: '30px' }}>

          {/* Kiri */}
          <div style={{ flex: 1 }}>

            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={avatarSrc}
                  alt="avatar"
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #444' }}
                />
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFotoChange}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  style={{ background: '#2d7ef7', border: 'none', color: 'white', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', marginBottom: '6px', display: 'block' }}
                >
                  Ubah Foto
                </button>
                <span style={{ color: '#aaa', fontSize: '12px' }}>📤 Maksimal 2MB</span>
                {fotoError && <div style={{ color: '#E50914', fontSize: '11px', marginTop: '4px' }}>{fotoError}</div>}
              </div>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {/* Nama */}
              <div style={{ background: '#2a2a2a', borderRadius: '8px', padding: '12px 16px', position: 'relative' }}>
                <div style={{ color: '#aaa', fontSize: '11px', marginBottom: '4px' }}>Nama Pengguna</div>
                {editNama ? (
                  <input
                    value={form.nama}
                    onChange={handleChange('nama')}
                    autoFocus
                    style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', outline: 'none', width: '90%' }}
                  />
                ) : (
                  <div style={{ color: 'white', fontSize: '14px' }}>{form.nama}</div>
                )}
                <button
                  onClick={() => setEditNama(p => !p)}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '14px' }}
                >
                  {editNama ? '✅' : '✏️'}
                </button>
              </div>

              {/* Email */}
              <div style={{ background: '#2a2a2a', borderRadius: '8px', padding: '12px 16px' }}>
                <div style={{ color: '#aaa', fontSize: '11px', marginBottom: '4px' }}>Email</div>
                <input
                  value={form.email}
                  onChange={handleChange('email')}
                  style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', outline: 'none', width: '100%' }}
                />
              </div>

              {/* Kata Sandi */}
              <div style={{ background: '#2a2a2a', borderRadius: '8px', padding: '12px 16px', position: 'relative' }}>
                <div style={{ color: '#aaa', fontSize: '11px', marginBottom: '4px' }}>Kata Sandi</div>
                {editPassword ? (
                  <input
                    type="password"
                    placeholder="Masukkan password baru"
                    value={form.password}
                    onChange={handleChange('password')}
                    autoFocus
                    style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', outline: 'none', width: '90%' }}
                  />
                ) : (
                  <div style={{ color: 'white', fontSize: '14px', letterSpacing: '2px' }}>••••••••••••••</div>
                )}
                <button
                  onClick={() => setEditPassword(p => !p)}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '14px' }}
                >
                  {editPassword ? '✅' : '✏️'}
                </button>
              </div>

              <button
                onClick={handleSimpan}
                style={{ background: '#2d7ef7', border: 'none', color: 'white', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', alignSelf: 'flex-start', marginTop: '4px' }}
              >
                Simpan
              </button>
            </div>
          </div>

          {/* Kanan - Banner */}
          {isPremium ? (
            <div style={{ background: 'linear-gradient(135deg, #3b5bdb, #5c7cfa)', borderRadius: '12px', padding: '20px', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '3px 12px', fontSize: '11px', fontWeight: 'bold', alignSelf: 'flex-start' }}>Aktif</span>
              <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Akun Premium {premiumPlan.label} ✨</div>
              <div style={{ color: '#ddd', fontSize: '12px', lineHeight: '1.5' }}>Paket aktif Rp{premiumPlan.nominal.toLocaleString('id-ID')}/bulan</div>
              <div style={{ color: '#aee3f5', fontSize: '11px' }}>Berlaku hingga 31 Desember 2026</div>
            </div>
          ) : (
            <div style={{ background: '#1e1e1e', borderRadius: '12px', padding: '20px', minWidth: '280px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '28px' }}>🎬</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '6px' }}>Saat ini anda belum berlangganan</div>
                <div style={{ color: '#aaa', fontSize: '11px', lineHeight: '1.5', marginBottom: '14px' }}>Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!</div>
                <button onClick={() => navigate('/premium')} style={{ background: '#2d7ef7', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
                  Mulai Berlangganan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Daftar Saya */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px' }}>Daftar Saya</h2>
            <Link to="/daftar-saya" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Lihat Semua</Link>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' }}>
            {daftarSaya.map(f => <MovieCard key={f.alt} {...f} />)}
          </div>
        </div>
      </div>

      <footer style={{ background: '#111', padding: '40px', marginTop: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '60px' }}>
          <div style={{ minWidth: '220px' }}>
            <img src={logo} alt="Logo Chill" style={{ width: '110px', marginBottom: '15px' }} />
            <p style={{ color: '#888', fontSize: '13px' }}>©2026 Chill All Rights Reserved.</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '14px' }}>Genre</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
              {[['Aksi', 'Anak-anak', 'Anime', 'Britania'], ['Drama', 'Fantasi Ilmiah', 'Kejahatan', 'KDrama'], ['Komedi', 'Petualangan', 'Perang', 'Romantis'], ['Sains & Alam', 'Thriller']].map((col, i) => (
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

export default ProfilePage
