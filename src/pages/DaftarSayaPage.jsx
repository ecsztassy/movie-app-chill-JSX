import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'

// SINKRONISASI: Menggunakan Hooks & AsyncThunk dari slice kamu
import { useDispatch, useSelector } from 'react-redux'
import { fetchDaftar, addFilm, editFilm, hapusFilm } from '../store/redux/daftarSlice'

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

// Menambahkan properti "genre" pada data master film
const allFilm = [
  { id: 1, img: warkop, alt: 'Warkop DKI Reborn', badge: null, top: '10', genre: 'Komedi' },
  { id: 2, img: colony, alt: 'Colony', badge: 'Episode Baru', top: null, genre: 'Aksi' },
  { id: 3, img: sekawanlimo, alt: 'Sekawan Limo', badge: null, top: '10', genre: 'Komedi' },
  { id: 4, img: harusnyahoror, alt: 'Harusnya Horor', badge: 'Episode Baru', top: null, genre: 'Komedi' },
  { id: 5, img: toystory, alt: 'Toy Story 5', badge: 'Episode Baru', top: '10', genre: 'Anak-anak' },
  { id: 6, img: furious, alt: 'The Furious', badge: null, top: '10', genre: 'Aksi' },
  { id: 7, img: ipar, alt: 'Ipar Adalah Maut', badge: null, top: null, genre: 'Drama' },
  { id: 8, img: agaklaen, alt: 'Agak Laen', badge: 'Episode Baru', top: null, genre: 'Komedi' },
  { id: 9, img: alas, alt: 'Alas Roban', badge: null, top: null, genre: 'Thriller' },
  { id: 10, img: kairi, alt: 'Nobody Loves Kay', badge: null, top: null, genre: 'Drama' },
  { id: 11, img: cell, alt: 'Ghost in the Cell', badge: null, top: '10', genre: 'Aksi' },
  { id: 12, img: gjls, alt: 'GJLS', badge: null, top: null, genre: 'Komedi' },
  { id: 13, img: irit, alt: 'Keluarga Super Irit', badge: null, top: null, genre: 'Anak-anak' },
  { id: 14, img: jumbo, alt: 'Jumbo', badge: 'Episode Baru', top: null, genre: 'Anak-anak' },
  { id: 15, img: sore, alt: 'Sore', badge: null, top: null, genre: 'Drama' },
  { id: 16, img: ibu, alt: 'Jangan Buang Ibu', badge: null, top: '10', genre: 'Drama' },
  { id: 17, img: garuda, alt: 'Garuda di Dadaku', badge: null, top: null, genre: 'Anak-anak' },
  { id: 18, img: badut, alt: 'Badut Gendong', badge: null, top: null, genre: 'Thriller' },
  { id: 19, img: minion, alt: 'Minions & Monsters', badge: null, top: null, genre: 'Anak-anak' },
  { id: 20, img: dukun, alt: 'Dukun Magang', badge: null, top: null, genre: 'Komedi' },
  { id: 21, img: barista, alt: 'Love Barista', badge: null, top: null, genre: 'Romantis' },
  { id: 22, img: batman, alt: 'The Batman', badge: 'Episode Baru', top: '10', genre: 'Aksi' },
  { id: 23, img: clbk, alt: 'Cinta Lama Belum Kelar', badge: null, top: null, genre: 'Romantis' },
  { id: 24, img: foufo, alt: 'FOUFO', badge: 'Episode Baru', top: null, genre: 'Anime' },
  { id: 25, img: marvel, alt: 'Avengers Endgame', badge: null, top: '10', genre: 'Aksi' },
  { id: 26, img: moana, alt: 'Moana', badge: null, top: null, genre: 'Anak-anak' },
  { id: 27, img: petaka, alt: 'Petaka Gunung Gede', badge: null, top: '10', genre: 'Thriller' },
  { id: 28, img: robin, alt: 'Robin Hood', badge: null, top: null, genre: 'Aksi' },
  { id: 29, img: spiderman, alt: 'Spider-Man No Way Home', badge: 'Episode Baru', top: '10', genre: 'Aksi' },
  { id: 30, img: superman, alt: 'Superman Legacy', badge: null, top: '10', genre: 'Aksi' },
  { id: 31, img: tanah, alt: 'Tanah Air Beta', badge: null, top: null, genre: 'Drama' },
  { id: 32, img: usaha, alt: 'Usaha Belum Selesai', badge: 'Episode Baru', top: null, genre: 'Drama' },
  { id: 33, img: bgHero, alt: '365 DAYS', badge: null, top: null, genre: 'Romantis' },
]

