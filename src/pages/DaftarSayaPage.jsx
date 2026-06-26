import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'

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
import barista from '../assets/barista.jpg'
import batman from '../assets/batman.jpg'
import clbk from '../assets/clbk.jpg'
import foufo from '../assets/foufo.jpg'
import marvel from '../assets/marvel.jpg'
import moana from '../assets/moana.jpg'
import petaka from '../assets/petaka.jpg'
import robin from '../assets/robin.jpg'
import spiderman from '../assets/spiderman.jpg'
import superman from '../assets/super.jpg'
import tanah from '../assets/tanah.jpg'
import usaha from '../assets/usaha.jpg'

const allFilm = [
  { id: 1, img: warkop, alt: 'Warkop DKI Reborn', badge: null, top: '10' },
  { id: 2, img: colony, alt: 'Colony', badge: 'Episode Baru', top: null },
  { id: 3, img: sekawanlimo, alt: 'Sekawan Limo', badge: null, top: '10' },
  { id: 4, img: harusnyahoror, alt: 'Harusnya Horor', badge: 'Episode Baru', top: null },
  { id: 5, img: toystory, alt: 'Toy Story 5', badge: 'Episode Baru', top: '10' },
  { id: 6, img: furious, alt: 'The Furious', badge: null, top: '10' },
  { id: 7, img: ipar, alt: 'Ipar Adalah Maut', badge: null, top: null },
  { id: 8, img: agaklaen, alt: 'Agak Laen', badge: 'Episode Baru', top: null },
  { id: 9, img: alas, alt: 'Alas Roban', badge: null, top: null },
  { id: 10, img: kairi, alt: 'Nobody Loves Kay', badge: null, top: null },
  { id: 11, img: cell, alt: 'Ghost in the Cell', badge: null, top: '10' },
  { id: 12, img: gjls, alt: 'GJLS', badge: null, top: null },
  { id: 13, img: irit, alt: 'Keluarga Super Irit', badge: null, top: null },
  { id: 14, img: jumbo, alt: 'Jumbo', badge: 'Episode Baru', top: null },
  { id: 15, img: sore, alt: 'Sore', badge: null, top: null },
  { id: 16, img: ibu, alt: 'Jangan Buang Ibu', badge: null, top: '10' },
  { id: 17, img: garuda, alt: 'Garuda di Dadaku', badge: null, top: null },
  { id: 18, img: badut, alt: 'Badut Gendong', badge: null, top: null },
  { id: 19, img: minion, alt: 'Minions & Monsters', badge: null, top: null },
  { id: 20, img: dukun, alt: 'Dukun Magang', badge: null, top: null },
  { id: 21, img: barista, alt: 'Love Barista', badge: null, top: null },
{ id: 22, img: batman, alt: 'The Batman', badge: 'Episode Baru', top: '10' },
{ id: 23, img: clbk, alt: 'Cinta Lama Belum Kelar', badge: null, top: null },
{ id: 24, img: foufo, alt: 'FOUFO', badge: 'Episode Baru', top: null },
{ id: 25, img: marvel, alt: 'Avengers Endgame', badge: null, top: '10' },
{ id: 26, img: moana, alt: 'Moana', badge: null, top: null },
{ id: 27, img: petaka, alt: 'Petaka Gunung Gede', badge: null, top: '10' },
{ id: 28, img: robin, alt: 'Robin Hood', badge: null, top: null },
{ id: 29, img: spiderman, alt: 'Spider-Man No Way Home', badge: 'Episode Baru', top: '10' },
{ id: 30, img: superman, alt: 'Superman Legacy', badge: null, top: '10' },
{ id: 31, img: tanah, alt: 'Tanah Air Beta', badge: null, top: null },
{ id: 32, img: usaha, alt: 'Usaha Belum Selesai', badge: 'Episode Baru', top: null },
]

const initialDaftar = [
  { id: 1, img: warkop, alt: 'Warkop DKI Reborn', badge: null, top: '10', catatan: '' },
  { id: 2, img: colony, alt: 'Colony', badge: 'Episode Baru', top: null, catatan: '' },
  { id: 3, img: sekawanlimo, alt: 'Sekawan Limo', badge: null, top: '10', catatan: '' },
  { id: 5, img: toystory, alt: 'Toy Story 5', badge: 'Episode Baru', top: '10', catatan: '' },
  { id: 6, img: furious, alt: 'The Furious', badge: null, top: '10', catatan: '' },
]

