import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import profil from '../assets/profil.jpg'
import bgHero from '../assets/images.jpg'
import MovieModal from '../components/MovieModal'

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

const sections = [
  {
    title: 'Melanjutkan Tonton Film',
    movies: [
      { img: warkop, alt: 'Warkop DKI Reborn', year: '2016', duration: '1j 38m', rating: '13+', description: 'Dono, Kasino, dan Indro kembali beraksi dalam petualangan kocak yang penuh tawa. Mereka terlibat dalam misi rahasia yang membawa mereka ke berbagai situasi konyol dan tidak terduga.', cast: 'Vino G. Bastian, Abimana Aryasatya, Rizky Hanggono', genre: 'Komedi, Aksi', director: 'Anggy Umbara', recommendations: [] },
      { img: colony, alt: 'Colony', year: '2021', duration: '1j 52m', rating: '18+', description: 'Sebuah koloni manusia berjuang untuk bertahan hidup di planet asing yang keras. Mereka harus menghadapi ancaman dari luar dan konflik internal yang mengancam keberlangsungan hidup mereka.', cast: 'Nora Arnezeder, Iain Glen, Rufus Sewell', genre: 'Fiksi Ilmiah, Drama', director: 'Tim Fehlbaum', recommendations: [] },
      { img: sekawanlimo, alt: 'Sekawan Limo', year: '2024', duration: '2j 5m', rating: '13+', description: 'Lima sahabat nekat mendaki gunung angker demi konten viral. Namun perjalanan itu berubah menjadi mimpi buruk ketika mereka menemukan sesuatu yang seharusnya tidak mereka temukan.', cast: 'Endy Arfian, Bimasena, Expedition Tri', genre: 'Horor, Thriller', director: 'Bayu Skak', recommendations: [] },
      { img: harusnyahoror, alt: 'Harusnya Horor', year: '2023', duration: '1j 45m', rating: '13+', description: 'Sebuah film horor yang mengocok perut. Ketika sekelompok teman mencoba membuat film horor, mereka justru terjebak dalam situasi yang lebih konyol dari yang mereka bayangkan.', cast: 'Aci Resti, Dimas Anggara, Babe Cabita', genre: 'Komedi, Horor', director: 'Muhadkly Acho', recommendations: [] },
      { img: toystory, alt: 'Toy Story 5', year: '2024', duration: '1j 55m', rating: 'Semua Umur', description: 'Woody, Buzz, dan seluruh geng mainan kembali dalam petualangan baru yang mengharukan. Kali ini mereka harus menghadapi tantangan terbesar dalam hidup mereka sebagai mainan.', cast: 'Tom Hanks, Tim Allen, Annie Potts', genre: 'Animasi, Keluarga, Petualangan', director: 'Josh Cooley', recommendations: [] },
    ],
  },
  {
    title: 'Top Rating Film dan Series Hari Ini',
    movies: [
      { img: furious, alt: 'The Furious', year: '2023', duration: '2j 21m', rating: '17+', description: 'Aksi balapan liar di jalanan kota yang mempertaruhkan nyawa. Seorang pembalap veteran harus kembali ke dunia ilegal untuk menyelamatkan orang yang ia cintai dari ancaman sindikat berbahaya.', cast: 'Vin Diesel, Michelle Rodriguez, Tyrese Gibson', genre: 'Aksi, Balapan', director: 'Justin Lin', recommendations: [] },
      { img: ipar, alt: 'Ipar Adalah Maut', year: '2024', duration: '1j 50m', rating: '17+', description: 'Sebuah drama pernikahan yang mengangkat isu perselingkuhan dalam keluarga. Film ini mengisahkan kehancuran rumah tangga akibat godaan yang datang dari orang terdekat.', cast: 'Adipati Dolken, Della Dartyan, Cut Meyriska', genre: 'Drama, Romansa', director: 'Hanung Bramantyo', recommendations: [] },
      { img: agaklaen, alt: 'Agak Laen', year: '2024', duration: '1j 44m', rating: '13+', description: 'Empat penjaga rumah hantu yang tidak laku berusaha keras membuat wahana mereka viral. Kekacauan demi kekacauan terjadi ketika rencana mereka justru menghadirkan pengunjung yang tidak diinginkan.', cast: 'Bene Dion, Muhadkly Acho, Boris Bokir, Oki Rengga', genre: 'Komedi', director: 'Muhadkly Acho', recommendations: [] },
      { img: alas, alt: 'Alas Roban', year: '2023', duration: '1j 38m', rating: '17+', description: 'Sebuah perjalanan melewati hutan angker Alas Roban berubah menjadi teror yang mencekam. Kisah nyata tentang kejadian mistis yang dialami para pengemudi truk di jalur maut tersebut.', cast: 'Arbani Yasiz, Maudy Effrosina', genre: 'Horor, Misteri', director: 'Awi Suryadi', recommendations: [] },
      { img: kairi, alt: 'Nobody Loves Kay', year: '2024', duration: '1j 52m', rating: '13+', description: 'Kay adalah gadis muda yang merasa tidak dicintai siapapun. Dalam pencariannya akan kasih sayang, ia bertemu berbagai karakter unik yang mengubah pandangannya tentang cinta dan keluarga.', cast: 'Beby Tsabina, Refal Hady, Aurora Ribero', genre: 'Drama, Romansa', director: 'Riri Riza', recommendations: [] },
    ],
  },
  {
    title: 'Film Trending',
    movies: [
      { img: cell, alt: 'Ghost in the Cell', year: '2023', duration: '1j 58m', rating: '17+', description: 'Seorang tahanan dengan kemampuan supernatural harus melindungi sesama narapidana dari ancaman entitas jahat yang menghantui penjara tua tersebut sejak puluhan tahun lalu.', cast: 'John Boyega, Michael Shannon, Taron Egerton', genre: 'Horor, Thriller', director: 'James Wan', recommendations: [] },
      { img: gjls, alt: 'GJLS', year: '2024', duration: '1j 42m', rating: '13+', description: 'Gue Juga Lo Sayang adalah kisah cinta yang penuh drama dan tawa. Empat bersahabat menghadapi konflik cinta yang rumit ketika perasaan mulai bercampur aduk di antara mereka.', cast: 'Raditya Dika, Arawinda Kirana, Chicco Jerikho', genre: 'Komedi, Romansa', director: 'Raditya Dika', recommendations: [] },
      { img: irit, alt: 'Keluarga Super Irit', year: '2024', duration: '1j 35m', rating: 'Semua Umur', description: 'Keluarga paling irit se-Indonesia harus menghadapi tantangan ketika tiba-tiba mendapat warisan besar. Akankah mereka berubah atau tetap mempertahankan gaya hidup hemat mereka?', cast: 'Sule, Andre Taulany, Andhika Pratama', genre: 'Komedi, Keluarga', director: 'Fajar Nugros', recommendations: [] },
      { img: jumbo, alt: 'Jumbo', year: '2025', duration: '1j 48m', rating: 'Semua Umur', description: 'Don, seorang anak yang kesepian menemukan sahabat tak terduga dalam petualangan magis yang membawanya melintasi dunia fantasi penuh warna dan keajaiban yang belum pernah ia bayangkan.', cast: 'Angga Yunanda, Aurora Ribero, Reza Rahadian', genre: 'Animasi, Petualangan, Keluarga', director: 'Ryan Adriandhy', recommendations: [] },
      { img: sore, alt: 'Sore', year: '2024', duration: '2j 10m', rating: '13+', description: 'Sore adalah istri dari masa depan yang dikirim kembali ke masa lalu untuk menemukan suaminya sebelum mereka pernah bertemu. Sebuah kisah cinta lintas waktu yang menyentuh hati.', cast: 'Sheila Dara, Dion Wiyoko, Vanesha Prescilla', genre: 'Romansa, Drama, Fiksi Ilmiah', director: 'Yandy Laurens', recommendations: [] },
    ],
  },
  {
    title: 'Rilis Baru',
    movies: [
      { img: ibu, alt: 'Jangan Buang Ibu', year: '2024', duration: '1j 50m', rating: '13+', description: 'Kisah perjuangan seorang ibu yang ditinggalkan anak-anaknya di panti jompo. Film ini menguras air mata dan mengingatkan kita akan pentingnya menghargai orang tua selagi masih ada.', cast: 'Nani Wijaya, Marcella Zalianty, Lukman Sardi', genre: 'Drama, Keluarga', director: 'Rako Prijanto', recommendations: [] },
      { img: garuda, alt: 'Garuda di Dadaku', year: '2024', duration: '1j 40m', rating: 'Semua Umur', description: 'Bayu, bocah 12 tahun berbakat sepak bola berjuang meraih mimpinya bergabung dengan Timnas Indonesia. Namun kakeknya menginginkan Bayu mengikuti tradisi keluarga sebagai atlet bulu tangkis.', cast: 'Emir Mahira, Aldo Tansani, Ramzi', genre: 'Drama, Olahraga, Keluarga', director: 'Ifa Isfansyah', recommendations: [] },
      { img: badut, alt: 'Badut Gendong', year: '2024', duration: '1j 55m', rating: '17+', description: 'Di balik kostum badut yang ceria, tersimpan kisah kelam seorang pria yang terjebak dalam lingkaran kriminal. Setiap pertunjukan bisa menjadi yang terakhir ketika hutang nyawa menagih janji.', cast: 'Ario Bayu, Putri Marino, Yoga Pratama', genre: 'Thriller, Drama', director: 'Edwin', recommendations: [] },
      { img: minion, alt: 'Minions & Monsters', year: '2024', duration: '1j 32m', rating: 'Semua Umur', description: 'Para Minion kembali dalam petualangan seru melawan monster-monster lucu yang mengancam ketenangan dunia. Gru dan tim harus bekerja sama dengan cara yang paling tidak terduga.', cast: 'Steve Carell, Pierre Coffin, Taraji P. Henson', genre: 'Animasi, Komedi, Keluarga', director: 'Kyle Balda', recommendations: [] },
      { img: dukun, alt: 'Dukun Magang', year: '2024', duration: '1j 45m', rating: '13+', description: 'Seorang mahasiswa tidak sengaja menjadi murid dukun sakti. Alih-alih belajar ilmu hitam, ia justru harus menggunakan kemampuannya untuk memberantas kejahatan di kampungnya.', cast: 'Jefan Nathanio, Hana Malasan, Fajar Nugros', genre: 'Komedi, Horor', director: 'Bernardus Yoyok', recommendations: [] },
    ],
  },
]

