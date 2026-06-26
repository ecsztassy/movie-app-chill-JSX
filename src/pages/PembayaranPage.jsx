import { useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'

function Header({ onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const isMobile = useIsMobile()
  return (
    <header style={{ background: '#101010', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 15px' : '18px 40px' }}>
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
            <Link to="/profile" style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white', borderBottom: '1px solid #333' }}>👤 Profil Saya</Link>
            <Link to="/premium" style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white', borderBottom: '1px solid #333' }}>⭐ Ubah Premium</Link>
            <a href="#" onClick={onLogout} style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white' }}>⬅️ Logout</a>
          </div>
        )}
      </div>
    </header>
  )
}

function PembayaranPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useIsMobile()
  const [openMenu, setOpenMenu] = useState(null)
  const paket = location.state?.paket || { label: 'Individual', harga: 'Mulai dari Rp49.990/bulan\n1 Akun', nominal: 49990, fitur: ['Tidak ada Iklan', 'Kualitas 720p', 'Download konten pilihan'] }

  const [voucher, setVoucher] = useState('')
  const [metodePembayaran, setMetodePembayaran] = useState('bca')
  const biayaAdmin = 3000
  const total = paket.nominal + biayaAdmin

  const metodes = [
    { id: 'visa', label: 'VISA' },
    { id: 'mastercard', label: 'MC' },
    { id: 'kartu', label: 'Kartu Debit/Kredit' },
    { id: 'bca', label: 'BCA Virtual Account' },
  ]

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => {
        localStorage.removeItem('isPremium')
        localStorage.removeItem('premiumPlan')
        navigate('/login')
      }} />

      <div style={{ padding: isMobile ? '20px 15px' : '40px', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '30px' }}>Ringkasan Pembayaran</h2>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '30px', alignItems: 'flex-start' }}>
          <div style={{ width: isMobile ? '100%' : '180px', background: '#3b5bdb', borderRadius: '12px', padding: '18px', flexShrink: 0, boxSizing: 'border-box' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>{paket.label}</div>
            <div style={{ fontSize: '11px', color: '#ddd', marginBottom: '14px', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{paket.harga}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '18px' }}>
              {(paket.fitur || []).map((f, i) => <div key={i} style={{ display: 'flex', gap: '7px', fontSize: '11px', color: '#ddd' }}><span style={{ color: '#69db7c' }}>✓</span> {f}</div>)}
            </div>
            <button style={{ width: '100%', padding: '8px', border: 'none', borderRadius: '6px', background: 'white', color: '#3b5bdb', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Langganan</button>
            <div style={{ fontSize: '9px', color: '#aaa', marginTop: '6px', textAlign: 'center' }}>Syarat dan Ketentuan Berlaku</div>
          </div>

          <div style={{ flex: 1, width: '100%' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', marginBottom: '10px', color: '#ccc' }}>Metode Pembayaran</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {metodes.map(m => (
                  <button key={m.id} onClick={() => setMetodePembayaran(m.id)} style={{ padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', background: metodePembayaran === m.id ? '#3b5bdb' : '#2a2a2a', border: metodePembayaran === m.id ? '2px solid #5c7cfa' : '2px solid #444', color: 'white', fontWeight: 'bold' }}>{m.label}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', marginBottom: '8px', color: '#ccc' }}>Kode Voucher (Jika ada)</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input value={voucher} onChange={e => setVoucher(e.target.value)} placeholder="Masukkan kode voucher" style={{ flex: 1, background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', padding: '10px 14px', color: 'white', fontSize: '13px', outline: 'none' }} />
                <button style={{ background: '#3b5bdb', border: 'none', color: 'white', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>Gunakan</button>
              </div>
            </div>

            <div style={{ background: '#2a2a2a', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '14px' }}>Ringkasan Transaksi</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#aaa' }}>Paket Premium {paket.label}</span><span>Rp{paket.nominal.toLocaleString('id-ID')}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#aaa' }}>Biaya Admin</span><span>Rp3.000</span></div>
                <div style={{ borderTop: '1px solid #444', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}><span>Total Pembayaran</span><span>Rp{total.toLocaleString('id-ID')}</span></div>
              </div>
              <button onClick={() => navigate('/pembayaran-detail', { state: { paket, metode: metodePembayaran } })} style={{ width: '100%', padding: '11px', background: '#3b5bdb', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Bayar</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- RESPONSIVE FOOTER --- */}
      <footer style={{ background: '#111', padding: isMobile ? '20px 15px' : '40px', marginTop: '50px' }}>
        {!isMobile ? (
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
              {['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan'].map(item => <a key={item} href="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>{item}</a>)}
            </div>
          </div>
        ) : (
          <div>
            <img src={logo} alt="Logo Chill" style={{ width: '85px', marginBottom: '8px' }} />
            <p style={{ color: '#888', fontSize: '11px', marginBottom: '25px' }}>©2026 Chill All Rights Reserved.</p>
            <div style={{ borderBottom: '1px solid #333' }}>
              <div onClick={() => setOpenMenu(prev => prev === 'genre' ? null : 'genre')} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', cursor: 'pointer' }}>
                Genre <span style={{ color: '#888' }}>{openMenu === 'genre' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'genre' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '10px', paddingLeft: '10px' }}>
                  {['Aksi', 'Anak-anak', 'Anime', 'Britania', 'Drama', 'Fantasi Ilmiah', 'Kejahatan', 'KDrama', 'Komedi', 'Petualangan', 'Perang', 'Romantis', 'Sains & Alam', 'Thriller'].map(g => <a key={g} href="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>{g}</a>)}
                </div>
              )}
            </div>
            <div style={{ borderBottom: '1px solid #333' }}>
              <div onClick={() => setOpenMenu(prev => prev === 'bantuan' ? null : 'bantuan')} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', cursor: 'pointer' }}>
                Bantuan <span style={{ color: '#888' }}>{openMenu === 'bantuan' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'bantuan' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '10px', paddingLeft: '10px' }}>
                  {['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan'].map(item => <a key={item} href="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>{item}</a>)}
                </div>
              )}
            </div>
          </div>
        )}
      </footer>
    </div>
  )
}

export default PembayaranPage
