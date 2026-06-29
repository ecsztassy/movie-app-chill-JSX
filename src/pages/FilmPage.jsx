import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'
import warkop from '../assets/warkop.jpg'
import toystory from '../assets/toystory.jpg'
import furious from '../assets/furiosjpg.jpg'
import alas from '../assets/alas.jpg'
import cell from '../assets/cell.jpeg'
import irit from '../assets/irit.jpg'
import jumbo from '../assets/jumbo.jpg'
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
import MovieModal from '../components/MovieModal'
// IMPORT API DI SINI
import { addDaftar, getDaftar } from '../services/api'

const filmList = [
  { id: 1, img: warkop, alt: 'Warkop DKI Reborn', badge: null, top: '10', year: '2016', duration: '1j 38m', rating: '13+', description: 'Dono, Kasino, dan Indro kembali beraksi dalam petualangan kocak yang penuh tawa.', cast: 'Vino G. Bastian, Abimana Aryasatya', genre: 'Komedi, Aksi', director: 'Anggy Umbara' },
  { id: 2, img: toystory, alt: 'Toy Story 5', badge: 'Episode Baru', top: '10', year: '2024', duration: '1j 55m', rating: 'Semua Umur', description: 'Woody, Buzz, dan geng mainan kembali dalam petualangan baru yang mengharukan.', cast: 'Tom Hanks, Tim Allen', genre: 'Animasi, Keluarga', director: 'Josh Cooley' },
  { id: 3, img: furious, alt: 'The Furious', badge: null, top: '10', year: '2023', duration: '2j 21m', rating: '17+', description: 'Aksi balapan liar di jalanan kota yang mempertaruhkan nyawa.', cast: 'Vin Diesel, Michelle Rodriguez', genre: 'Aksi, Balapan', director: 'Justin Lin' },
  { id: 4, img: alas, alt: 'Alas Roban', badge: null, top: null, year: '2023', duration: '1j 38m', rating: '17+', description: 'Perjalanan melewati hutan angker Alas Roban berubah menjadi teror yang mencekam.', cast: 'Arbani Yasiz, Maudy Effrosina', genre: 'Horor, Misteri', director: 'Awi Suryadi' },
  { id: 5, img: cell, alt: 'Ghost in the Cell', badge: null, top: '10', year: '2023', duration: '1j 58m', rating: '17+', description: 'Seorang tahanan dengan kemampuan supernatural melindungi sesama narapidana.', cast: 'John Boyega, Michael Shannon', genre: 'Horor, Thriller', director: 'James Wan' },
  { id: 6, img: irit, alt: 'Keluarga Super Irit', badge: null, top: null, year: '2024', duration: '1j 35m', rating: 'Semua Umur', description: 'Keluarga paling irit se-Indonesia menghadapi tantangan ketika mendapat warisan besar.', cast: 'Sule, Andre Taulany', genre: 'Komedi, Keluarga', director: 'Fajar Nugros' },
  { id: 7, img: jumbo, alt: 'Jumbo', badge: 'Episode Baru', top: null, year: '2025', duration: '1j 48m', rating: 'Semua Umur', description: 'Don menemukan sahabat tak terduga dalam petualangan magis penuh warna.', cast: 'Angga Yunanda, Aurora Ribero', genre: 'Animasi, Petualangan', director: 'Ryan Adriandhy' },
  { id: 8, img: ibu, alt: 'Jangan Buang Ibu', badge: null, top: '10', year: '2024', duration: '1j 50m', rating: '13+', description: 'Kisah perjuangan seorang ibu yang ditinggalkan anak-anaknya di panti jompo.', cast: 'Nani Wijaya, Marcella Zalianty', genre: 'Drama, Keluarga', director: 'Rako Prijanto' },
  { id: 9, img: garuda, alt: 'Garuda di Dadaku', badge: null, top: null, year: '2024', duration: '1j 40m', rating: 'Semua Umur', description: 'Bayu berjuang meraih mimpinya bergabung dengan Timnas Indonesia.', cast: 'Emir Mahira, Aldo Tansani', genre: 'Drama, Olahraga', director: 'Ifa Isfansyah' },
  { id: 10, img: badut, alt: 'Badut Gendong', badge: null, top: null, year: '2024', duration: '1j 55m', rating: '17+', description: 'Di balik kostum badut ceria, tersimpan kisah kelam seorang pria dalam lingkaran kriminal.', cast: 'Ario Bayu, Putri Marino', genre: 'Thriller, Drama', director: 'Edwin' },
  { id: 11, img: minion, alt: 'Minions & Monsters', badge: null, top: null, year: '2024', duration: '1j 32m', rating: 'Semua Umur', description: 'Para Minion kembali dalam petualangan seru melawan monster-monster lucu.', cast: 'Steve Carell, Pierre Coffin', genre: 'Animasi, Komedi', director: 'Kyle Balda' },
  { id: 12, img: dukun, alt: 'Dukun Magang', badge: null, top: null, year: '2024', duration: '1j 45m', rating: '13+', description: 'Mahasiswa tidak sengaja menjadi murid dukun sakti.', cast: 'Jefan Nathanio, Hana Malasan', genre: 'Komedi, Horor', director: 'Bernardus Yoyok' },
  { id: 13, img: barista, alt: 'Love Barista', badge: null, top: null, year: '2024', duration: '1j 42m', rating: '13+', description: 'Seorang barista muda berjuang mengejar impian sambil menghadapi kisah cinta yang rumit.', cast: 'Adhisty Zara, Bryan Domani', genre: 'Drama, Romansa', director: 'Monty Tiwa' },
  { id: 14, img: batman, alt: 'The Batman', badge: null, top: '10', year: '2022', duration: '2j 56m', rating: '17+', description: 'Bruce Wayne menghadapi pembunuh berantai misterius bernama Riddler.', cast: 'Robert Patton, Zoe Kravitz', genre: 'Action, Crime', director: 'Matt Reeves' },
  { id: 15, img: clbk, alt: 'Cinta Lama Belum Kelar', badge: 'Episode Baru', top: null, year: '2024', duration: '1j 40m', rating: '13+', description: 'Sepasang mantan kekasih dipertemukan kembali menghadapi perasaan lama yang belum selesai.', cast: 'Jourdy Pranata, Prilly Latuconsina', genre: 'Romansa, Drama', director: 'Ernest Prakasa' },
  { id: 16, img: foufo, alt: 'FOUFO', badge: null, top: null, year: '2024', duration: '1j 35m', rating: 'Semua Umur', description: 'Petualangan lucu penuh warna dari karakter unik yang mencoba menyelamatkan dunianya.', cast: 'Voice Cast Animation', genre: 'Animasi, Komedi', director: 'Unknown' },
  { id: 17, img: marvel, alt: 'Avengers Endgame', badge: null, top: '10', year: '2019', duration: '3j 1m', rating: '13+', description: 'Para Avengers melakukan misi terakhir untuk membalikkan kehancuran akibat Thanos.', cast: 'Robert Downey Jr, Chris Evans', genre: 'Action, Sci-Fi', director: 'Russo Brothers' },
  { id: 18, img: moana, alt: 'Moana', badge: 'Episode Baru', top: null, year: '2016', duration: '1j 47m', rating: 'Semua Umur', description: 'Moana memulai perjalanan berbahaya melintasi samudra untuk menyelamatkan rakyatnya.', cast: 'Aulii Cravalho, Dwayne Johnson', genre: 'Animation, Adventure', director: 'Ron Clements' },
]

