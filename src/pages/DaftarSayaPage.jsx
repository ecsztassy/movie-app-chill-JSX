import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'

// import semua gambar yang sudah ada
import warkop from '../assets/warkop.jpg'
import colony from '../assets/Colony.jpg'
import sekawanlimo from '../assets/sekawanlimo.jpg'
import harusnyahoror from '../assets/harusnyahoror.jpg'
import toystory from '../assets/toystory.jpg'
import furious from '../assets/furiosjpg.jpg'
import ipar from '../assets/ipar.jpeg'
import agaklaen from '../assets/agaklaen.jpeg'
import alas from '../assets/alas.jpg'
import kairi from '../assets/kairi.jpeg'
import cell from '../assets/cell.jpeg'
import gjls from '../assets/gjls.jpg'
import irit from '../assets/irit.jpg'
import jumbo from '../assets/jumbo.jpg'
import sore from '../assets/sore.jpg'
import ibu from '../assets/ibu.jpg'
import garuda from '../assets/garuda.jpg'
import badut from '../assets/badut.jpg'
import minion from '../assets/minion.jpg'
import dukun from '../assets/dukun.jpg'

const daftarFilm = [
  { img: warkop, alt: 'warkop', badge: null, top: '10' },
  { img: colony, alt: 'colony', badge: 'Episode Baru', top: null },
  { img: sekawanlimo, alt: 'sekawanlimo', badge: null, top: '10' },
  { img: harusnyahoror, alt: 'harusnyahoror', badge: 'Episode Baru', top: null },
  { img: toystory, alt: 'toystory', badge: 'Episode Baru', top: '10' },
  { img: furious, alt: 'furious', badge: null, top: '10' },
  { img: ipar, alt: 'ipar', badge: null, top: null },
  { img: agaklaen, alt: 'agaklaen', badge: 'Episode Baru', top: null },
  { img: alas, alt: 'alas', badge: null, top: null },
  { img: kairi, alt: 'kairi', badge: null, top: null },
  { img: cell, alt: 'cell', badge: null, top: '10' },
  { img: gjls, alt: 'gjls', badge: null, top: null },
  { img: irit, alt: 'irit', badge: null, top: null },
  { img: jumbo, alt: 'jumbo', badge: 'Episode Baru', top: null },
  { img: sore, alt: 'sore', badge: null, top: null },
  { img: ibu, alt: 'ibu', badge: null, top: '10' },
  { img: garuda, alt: 'garuda', badge: null, top: null },
  { img: badut, alt: 'badut', badge: null, top: null },
  { img: minion, alt: 'minion', badge: null, top: null },
  { img: dukun, alt: 'dukun', badge: null, top: null },
]

function MovieCard({ img, alt, badge, top }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '8px',
        cursor: 'pointer',
        position: 'relative',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: '0.3s ease',
        zIndex: hovered ? 10 : 1,
        aspectRatio: '2/3',
      }}
    >
      <img
        src={img}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
          display: 'block',
        }}
      />

      {/* Badge Episode Baru */}
      {badge && (
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          background: '#E50914',
          color: 'white',
          fontSize: '9px',
          fontWeight: 'bold',
          padding: '2px 6px',
          borderRadius: '3px',
        }}>
          {badge}
        </div>
      )}

      {/* Badge Top 10 */}
      {top && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: '#E50914',
          color: 'white',
          fontSize: '9px',
          fontWeight: 'bold',
          padding: '2px 6px',
          borderRadius: '3px',
          textAlign: 'center',
          lineHeight: '1.3',
        }}>
          Top<br />{top}
        </div>
      )}

      {/* Hover overlay */}
      {hovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.9))',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '10px',
        }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
            <button style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'white', border: 'none', cursor: 'pointer',
              fontSize: '12px',
            }}>▶</button>
            <button style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'transparent', border: '2px solid #aaa',
              color: 'white', cursor: 'pointer', fontSize: '13px',
            }}>✓</button>
            <button style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'transparent', border: '2px solid #aaa',
              color: 'white', cursor: 'pointer', fontSize: '13px',
            }}>∨</button>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ background: '#555', color: 'white', fontSize: '9px', padding: '1px 5px', borderRadius: '3px' }}>13+</span>
            <span style={{ color: '#ccc', fontSize: '10px' }}>Misteri • Aksi</span>
          </div>
        </div>
      )}
    </div>
  )
}

function Header({ onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  return (
    <header style={{ background: '#101010', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Link to="/home"><img src={logo} alt="Logo Chill" style={{ width: '100px' }} /></Link>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/series" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Series</Link>
          <Link to="/film" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Film</Link>
          <Link to="/daftar-saya" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Daftar Saya</Link>
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

function DaftarSayaPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => {
  localStorage.removeItem('isPremium')
localStorage.removeItem('premiumPlan')
  navigate('/login')
}} />

      <div style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>Daftar Saya</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '12px',
        }}>
          {daftarFilm.map((film) => (
            <MovieCard key={film.alt} {...film} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DaftarSayaPage