// Fungsi untuk mengambil film acak dari seluruh kategori sections
const getRandomRecommendations = (currentTitle, count = 3) => {
  const allMovies = sections.flatMap(s => s.movies);
  const filteredMovies = allMovies.filter(m => m.alt !== currentTitle);
  const shuffled = [...filteredMovies].sort(() => 0.5 - Math.random());
  
  return shuffled.slice(0, count).map((m, index) => ({
    img: m.img,
    title: m.alt,
    top: index % 2 === 0 ? '10' : null 
  }));
};

function MovieCard({ img, alt, isMobile, onSelect, movie }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onSelect({
        img: movie.img,
        title: movie.alt,
        year: movie.year,
        duration: movie.duration,
        rating: movie.rating,
        description: movie.description,
        cast: movie.cast,
        genre: movie.genre,
        director: movie.director,
        recommendations: getRandomRecommendations(movie.alt, 3)
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: isMobile ? '110px' : '200px',
        height: isMobile ? '150px' : '280px',
        borderRadius: '8px',
        cursor: 'pointer',
        flexShrink: 0,
        position: 'relative',
        transform: hovered ? 'scale(1.2) translateY(-20px)' : 'scale(1)',
        transition: '0.3s ease',
        zIndex: hovered ? 10 : 1,
      }}
    >
      <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />

      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.95))',
          borderRadius: '8px', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <button onClick={e => e.stopPropagation()} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>▶</button>
            <button onClick={e => e.stopPropagation()} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'transparent', border: '2px solid #aaa', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>✓</button>
            <button onClick={e => e.stopPropagation()} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'transparent', border: '2px solid #aaa', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>∨</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <span style={{ background: '#555', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>{movie.rating}</span>
            <span style={{ color: 'white', fontSize: '11px', fontWeight: 'bold' }}>{movie.duration}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {movie.genre.split(', ').map((g, i, arr) => (
              <span key={g} style={{ color: '#ccc', fontSize: '10px' }}>
                {g}{i < arr.length - 1 && <span style={{ margin: '0 3px', color: '#666' }}>•</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const arrowStyle = (side, isMobile) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [side === 'left' ? 'left' : 'right']: isMobile ? '-8px' : '-20px',
  width: isMobile ? '32px' : '48px',
  height: isMobile ? '32px' : '48px',
  border: 'none',
  borderRadius: '50%',
  background: 'rgba(40,40,40,0.95)',
  color: 'white',
  fontSize: isMobile ? '14px' : '20px',
  cursor: 'pointer',
  zIndex: 10,
  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
})

function Carousel({ title, movies, onSelect }) {
  const rowRef = useRef(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scroll = (dir) => {
    rowRef.current.scrollLeft += dir === 'left' ? -300 : 300
  }

  return (
    <section style={{ margin: isMobile ? '18px 12px' : '30px 40px', overflow: 'visible' }}>
      <h2 style={{ fontSize: isMobile ? '14px' : '20px', marginBottom: isMobile ? '12px' : '18px' }}>
        {title}
      </h2>
      <div style={{ position: 'relative', overflow: 'visible' }}>
        <button onClick={() => scroll('left')} style={arrowStyle('left', isMobile)}>❮</button>
        
        <div ref={rowRef} style={{ display: 'flex', gap: isMobile ? '8px' : '15px', overflowX: 'auto', overflowY: 'visible', paddingBottom: '20px', paddingTop: '40px', paddingRight: '40px', scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {movies.map((m) => (
            <MovieCard 
              key={m.alt} 
              img={m.img} 
              alt={m.alt} 
              isMobile={isMobile} 
              movie={m}
              onSelect={onSelect}
            />
          ))}
        </div>

        <button onClick={() => scroll('right')} style={arrowStyle('right', isMobile)}>❯</button>
      </div>
    </section>
  )
}

function Header({ onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [genreOpen, setGenreOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const genres = ['Aksi', 'Anak-anak', 'Anime', 'Britania', 'Drama', 'Fantasi', 'Kejahatan', 'KDrama', 'Komedi', 'Petualangan', 'Perang', 'Romantis', 'Sains & Alam', 'Thriller']

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header style={{ background: '#101010', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 15px' : '18px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '30px' }}>
        <Link to="/home">
          <img src={logo} alt="Logo Chill" style={{ width: isMobile ? '80px' : '100px', cursor: 'pointer' }} />
        </Link>
        <nav style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
          <Link to="/series" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Series</Link>
          <Link to="/film" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Film</Link>
          <Link to="/daftar-saya" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Daftar Saya</Link>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setGenreOpen(!genreOpen)} style={{ background: '#2b2b2b', border: 'none', color: 'white', padding: '7px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
              Genre ▼
            </button>
            {genreOpen && (
              <div style={{ position: 'absolute', top: '42px', left: 0, background: '#1b1b1b', width: '320px', padding: '14px', borderRadius: '6px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', boxShadow: '0 0 10px rgba(0,0,0,.5)', zIndex: 999 }}>
                {genres.map(genre => (
                  <div key={genre} style={{ color: '#ddd', fontSize: '12px', cursor: 'pointer', padding: '4px' }}>{genre}</div>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      <div style={{ position: 'relative' }}>
        <div onClick={() => setDropdownOpen(prev => !prev)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <img src={profil} alt="profile" style={{ width: isMobile ? '28px' : '34px', height: isMobile ? '28px' : '34px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ color: '#aaa', fontSize: isMobile ? '10px' : '12px' }}>▼</span>
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

function Hero({ onSelect }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [isMuted, setIsMuted] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  
  const movieData = {
    img: bgHero,
    title: '365 DAYS',
    year: '2020',
    duration: '1j 54m',
    rating: '18+',
    description: 'Film 365 Days adalah drama romansa erotis yang menceritakan tentang Laura, seorang wanita yang diculik oleh Don Massimo Torricelli, seorang bos mafia Sisilia. Ia diberi waktu 365 hari untuk jatuh cinta kepadanya.',
    cast: 'Michele Morrone, Anna-Maria Sieklucka, Magdalena Lamparska',
    genre: 'Drama, Romansa, Erotis',
    director: 'Barbara Białowąs, Tomasz Mandes',
  }

  const handleHeroSelect = () => {
    const allMovies = sections.flatMap(s => s.movies)
    const filteredMovies = allMovies.filter(m => m.alt !== '365 DAYS')
    const shuffled = [...filteredMovies].sort(() => 0.5 - Math.random())
    const randomRecs = shuffled.slice(0, 3).map((m, index) => ({
      img: m.img,
      title: m.alt,
      top: index % 2 === 0 ? '10' : null 
    }))

    onSelect({
      ...movieData,
      recommendations: randomRecs
    })
  }

  return (
    <section style={{ height: isMobile ? '250px' : '430px', margin: isMobile ? '12px' : '20px 40px', borderRadius: '10px', overflow: 'hidden', background: `linear-gradient(to right, rgba(0,0,0,.75), rgba(0,0,0,.2)), url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: isMobile ? '15px' : '40px' }}>
      <div style={{ width: '100%' }}>
        <h1 style={{ fontSize: isMobile ? '18px' : '42px', marginBottom: isMobile ? '8px' : '15px' }}>365 DAYS</h1>
        <p style={{ color: '#ddd', lineHeight: 1.5, marginBottom: isMobile ? '12px' : '20px', fontSize: isMobile ? '10px' : '14px', width: '90%' }}>
           365 Days adalah film drama romantis asal Poland yang dirilis pada tahun 2020. Film ini mengisahkan tentang Laura Biel, seorang wanita muda yang merasa hubungan asmaranya mulai hambar. Saat berlibur ke Sicily, hidupnya berubah ketika ia bertemu Massimo, seorang pria berpengaruh dari keluarga mafia yang terobsesi padanya. Massimo kemudian memberi Laura waktu 365 hari untuk jatuh cinta kepadanya, memulai perjalanan penuh konflik emosional, ketegangan, dan romansa intens.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '12px' }}>
            
            
            <button 
              onClick={() => navigate('/watch', { state: { movie: { title: '365 DAYS', img: bgHero } } })} 
              style={{ background: '#2d7ef7', border: 'none', padding: isMobile ? '7px 12px' : '10px 22px', color: 'white', borderRadius: '20px', cursor: 'pointer', fontSize: isMobile ? '10px' : '14px' }}
            >
              Mulai
            </button>
            
            
            <button onClick={handleHeroSelect} style={{ background: 'rgba(255,255,255,.15)', border: 'none', padding: isMobile ? '7px 12px' : '10px 20px', color: 'white', borderRadius: '20px', cursor: 'pointer', fontSize: isMobile ? '10px' : '14px' }}>ⓘ Selengkapnya</button>
            <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.7)', color: 'white', width: isMobile ? '32px' : '42px', height: isMobile ? '32px' : '42px', borderRadius: '50%', cursor: 'pointer', fontSize: isMobile ? '10px' : '13px' }}>18+</button>
          </div>
          
          <button 
            onClick={() => setIsMuted(m => !m)} 
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.7)', color: 'white', width: isMobile ? '32px' : '42px', height: isMobile ? '32px' : '42px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </section>
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

function HomePage() {
  const navigate = useNavigate()
  const [selectedMovie, setSelectedMovie] = useState(null)

  return (
    <div style={{ background: '#181818', color: 'white', minHeight: '100vh', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      <Header onLogout={() => {
        localStorage.removeItem('isPremium')
        localStorage.removeItem('premiumPlan')
        navigate('/login')
      }} />
      
      <Hero onSelect={setSelectedMovie} /> 
      {sections.map(s => (
        <Carousel key={s.title} title={s.title} movies={s.movies} onSelect={setSelectedMovie} />
      ))}
      <Footer />
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}

export default HomePage