function Header({ onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const isMobile = useIsMobile()
  return (
    <header style={{ background: '#101010', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 15px' : '18px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '30px' }}>
        <Link to="/home"><img src={logo} alt="Logo Chill" style={{ width: isMobile ? '70px' : '100px' }} /></Link>
        {!isMobile && (
          <nav style={{ display: 'flex', gap: '20px' }}>
            <Link to="/series" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Series</Link>
            <Link to="/film" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Film</Link>
            <Link to="/daftar-saya" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Daftar Saya</Link>
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

function DaftarSayaPage() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [daftarFilm, setDaftarFilm] = useState(initialDaftar)
  const [showTambah, setShowTambah] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editCatatan, setEditCatatan] = useState('')
  const [notif, setNotif] = useState('')
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(null)
  

  const tampilNotif = (pesan) => {
    setNotif(pesan)
    setTimeout(() => setNotif(''), 2500)
  }

  const handleTambah = (film) => {
    if (daftarFilm.find(f => f.id === film.id)) {
      tampilNotif('⚠️ Film sudah ada di daftar!')
      return
    }
    setDaftarFilm(prev => [...prev, { ...film, catatan: '' }])
    tampilNotif(`✅ "${film.alt}" berhasil ditambahkan!`)
    setShowTambah(false)
  }

  const handleSimpanCatatan = (id) => {
    setDaftarFilm(prev => prev.map(f => f.id === id ? { ...f, catatan: editCatatan } : f))
    setEditId(null)
    tampilNotif('✅ Catatan berhasil disimpan!')
  }

  const handleHapus = (id) => {
    const film = daftarFilm.find(f => f.id === id)
    setDaftarFilm(prev => prev.filter(f => f.id !== id))
    setKonfirmasiHapus(null)
    tampilNotif(`🗑️ "${film.alt}" dihapus dari daftar.`)
  }

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => { localStorage.removeItem('isPremium'); localStorage.removeItem('premiumPlan'); navigate('/login') }} />

      <div style={{ padding: isMobile ? '20px 15px' : '40px' }}>
        {notif && (
          <div style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
            {notif}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px' }}>Daftar Saya</h1>
          <button
            onClick={() => setShowTambah(true)}
            style={{ background: '#E50914', border: 'none', color: 'white', padding: isMobile ? '8px 12px' : '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: isMobile ? '12px' : '14px', fontWeight: 'bold' }}
          >
            + Tambah Film
          </button>
        </div>

        {daftarFilm.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#aaa', padding: '60px 0', fontSize: '16px' }}>
            Daftar kamu kosong. Tambahkan film dulu!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))', gap: isMobile ? '10px' : '16px' }}>
            {daftarFilm.map(film => (
              <div key={film.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#222' }}>
                <div style={{ aspectRatio: '2/3', position: 'relative' }}>
                  <img src={film.img} alt={film.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {film.badge && <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#E50914', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px' }}>{film.badge}</div>}
                  {film.top && <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#E50914', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px', textAlign: 'center', lineHeight: '1.3' }}>Top<br />{film.top}</div>}
                </div>
                <div style={{ padding: '8px' }}>
                  <div style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 'bold', marginBottom: '6px', color: 'white' }}>{film.alt}</div>
                  {editId === film.id ? (
                    <div>
                      <input value={editCatatan} onChange={e => setEditCatatan(e.target.value)} placeholder="Tulis catatan..." autoFocus style={{ width: '100%', background: '#333', border: '1px solid #555', borderRadius: '4px', color: 'white', padding: '4px 8px', fontSize: '11px', outline: 'none', marginBottom: '6px', boxSizing: 'border-box' }} />
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => handleSimpanCatatan(film.id)} style={{ flex: 1, background: '#2d7ef7', border: 'none', color: 'white', borderRadius: '4px', padding: '4px', fontSize: '10px', cursor: 'pointer' }}>Simpan</button>
                        <button onClick={() => setEditId(null)} style={{ flex: 1, background: '#444', border: 'none', color: 'white', borderRadius: '4px', padding: '4px', fontSize: '10px', cursor: 'pointer' }}>Batal</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {film.catatan && <div style={{ fontSize: '10px', color: '#aaa', marginBottom: '6px', fontStyle: 'italic' }}>"{film.catatan}"</div>}
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => { setEditId(film.id); setEditCatatan(film.catatan) }} style={{ flex: 1, background: '#333', border: 'none', color: '#aaa', borderRadius: '4px', padding: '5px', fontSize: '10px', cursor: 'pointer' }}>✏️ Edit</button>
                        <button onClick={() => setKonfirmasiHapus(film.id)} style={{ flex: 1, background: '#3a1a1a', border: 'none', color: '#E50914', borderRadius: '4px', padding: '5px', fontSize: '10px', cursor: 'pointer' }}>🗑️ Hapus</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Tambah */}
      {showTambah && (
        <div onClick={() => setShowTambah(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#1a1a1a', borderRadius: '12px', padding: isMobile ? '16px' : '24px', width: '100%', maxWidth: '700px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: isMobile ? '15px' : '18px' }}>Tambah Film ke Daftar</h2>
              <button onClick={() => setShowTambah(false)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
              {allFilm.map(film => {
                const sudahAda = daftarFilm.find(f => f.id === film.id)
                return (
                  <div key={film.id} onClick={() => !sudahAda && handleTambah(film)} style={{ borderRadius: '8px', overflow: 'hidden', cursor: sudahAda ? 'not-allowed' : 'pointer', opacity: sudahAda ? 0.4 : 1 }}>
                    <img src={film.img} alt={film.alt} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px', background: '#222', fontSize: '9px', textAlign: 'center' }}>{sudahAda ? '✓ Sudah ada' : film.alt}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {konfirmasiHapus && (
        <div onClick={() => setKonfirmasiHapus(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#1a1a1a', borderRadius: '12px', padding: '30px', textAlign: 'center', maxWidth: '320px', width: '90%' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🗑️</div>
            <h3 style={{ marginBottom: '8px' }}>Hapus Film?</h3>
            <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '20px' }}>"{daftarFilm.find(f => f.id === konfirmasiHapus)?.alt}" akan dihapus.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => setKonfirmasiHapus(null)} style={{ padding: '10px 24px', background: '#333', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Batal</button>
              <button onClick={() => handleHapus(konfirmasiHapus)} style={{ padding: '10px 24px', background: '#E50914', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DaftarSayaPage
