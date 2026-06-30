import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'
import colony from '../assets/Colony.jpg'
import sekawanlimo from '../assets/sekawanlimo.jpg'
import harusnyahoror from '../assets/harusnyahoror.jpg'
import ipar from '../assets/ipar.jpeg'
import agaklaen from '../assets/agaklaen.jpeg'
import kairi from '../assets/kairi.jpeg'
import gjls from '../assets/gjls.jpg'
import sore from '../assets/sore.jpg'
import petaka from '../assets/petaka.jpg'
import robin  from '../assets/robin.jpg'
import spiderman from '../assets/spiderman.jpg'
import superman from '../assets/super.jpg'
import tanah from '../assets/tanah.jpg'
import usaha from '../assets/usaha.jpg'
import MovieModal from '../components/MovieModal'

import { fetchDaftar, addFilm } from '../store/redux/daftarSlice'

const seriesList = [
  { id: 1, img: colony, alt: 'Colony', badge: 'Episode Baru', top: null, year: '2021', duration: '1j 52m', rating: '18+', description: 'Sebuah koloni manusia berjuang untuk bertahan hidup di planet asing yang keras.', cast: 'Nora Arnezeder, Iain Glen', genre: 'Fiksi Ilmiah, Drama', director: 'Tim Fehlbaum' },
  { id: 2, img: sekawanlimo, alt: 'Sekawan Limo', badge: null, top: '10', year: '2024', duration: '2j 5m', rating: '13+', description: 'Lima sahabat nekat mendaki gunung angker demi konten viral.', cast: 'Endy Arfian, Bimasena', genre: 'Horor, Thriller', director: 'Bayu Skak' },
  { id: 3, img: harusnyahoror, alt: 'Harusnya Horor', badge: 'Episode Baru', top: null, year: '2023', duration: '1j 45m', rating: '13+', description: 'Sebuah film horor yang mengocok perut.', cast: 'Aci Resti, Dimas Anggara', genre: 'Komedi, Horor', director: 'Muhadkly Acho' },
  { id: 4, img: ipar, alt: 'Ipar Adalah Maut', badge: 'Episode Baru', top: null, year: '2024', duration: '1j 50m', rating: '17+', description: 'Drama pernikahan yang mengangkat isu perselingkuhan dalam keluarga.', cast: 'Adipati Dolken, Della Dartyan', genre: 'Drama, Romansa', director: 'Hanung Bramantyo' },
  { id: 5, img: agaklaen, alt: 'Agak Laen', badge: null, top: '10', year: '2024', duration: '1j 44m', rating: '13+', description: 'Empat penjaga rumah hantu berusaha membuat wahana mereka viral.', cast: 'Bene Dion, Muhadkly Acho', genre: 'Komedi', director: 'Muhadkly Acho' },
  { id: 6, img: kairi, alt: 'Nobody Loves Kay', badge: null, top: null, year: '2024', duration: '1j 52m', rating: '13+', description: 'Kay adalah gadis muda yang merasa tidak dicintai siapapun.', cast: 'Beby Tsabina, Refal Hady', genre: 'Drama, Romansa', director: 'Riri Riza' },
  { id: 7, img: gjls, alt: 'GJLS', badge: 'Episode Baru', top: null, year: '2024', duration: '1j 42m', rating: '13+', description: 'Kisah cinta penuh drama and tawa dari empat sahabat.', cast: 'Raditya Dika, Arawinda Kirana', genre: 'Komedi, Romansa', director: 'Raditya Dika' },
  { id: 8, img: sore, alt: 'Sore', badge: null, top: '10', year: '2024', duration: '2j 10m', rating: '13+', description: 'Sore adalah istri dari masa depan yang kembali ke masa lalu.', cast: 'Sheila Dara, Dion Wiyoko', genre: 'Romansa, Drama', director: 'Yandy Laurens' },
  { id: 9, img: petaka, alt: 'Petaka Gunung Gede', badge: null, top: null, year: '2024', duration: '1j 46m', rating: '17+', description: 'Pendakian berubah menjadi teror ketika sekelompok anak muda tersesat.', cast: 'Arbani Yasiz, Kiesha Alvaro', genre: 'Horror', director: 'Azhar Kinoi Lubis' },
  { id: 10, img: robin, alt: 'Robin Hood', badge: null, top: '10', year: '2018', duration: '1j 56m', rating: '13+', description: 'Robin Hood memimpin pemberontakan melawan korupsi kerajaan.', cast: 'Taron Egerton, Jamie Foxx', genre: 'Action, Adventure', director: 'Otto Bathurst' },
  { id: 11, img: spiderman, alt: 'Spider-Man No Way Home', badge: null, top: '10', year: '2021', duration: '2j 28m', rating: '13+', description: 'Peter Parker menghadapi kekacauan multiverse.', cast: 'Tom Holland, Zendaya', genre: 'Action, Sci-Fi', director: 'Jon Watts' },
  { id: 12, img: superman, alt: 'Superman Legacy', badge: 'Episode Baru', top: null, year: '2025', duration: '2j 10m', rating: '13+', description: 'Clark Kent menyeimbangkan kehidupan sebagai jurnalis dan pelindung bumi.', cast: 'David Corenswet, Rachel Brosnahan', genre: 'Action, Superhero', director: 'James Gunn' },
  { id: 13, img: tanah, alt: 'Tanah Air Beta', badge: null, top: null, year: '2024', duration: '1j 43m', rating: '13+', description: 'Drama keluarga tentang perjuangan bertahan hidup di tengah konflik sosial.', cast: 'Reza Rahadian, Laura Basuki', genre: 'Drama', director: 'Hanung Bramantyo' },
  { id: 14, img: usaha, alt: 'Usaha Belum Selesai', badge: null, top: null, year: '2024', duration: '1j 38m', rating: '13+', description: 'Seorang pemuda membangun bisnis dari nol sambil menghadapi tekanan keluarga.', cast: 'Iqbaal Ramadhan, Shenina Cinnamon', genre: 'Drama', director: 'Yandy Laurens' },
]