const getRandomRecommendations = (currentAlt, count = 3) => {
  const filtered = filmList.filter(m => m.alt !== currentAlt)
  const shuffled = [...filtered].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count).map((m, i) => ({ img: m.img, title: m.alt, top: i % 2 === 0 ? '10' : null }))
}

function MovieCard({ movie, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const handlePlay = (e) => {
    e.stopPropagation()
    navigate('/watch', { state: { movie: { title: movie.alt, img: movie.img } } })
  }

  // UBAH FUNGSI INI KE API SINKRONISASI
  const handleAddToList = async (e) => {
    e.stopPropagation()
    try {
      const daftarSaatIni = await getDaftar()
      const sudahAda = daftarSaatIni.find(item => item.alt === movie.alt)

      if (sudahAda) {
        alert(`⚠️ Film "${movie.alt}" sudah ada di Daftar Saya!`)
        return
      }

      const filmData = {
        alt: movie.alt,
        badge: movie.badge || "",
        top: movie.top || ""
      }

      await addDaftar(filmData)
      alert(`✅ "${movie.alt}" berhasil ditambahkan ke Daftar Saya!`)
    } catch (error) {
      console.error("Gagal menambahkan:", error)
      alert("❌ Gagal menambahkan film ke server.")
    }
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
          <Link to="/series" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Series</Link>
          <Link to="/film" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Film</Link>
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

function FilmPage() {
  const navigate = useNavigate()
  const [selectedMovie, setSelectedMovie] = useState(null)

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => { localStorage.removeItem('isPremium'); localStorage.removeItem('premiumPlan'); navigate('/login') }} />
      <div style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>Film</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
          {filmList.map(f => <MovieCard key={f.id} movie={f} onSelect={setSelectedMovie} />)}
        </div>
      </div>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  )
}

export default FilmPage
