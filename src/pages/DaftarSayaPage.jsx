import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'

// Import Feather Icons
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi'

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
import bgHero from '../assets/images.jpg'

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
  { id: 33, img: bgHero, alt: '365 DAYS', badge: null, top: null },
]

const initialDaftar = [
  { id: 1, img: warkop, alt: 'Warkop DKI Reborn', badge: null, top: '10' },
  { id: 2, img: colony, alt: 'Colony', badge: 'Episode Baru', top: null },
  { id: 3, img: sekawanlimo, alt: 'Sekawan Limo', badge: null, top: '10' },
  { id: 5, img: toystory, alt: 'Toy Story 5', badge: 'Episode Baru', top: '10' },
  { id: 6, img: furious, alt: 'The Furious', badge: null, top: '10' },
]

const saveDaftar = (daftar) => {
  const data = daftar.map(f => ({ id: f.id, alt: f.alt, badge: f.badge, top: f.top }))
  localStorage.setItem('daftarFilm', JSON.stringify(data))
}

const loadDaftar = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('daftarFilm'))
    if (!saved) return initialDaftar
    return saved.map(s => {
      const match = allFilm.find(f => f.id === s.id) || allFilm.find(f => f.alt === s.alt)
      return match ? { ...match } : null
    }).filter(Boolean)
  } catch {
    return initialDaftar
  }
}

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

  const [daftarFilm, setDaftarFilm] = useState(loadDaftar)
  const [showTambah, setShowTambah] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editAlt, setEditAlt] = useState('')
  const [notif, setNotif] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [modeEdit, setModeEdit] = useState(false)

  useEffect(() => {
    saveDaftar(daftarFilm)
  }, [daftarFilm])

  const tampilNotif = (pesan) => {
    setNotif(pesan)
    setTimeout(() => setNotif(''), 2500)
  }

  const handleTambah = (film) => {
    if (daftarFilm.find(f => f.alt === film.alt)) {
      tampilNotif('⚠️ Film sudah ada di daftar!')
      return
    }
    setDaftarFilm(prev => [...prev, { ...film }])
    tampilNotif(`✅ "${film.alt}" berhasil ditambahkan!`)
    setShowTambah(false)
  }

  const handleSimpanEdit = (id) => {
    if (!editAlt.trim()) {
      tampilNotif('⚠️ Judul film tidak boleh kosong!')
      return
    }
    
    const yakinEdit = window.confirm(`Apakah Anda yakin ingin mengubah judul film ini menjadi "${editAlt}"?`)
    if (!yakinEdit) return

    setDaftarFilm(prev => prev.map(f => f.id === id ? { ...f, alt: editAlt } : f))
    setEditId(null)
    tampilNotif('✅ Judul berhasil diperbarui!')
  }

  const handleHapusSelected = () => {
    const yakinHapus = window.confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} film terpilih dari daftar tontonan Anda?`)
    if (!yakinHapus) return

    setDaftarFilm(prev => prev.filter(f => !selectedIds.includes(f.id)))
    tampilNotif(`🗑️ ${selectedIds.length} film berhasil dihapus.`)
    setSelectedIds([])
    setModeEdit(false)
  }

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const btnStyle = (color) => ({
    background: color, border: 'none', color: 'white',
    padding: isMobile ? '8px 14px' : '10px 18px',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: isMobile ? '12px' : '13px', fontWeight: 'bold',
    display: 'flex', alignItems: 'center', gap: '8px',
    transition: '0.2s opacity',
  })

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => { localStorage.removeItem('isPremium'); localStorage.removeItem('premiumPlan'); navigate('/login') }} />

      <div style={{ padding: isMobile ? '20px 15px' : '40px' }}>
        {notif && (
          <div style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
            {notif}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px' }}>Daftar Saya</h1>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setShowTambah(true)} style={btnStyle('#E50914')}>
              <FiPlus size={16} /> 
            </button>
            <button onClick={() => { setModeEdit(p => !p); setSelectedIds([]) }} style={btnStyle(modeEdit ? '#555' : '#2d7ef7')}>
              <FiEdit2 size={14} /> {modeEdit ? 'Batal ' : ''}
            </button>
            {modeEdit && selectedIds.length > 0 && (
              <button onClick={handleHapusSelected} style={btnStyle('#E50914')}>
                <FiTrash2 size={14} /> Hapus ({selectedIds.length})
              </button>
            )}
          </div>
        </div>

        {modeEdit && (
          <div style={{ background: '#2a2a2a', borderRadius: '8px', padding: '10px 16px', marginBottom: '16px', fontSize: '12px', color: '#aaa' }}>
            Klik Film Untuk Pilih Lalu Hapus. Klik Judul Untuk Ubah Nama.
          </div>
        )}

        {daftarFilm.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#aaa', padding: '60px 0', fontSize: '16px' }}>
            Daftar kamu kosong. Tambahkan film dulu!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))', gap: isMobile ? '10px' : '16px' }}>
            {daftarFilm.map(film => (
              <div
                key={film.id}
                onClick={() => modeEdit && toggleSelect(film.id)}
                style={{
                  position: 'relative', borderRadius: '8px', overflow: 'hidden',
                  background: '#222', cursor: modeEdit ? 'pointer' : 'default',
                  border: selectedIds.includes(film.id) ? '2px solid #E50914' : '2px solid transparent',
                  transition: '0.2s',
                }}
              >
                {modeEdit && (
                  <div style={{
                    position: 'absolute', top: '8px', left: '8px', zIndex: 10,
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: selectedIds.includes(film.id) ? '#E50914' : 'rgba(0,0,0,0.6)',
                    border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white',
                  }}>
                    {selectedIds.includes(film.id) && <FiCheck size={12} />}
                  </div>
                )}

                <div style={{ aspectRatio: '2/3', position: 'relative' }}>
                  <img src={film.img} alt={film.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {film.badge && !modeEdit && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#E50914', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px' }}>
                      {film.badge}
                    </div>
                  )}
                  {film.top && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#E50914', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px', textAlign: 'center', lineHeight: '1.3' }}>
                      Top<br />{film.top}
                    </div>
                  )}
                </div>

                <div style={{ padding: '8px' }}>
                  {editId === film.id ? (
                    <div onClick={e => e.stopPropagation()}>
                      <input
                        value={editAlt}
                        onChange={e => setEditAlt(e.target.value)}
                        autoFocus
                        style={{ width: '100%', background: '#333', border: '1px solid #555', borderRadius: '4px', color: 'white', padding: '4px 8px', fontSize: '11px', outline: 'none', marginBottom: '6px', boxSizing: 'border-box' }}
                      />
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => handleSimpanEdit(film.id)} style={{ flex: 1, background: '#2d7ef7', border: 'none', color: 'white', borderRadius: '4px', padding: '4px', fontSize: '10px', cursor: 'pointer' }}>Simpan</button>
                        <button onClick={() => setEditId(null)} style={{ flex: 1, background: '#444', border: 'none', color: 'white', borderRadius: '4px', padding: '4px', fontSize: '10px', cursor: 'pointer' }}>Batal</button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={e => {
                        if (!modeEdit) return
                        e.stopPropagation()
                        setEditId(film.id)
                        setEditAlt(film.alt)
                      }}
                      style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 'bold', color: 'white', cursor: modeEdit ? 'text' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '4px' }}
                    >
                      <span style={{ flex: 1 }}>{film.alt}</span>
                      {modeEdit && <FiEdit2 size={10} style={{ color: '#aaa' }} />}
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
              <button onClick={() => setShowTambah(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <FiX size={20} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
              {allFilm.map(film => {
                const sudahAda = daftarFilm.find(f => f.alt === film.alt)
                return (
                  <div key={film.id} onClick={() => !sudahAda && handleTambah(film)} style={{ borderRadius: '8px', overflow: 'hidden', cursor: sudahAda ? 'not-allowed' : 'pointer', opacity: sudahAda ? 0.4 : 1, position: 'relative' }}>
                    <img src={film.img} alt={film.alt} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px', background: '#222', fontSize: '9px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      {sudahAda ? (
                        <>
                          <FiCheck size={10} style={{ color: '#2d7ef7' }} /> Sudah ada
                        </>
                      ) : film.alt}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DaftarSayaPage