const getRandomRecommendations = (currentAlt, count = 3) => {
  const filtered = seriesList.filter(m => m.alt !== currentAlt)
  const shuffled = [...filtered].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count).map((m, i) => ({ img: m.img, title: m.alt, top: i % 2 === 0 ? '10' : null }))
}

function MovieCard({ movie, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const daftarSaatIni = useSelector((state) => state.daftar.data)

  const handlePlay = (e) => {
    e.stopPropagation()
    navigate('/watch', { state: { movie: { title: movie.alt, img: movie.img } } })
  }

  const handleAddToList = async (e) => {
    e.stopPropagation()
    const sudahAda = daftarSaatIni.find(item => item.alt === movie.alt)
    if (sudahAda) {
      alert(`⚠️ Film "${movie.alt}" sudah ada di Daftar Saya!`)
      return
    }
    const filmData = { alt: movie.alt, img: movie.img, badge: movie.badge || "", top: movie.top || "" }
    dispatch(addFilm(filmData))
    alert(`✅ "${movie.alt}" berhasil ditambahkan ke Daftar Saya!`)
  }

  const handleDetail = (e) => {
    e.stopPropagation()
    onSelect({ img: movie.img, title: movie.alt, year: movie.year, duration: movie.duration, rating: movie.rating, description: movie.description, cast: movie.cast, genre: movie.genre, director: movie.director, recommendations: getRandomRecommendations(movie.alt) })
  }

  return (
    <div
      onClick={() => onSelect({ img: movie.img, title: movie.alt, year: movie.year, duration: movie.duration, rating: movie.rating, description: movie.description, cast: movie.cast, genre: movie.genre, director: movie.director, recommendations: getRandomRecommendations(movie.alt) })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: '8px', cursor: 'pointer', position: 'relative', aspectRatio: '2/3', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: '0.3s ease', zIndex: hovered ? 10 : 1 }}
    >
      <img src={movie.img} alt={movie.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />
      {movie.badge && <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#E50914', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px' }}>{movie.badge}</div>}
      {movie.top && <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#E50914', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px', textAlign: 'center', lineHeight: '1.3' }}>Top<br />{movie.top}</div>}
      {hovered && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.9))', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10px' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
            <button onClick={handlePlay} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', fontSize: '12px' }}>▶</button>
            <button onClick={handleAddToList} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'transparent', border: '2px solid #aaa', color: 'white', cursor: 'pointer', fontSize: '13px' }}>✓</button>
            <button onClick={handleDetail} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'transparent', border: '2px solid #aaa', color: 'white', cursor: 'pointer', fontSize: '13px' }}>∨</button>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ background: '#555', color: 'white', fontSize: '9px', padding: '1px 5px', borderRadius: '3px' }}>{movie.rating}</span>
            <span style={{ color: '#ccc', fontSize: '10px' }}>{movie.genre}</span>
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
          <Link to="/series" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Series</Link>
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

function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [openMenu, setOpenMenu] = useState(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

function SeriesPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedMovie, setSelectedMovie] = useState(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    dispatch(fetchDaftar())
  }, [dispatch])

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => { localStorage.removeItem('isPremium'); localStorage.removeItem('premiumPlan'); navigate('/login') }} />
      <div style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>Series</h1>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => handleScroll('left')} style={{ position: 'absolute', left: '-20px', zIndex: 10, background: 'rgba(40,40,40,0.95)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>❮</button>

          <div ref={scrollContainerRef} style={{ display: 'flex', overflowX: 'auto', gap: '16px', paddingBottom: '15px', paddingRight: '40px', scrollbarWidth: 'none', msOverflowStyle: 'none', width: '100%', scrollBehavior: 'smooth' }}>
            {seriesList.map(f => (
              <div key={f.id} style={{ flexShrink: 0, width: '160px' }}>
                <MovieCard movie={f} onSelect={setSelectedMovie} />
              </div>
            ))}
          </div>

          <button onClick={() => handleScroll('right')} style={{ position: 'absolute', right: '-20px', zIndex: 10, background: 'rgba(40,40,40,0.95)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>❯</button>
        </div>
      </div>
      <Footer />
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  )
}

export default SeriesPage