function Header({ onLogout, tontonanGenre, setTontonanGenre }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [genreOpen, setGenreOpen] = useState(false)
  const isMobile = useIsMobile()

  const genres = ['Semua', 'Aksi', 'Anak-anak', 'Anime', 'Drama', 'Komedi', 'Romantis', 'Thriller']

  return (
    <header style={{ background: '#101010', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 15px' : '18px 40px', position: 'relative', zIndex: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '30px' }}>
        <Link to="/home"><img src={logo} alt="Logo Chill" style={{ width: isMobile ? '55px' : '100px' }} /></Link>
        <nav style={{ display: 'flex', gap: isMobile ? '10px' : '20px', alignItems: 'center' }}>
          <Link to="/series" style={{ color: '#ccc', textDecoration: 'none', fontSize: isMobile ? '11px' : '14px' }}>Series</Link>
          <Link to="/film" style={{ color: '#ccc', textDecoration: 'none', fontSize: isMobile ? '11px' : '14px' }}>Film</Link>
          <Link to="/daftar-saya" style={{ color: 'white', textDecoration: 'none', fontSize: isMobile ? '11px' : '14px', fontWeight: 'bold' }}>Daftar Saya</Link>
          
          {/* Tombol Dropdown Genre */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setGenreOpen(p => !p)} 
              style={{ background: '#222', color: 'white', border: '1px solid #444', padding: isMobile ? '4px 8px' : '6px 14px', borderRadius: '4px', fontSize: isMobile ? '11px' : '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {tontonanGenre === 'Semua' ? 'Genre' : tontonanGenre} <span style={{ fontSize: '10px' }}>▼</span>
            </button>

            {genreOpen && (
              <div style={{ position: 'absolute', top: isMobile ? '30px' : '38px', left: 0, width: '140px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', zIndex: 1200 }}>
                {genres.map(g => (
                  <div 
                    key={g} 
                    onClick={() => { setTontonanGenre(g); setGenreOpen(false); }} 
                    style={{ padding: '10px 14px', fontSize: '13px', color: tontonanGenre === g ? '#E50914' : '#aaa', cursor: 'pointer', background: 'transparent', transition: '0.2s' }}
                    onMouseEnter={e => { e.target.style.background = '#252525'; e.target.style.color = 'white'; }}
                    onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = tontonanGenre === g ? '#E50914' : '#aaa'; }}
                  >
                    {g}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
      <div style={{ position: 'relative' }}>
        <div onClick={() => setDropdownOpen(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <img src={profil} alt="profile" style={{ width: isMobile ? '24px' : '34px', height: isMobile ? '24px' : '34px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ color: '#aaa', fontSize: '10px' }}>▼</span>
        </div>
        {dropdownOpen && (
          <div style={{ position: 'absolute', top: isMobile ? '35px' : '45px', right: 0, width: '180px', background: '#222', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,.4)', zIndex: 999 }}>
            <Link to="/profile" style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white', borderBottom: '1px solid #333' }}>👤 Profil Saya</Link>
            <Link to="/premium" style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white', borderBottom: '1px solid #333' }}>⭐ Ubah Premium</Link>
            <a href="#" onClick={onLogout} style={{ display: 'block', padding: '14px', textDecoration: 'none', color: 'white' }}>⬅️ Logout</a>
          </div>
        )}
      </div>
    </header>
  )
}

function Footer() {
  const isMobile = useIsMobile()
  const [openMenu, setOpenMenu] = useState(null)
  const toggleMenu = (menu) => setOpenMenu(prev => prev === menu ? null : menu)

  const genres = ['Aksi', 'Anak-anak', 'Anime', 'Britania', 'Drama', 'Fantasi Ilmiah', 'Kejahatan', 'KDrama', 'Komedi', 'Petualangan', 'Perang', 'Romantis', 'Sains & Alam', 'Thriller']
  const bantuan = ['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan']

  return (
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
            {bantuan.map(item => <a key={item} href="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>{item}</a>)}
          </div>
        </div>
      ) : (
        <div>
          <img src={logo} alt="Logo Chill" style={{ width: '85px', marginBottom: '8px' }} />
          <p style={{ color: '#888', fontSize: '11px', marginBottom: '25px' }}>©2026 Chill All Rights Reserved.</p>
          <div style={{ borderBottom: '1px solid #333' }}>
            <div onClick={() => toggleMenu('genre')} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', cursor: 'pointer' }}>
              Genre <span style={{ color: '#888' }}>{openMenu === 'genre' ? '▲' : '▼'}</span>
            </div>
            {openMenu === 'genre' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '10px', paddingLeft: '10px' }}>
                {genres.map(g => <a key={g} href="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>{g}</a>)}
              </div>
            )}
          </div>
          <div style={{ borderBottom: '1px solid #333' }}>
            <div onClick={() => toggleMenu('bantuan')} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', cursor: 'pointer' }}>
              Bantuan <span style={{ color: '#888' }}>{openMenu === 'bantuan' ? '▲' : '▼'}</span>
            </div>
            {openMenu === 'bantuan' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '10px', paddingLeft: '10px' }}>
                {bantuan.map(item => <a key={item} href="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>{item}</a>)}
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  )
}

function DaftarSayaPage() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  
  const dispatch = useDispatch()
  const { data: serverData, loading } = useSelector((state) => state.daftar)

  const [showTambah, setShowTambah] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editAlt, setEditAlt] = useState('')
  const [notif, setNotif] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [modeEdit, setModeEdit] = useState(false)
const [selectedTambah, setSelectedTambah] = useState([])
  // State Utama Penyaringan Genre
  const [tontonanGenre, setTontonanGenre] = useState('Semua')

  useEffect(() => {
    dispatch(fetchDaftar())
  }, [dispatch])

const daftarFilm = serverData
  .map(item => {
    const match = allFilm.find(f => f.alt === item.alt)
    const id = String(item.id)
    return match
      ? { ...match, id }
      : { id, alt: item.alt, badge: item.badge, top: item.top, img: bgHero, genre: 'Drama' }
  })
  // dedupe berdasarkan judul (alt) — kalau ada dobel, ambil yang pertama saja
  .filter((film, index, arr) => arr.findIndex(f => f.alt === film.alt) === index)

  // LOGIKA FILTER: Menyaring data film berdasarkan genre yang sedang dipilih di Header
  const filmTersaring = daftarFilm.filter(film => {
    if (tontonanGenre === 'Semua') return true
    return film.genre === tontonanGenre
  })

  const tampilNotif = (pesan) => {
    setNotif(pesan)
    setTimeout(() => setNotif(''), 2500)
  }

 // ===== MULTI SELECT TAMBAH FILM =====

  const toggleTambahFilm = (film) => {
    setSelectedTambah(prev => {
      const exists = prev.find(item => item.id === film.id)

      if (exists) {
        return prev.filter(item => item.id !== film.id)
      }

      return [...prev, film]
    })
  }

const handleTambahSemua = async () => {
  if (selectedTambah.length === 0) {
    tampilNotif('⚠️ Pilih film dulu!')
    return
  }

  let berhasil = 0
  let gagal = 0
  let dilewati = 0

  for (const film of selectedTambah) {
    // cek dulu apakah sudah ada di daftarFilm sebelum kirim
    const sudahAda = daftarFilm.find(f => f.alt === film.alt)
    if (sudahAda) {
      dilewati++
      continue
    }

    const payload = {
      alt: film.alt,
      badge: film.badge,
      top: film.top
    }
    try {
      await dispatch(addFilm(payload)).unwrap()
      berhasil++
    } catch (error) {
      gagal++
    }
  }

  if (gagal === 0 && dilewati === 0) {
    tampilNotif(`✅ ${berhasil} film berhasil ditambahkan!`)
  } else {
    tampilNotif(`✅ ${berhasil} ditambah, ${dilewati} dilewati (sudah ada), ${gagal} gagal.`)
  }

  setSelectedTambah([])
  setShowTambah(false)
}

  const handleSimpanEdit = async (id) => {
    if (!editAlt.trim()) {
      tampilNotif('⚠️ Judul film tidak boleh kosong!')
      return
    }
    const yakinEdit = window.confirm(`Apakah Anda yakin ingin mengubah judul film ini menjadi "${editAlt}"?`)
    if (!yakinEdit) return
    try {
      const filmLama = daftarFilm.find(f => f.id === id)
      const payload = { alt: editAlt, badge: filmLama.badge, top: filmLama.top }
      await dispatch(editFilm({ id, data: payload })).unwrap()
      setEditId(null)
      tampilNotif('✅ Judul berhasil diperbarui!')
    } catch (error) {
      tampilNotif('❌ Gagal memperbarui judul!')
    }
  }

 // ===== HAPUS MULTIPLE =====

  const handleHapusSelected = async () => {
    const yakinHapus = window.confirm(
      `Apakah Anda yakin ingin menghapus ${selectedIds.length} film terpilih?`
    )

    if (!yakinHapus) return

    try {
      await Promise.all(
        selectedIds.map(id => dispatch(hapusFilm(id)).unwrap())
      )

      tampilNotif(`🗑️ ${selectedIds.length} film berhasil dihapus.`)

      setSelectedIds([])
      setModeEdit(false)

    } catch (error) {
      tampilNotif('❌ Gagal menghapus beberapa film!')
    }
  }

  const toggleSelect = (id) => {
  const idStr = String(id)
  setSelectedIds(prev =>
    prev.includes(idStr)
      ? prev.filter(i => i !== idStr)
      : [...prev, idStr]
  )
}

  const btnStyle = (color) => ({
    background: color,
    border: 'none',
    color: 'white',
    padding: isMobile ? '8px 14px' : '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: '0.2s opacity'
  })

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
      {/* Melempar state genre ke komponen Header */}
      <Header 
        onLogout={() => { localStorage.removeItem('isPremium'); localStorage.removeItem('premiumPlan'); navigate('/login') }} 
        tontonanGenre={tontonanGenre}
        setTontonanGenre={setTontonanGenre}
      />

      <div style={{ padding: isMobile ? '20px 15px' : '40px', flex: '1 0 auto' }}>
        {notif && (
          <div style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
            {notif}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px' }}>
            Daftar Saya {tontonanGenre !== 'Semua' && <span style={{ color: '#888', fontSize: '16px' }}>({tontonanGenre})</span>}
          </h1>
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

        {loading ? (
          <div style={{ textAlign: 'center', color: '#aaa', padding: '60px 0', fontSize: '16px' }}>
            Memuat daftar tontonan kamu...
          </div>
        ) : filmTersaring.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#aaa', padding: '60px 0', fontSize: '16px' }}>
            {tontonanGenre === 'Semua' ? 'Daftar kamu kosong. Tambahkan film dulu!' : `Tidak ada film dengan genre "${tontonanGenre}" di daftar kamu.`}
          </div>
        ) : (
          /* Menggunakan 'filmTersaring' menggantikan 'daftarFilm' lama */
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))', gap: isMobile ? '10px' : '16px' }}>
            {filmTersaring.map(film => (
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
                      style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 'bold', color: 'white', cursor: modeEdit ? 'text' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}
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

            <Footer />

      {/* Modal Tambah Multi Select */}
      {showTambah && (
        <div
          onClick={() => {
            setShowTambah(false)
            setSelectedTambah([])
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: isMobile ? '16px' : '24px',
              width: '100%',
              maxWidth: '700px',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >
              <h2 style={{ fontSize: isMobile ? '15px' : '18px' }}>
                Tambah Film ke Daftar
              </h2>

              <button
                onClick={() => {
                  setShowTambah(false)
                  setSelectedTambah([])
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* GRID FILM */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? 'repeat(3, 1fr)'
                  : 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '10px'
              }}
            >
              {allFilm.map(film => {
                const sudahAda = daftarFilm.find(
                  f => f.alt === film.alt
                )

                const selected = selectedTambah.find(
                  item => item.id === film.id
                )

                return (
                  <div
                    key={film.id}
                    onClick={() =>
                      !sudahAda && toggleTambahFilm(film)
                    }
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: sudahAda
                        ? 'not-allowed'
                        : 'pointer',
                      opacity: sudahAda ? 0.4 : 1,
                      position: 'relative',
                      border: selected
                        ? '3px solid #E50914'
                        : '2px solid transparent',
                      transition: '0.2s'
                    }}
                  >
                    {/* CHECKLIST */}
                    {selected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          zIndex: 20,
                          background: '#E50914',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FiCheck size={12} />
                      </div>
                    )}

                    <img
                      src={film.img}
                      alt={film.alt}
                      style={{
                        width: '100%',
                        aspectRatio: '2/3',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    <div
                      style={{
                        padding: '6px',
                        background: '#222',
                        fontSize: '9px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      {sudahAda ? (
                        <>
                          <FiCheck
                            size={10}
                            style={{ color: '#2d7ef7' }}
                          />
                          Sudah ada
                        </>
                      ) : (
                        film.alt
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* TOMBOL TAMBAH SEMUA */}
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={handleTambahSemua}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#E50914',
                  border: 'none',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Tambah {selectedTambah.length} Film
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DaftarSayaPage
