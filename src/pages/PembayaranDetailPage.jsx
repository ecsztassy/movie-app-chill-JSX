import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'

function Header({ onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const isMobile = useIsMobile()
  return (
    <header style={{ background: '#101010', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 15px' : '18px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '30px' }}>
        <Link to="/home"><img src={logo} alt="Logo Chill" style={{ width: isMobile ? '70px' : '100px' }} /></Link>
        {!isMobile && (
          <nav style={{ display: 'flex', gap: '22px' }}>
            <Link to="/series" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Series</Link>
            <Link to="/film" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Film</Link>
            <Link to="/daftar-saya" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Daftar Saya</Link>
          </nav>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <div onClick={() => setDropdownOpen(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <img src={profil} alt="profile" style={{ width: isMobile ? '28px' : '34px', height: isMobile ? '28px' : '34px', borderRadius: '50%', objectFit: 'cover' }} />
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

function Countdown() {
  const [time, setTime] = useState(14 * 60 + 58)
  useEffect(() => {
    const interval = setInterval(() => setTime(prev => prev > 0 ? prev - 1 : 0), 1000)
    return () => clearInterval(interval)
  }, [])
  const jam = String(Math.floor(time / 3600)).padStart(2, '0')
  const menit = String(Math.floor((time % 3600) / 60)).padStart(2, '0')
  const detik = String(time % 60).padStart(2, '0')
  return (
    <div style={{ background: '#1e1e2e', borderRadius: '10px', padding: '18px', textAlign: 'center', marginBottom: '30px' }}>
      <div style={{ color: '#aaa', fontSize: '13px', marginBottom: '12px' }}>Lakukan Pembayaran Sebelum</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        {[{ val: jam, label: 'Jam' }, { val: menit, label: 'Menit' }, { val: detik, label: 'Detik' }].map((t, i, arr) => (
          <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>{t.val}</div>
              <div style={{ fontSize: '11px', color: '#aaa' }}>{t.label}</div>
            </div>
            {i < arr.length - 1 && <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', paddingBottom: '14px' }}>:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const metodeData = {
  visa: { label: 'VISA', icon: '💳', desc: 'Kartu VISA', tata: ['Masukkan nomor kartu VISA kamu.', 'Isi tanggal kadaluarsa dan CVV.', 'Masukkan nama pemegang kartu.', 'Klik Bayar dan tunggu konfirmasi.', 'Cek email untuk bukti pembayaran.'] },
  mastercard: { label: 'Mastercard', icon: '💳', desc: 'Kartu Mastercard', tata: ['Masukkan nomor kartu Mastercard kamu.', 'Isi tanggal kadaluarsa dan CVV.', 'Masukkan nama pemegang kartu.', 'Klik Bayar dan tunggu konfirmasi.', 'Cek email untuk bukti pembayaran.'] },
  kartu: { label: 'Kartu Debit/Kredit', icon: '💳', desc: 'Kartu Debit/Kredit', tata: ['Masukkan nomor kartu debit atau kredit kamu.', 'Isi tanggal kadaluarsa dan CVV.', 'Masukkan nama pemegang kartu.', 'Klik Bayar dan tunggu konfirmasi.', 'Cek email untuk bukti pembayaran.'] },
  bca: { label: 'BCA Virtual Account', icon: '🏦', desc: 'BCA Virtual Account', tata: ['Buka aplikasi BCA Mobile Banking atau akses BCA Internet Banking.', 'Login ke akun Anda.', 'Pilih menu "Transfer" atau "Pembayaran".', 'Pilih opsi "Virtual Account" atau "Virtual Account Number".', 'Masukkan nomor virtual account dan jumlah pembayaran, lalu konfirmasikan pembayaran.'] },
}

function PembayaranDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useIsMobile()
  const paket = location.state?.paket || { label: 'Individual', harga: 'Mulai dari Rp49.990/bulan\n1 Akun', nominal: 49990, fitur: ['Tidak ada Iklan', 'Kualitas 720p', 'Download konten pilihan'] }
  const metode = location.state?.metode || 'bca'
  const selectedMetode = metodeData[metode]
  const [copied, setCopied] = useState(false)
  const kodePembayaran = '3KDJ5XFOV'
  const biayaAdmin = 3000
  const total = paket.nominal + biayaAdmin

  const handleCopy = () => {
    navigator.clipboard.writeText(kodePembayaran)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => { localStorage.removeItem('isPremium'); localStorage.removeItem('premiumPlan'); navigate('/login') }} />

      <div style={{ padding: isMobile ? '20px 15px' : '40px', maxWidth: '800px' }}>
        <Countdown />
        <h2 style={{ fontSize: isMobile ? '18px' : '22px', marginBottom: '24px' }}>Ringkasan Pembayaran</h2>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: 'flex-start' }}>

          {/* Kartu Paket */}
          <div style={{ width: isMobile ? '100%' : '180px', background: '#3b5bdb', borderRadius: '12px', padding: '18px', flexShrink: 0, boxSizing: 'border-box' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>{paket.label}</div>
            <div style={{ fontSize: '11px', color: '#ddd', marginBottom: '14px', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{paket.harga}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '18px' }}>
              {(paket.fitur || []).map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '7px', fontSize: '11px', color: '#ddd' }}>
                  <span style={{ color: '#69db7c' }}>✓</span> {f}
                </div>
              ))}
            </div>
            <button style={{ width: '100%', padding: '8px', border: 'none', borderRadius: '6px', background: 'white', color: '#3b5bdb', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Langganan</button>
            <div style={{ fontSize: '9px', color: '#aaa', marginTop: '6px', textAlign: 'center' }}>Syarat dan Ketentuan Berlaku</div>
          </div>

          {/* Kanan */}
          <div style={{ flex: 1, width: '100%' }}>

            {/* Metode */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>Metode Pembayaran</div>
              <div style={{ background: '#2a2a2a', border: '1px solid #444', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #3b5bdb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b5bdb' }} />
                </div>
                <span style={{ fontSize: '13px' }}>{selectedMetode.icon} {selectedMetode.desc}</span>
              </div>
            </div>

            {/* Tanggal & Kode */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#aaa' }}>Tanggal Pembelian</span>
                <span>08 Juni 2023</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#aaa' }}>Kode Pembayaran</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: isMobile ? '12px' : '13px' }}>{kodePembayaran}</span>
                  <button onClick={handleCopy} style={{ background: 'transparent', border: 'none', color: copied ? '#69db7c' : '#3b5bdb', cursor: 'pointer', fontSize: '16px' }}>
                    {copied ? '✓' : '📋'}
                  </button>
                </div>
              </div>
            </div>

            {/* Ringkasan Transaksi */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>Ringkasan Transaksi</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#aaa' }}>Paket Premium {paket.label}</span>
                  <span>Rp{paket.nominal.toLocaleString('id-ID')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#aaa' }}>Biaya Admin</span>
                  <span>Rp3.000</span>
                </div>
                <div style={{ borderTop: '1px solid #444', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Total Pembayaran</span>
                  <span>Rp{total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Tata Cara */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>Tata Cara Pembayaran</div>
              <ol style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedMetode.tata.map((step, i) => (
                  <li key={i} style={{ color: '#ccc', fontSize: '12px', lineHeight: '1.5' }}>{step}</li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => { localStorage.setItem('isPremium', 'true'); localStorage.setItem('premiumPlan', JSON.stringify(paket)); navigate('/profile') }}
              style={{ width: isMobile ? '100%' : 'auto', background: '#3b5bdb', border: 'none', color: 'white', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>

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
        ) : (
          <div>
            <img src={logo} alt="Logo Chill" style={{ width: '85px', marginBottom: '8px' }} />
            <p style={{ color: '#888', fontSize: '11px', marginBottom: '16px' }}>©2026 Chill All Rights Reserved.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan'].map(item => (
                <a key={item} href="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '12px' }}>{item}</a>
              ))}
            </div>
          </div>
        )}
      </footer>
    </div>
  )
}

export default PembayaranDetailPage
