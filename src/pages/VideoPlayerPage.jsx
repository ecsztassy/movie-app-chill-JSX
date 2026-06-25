import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Database lokal untuk urutan perpindahan film saat klik tombol Next (⏩)
const allMovies = [
  { title: '365 DAYS', img: '/src/assets/images.jpg' }, 
  { title: 'Warkop DKI Reborn', img: '/src/assets/warkop.jpg' },
  { title: 'Colony', img: '/src/assets/Colony.jpg' },
  { title: 'Sekawan Limo', img: '/src/assets/sekawanlimo.jpg' },
  { title: 'Harusnya Horor', img: '/src/assets/harusnyahoror.jpg' },
  { title: 'Toy Story 5', img: '/src/assets/toystory.jpg' },
  { title: 'The Furious', img: '/src/assets/furiosjpg.jpg' },
  { title: 'Ipar Adalah Maut', img: '/src/assets/ipar.jpeg' },
  { title: 'Agak Laen', img: '/src/assets/agaklaen.jpeg' },
  { title: 'Alas Roban', img: '/src/assets/alas.jpg' },
  { title: 'Nobody Loves Kay', img: '/src/assets/kairi.jpeg' },
  { title: 'Ghost in the Cell', img: '/src/assets/cell.jpeg' },
  { title: 'GJLS', img: '/src/assets/gjls.jpg' },
  { title: 'Keluarga Super Irit', img: '/src/assets/irit.jpg' },
  { title: 'Jumbo', img: '/src/assets/jumbo.jpg' },
  { title: 'Sore', img: '/src/assets/sore.jpg' },
  { title: 'Jangan Buang Ibu', img: '/src/assets/ibu.jpg' },
  { title: 'Garuda di Dadaku', img: '/src/assets/garuda.jpg' },
  { title: 'Badut Gendong', img: '/src/assets/badut.jpg' },
  { title: 'Minions & Monsters', img: '/src/assets/minion.jpg' },
  { title: 'Dukun Magang', img: '/src/assets/dukun.jpg' }
];

function VideoPlayerPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // State untuk melacak data film aktif (dinamis)
  const [currentMovie, setCurrentMovie] = useState(location.state?.movie || { title: 'Warkop DKI Reborn', img: '/src/assets/warkop.jpg' });
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [currentAudio, setCurrentAudio] = useState('Bahasa Inggris')
  const [currentSubtitle, setCurrentSubtitle] = useState('Bahasa Indonesia')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [showControls, setShowControls] = useState(true)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [showEpisodeList, setShowEpisodeList] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showSpeed, setShowSpeed] = useState(false)
  const [speed, setSpeed] = useState('1x')
  const [progress, setProgress] = useState(0)
  const [showSkipIntro, setShowSkipIntro] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const controlsTimer = useRef(null)
  const progressTimer = useRef(null)
  const containerRef = useRef(null)

  const speedOptions = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x']

  // Fungsi membuat list episode dinamis mengikuti judul film aktif
  const getDynamicEpisodes = (movieTitle) => {
    return [
      { num: 1, title: `Bagian Utama - ${movieTitle}`, duration: '45m' },
      { num: 2, title: 'Behind The Scenes & Bloopers', duration: '15m' },
      { num: 3, title: 'Wawancara Eksklusif Pemeran', duration: '20m' }
    ];
  };

  const currentEpisodesList = getDynamicEpisodes(currentMovie.title);
const isPremium = localStorage.getItem('isPremium') === 'true'
const [showPremiumPopup, setShowPremiumPopup] = useState(!isPremium)
  // Effect mengontrol jalannya progress bar otomatis dipengaruhi oleh Speed pilihan
  useEffect(() => {
    if (isPlaying) {
      const speedMultiplier = parseFloat(speed) || 1;
      progressTimer.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer.current);
            return 100;
          }
          return prev + (0.05 * speedMultiplier);
        });
      }, 100);
    } else {
      clearInterval(progressTimer.current);
    }
    return () => clearInterval(progressTimer.current);
  }, [isPlaying, speed]);

  useEffect(() => {
    if (progress > 15) setShowSkipIntro(false)
  }, [progress])

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(controlsTimer.current)
    controlsTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }

  const closeAll = () => {
    setShowEpisodeList(false)
    setShowSubtitle(false)
    setShowSpeed(false)
    setShowVolumeSlider(false)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={() => { closeAll(); setIsPlaying(p => !p) }}
      style={{
        width: '100%', height: '100vh',
        background: currentMovie.img ? `url(${currentMovie.img}) center/cover no-repeat` : '#000',
        position: 'relative', overflow: 'hidden',
        cursor: showControls ? 'default' : 'none',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Overlay Gelap */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />

      {/* Playback State Icon */}
      {!isPlaying && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'white', pointerEvents: 'none' }}>
          ⏸
        </div>
      )}

      {/* Lewati Intro */}
      {showSkipIntro && (
        <button
          onClick={e => {
            e.stopPropagation();
            setProgress(p => Math.min(100, p + 1.67)); // Majukan 10 detik
            setShowSkipIntro(false);
          }}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.15)', border: '1px solid white',
            color: 'white', padding: '10px 20px', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px', fontWeight: 'bold',
            backdropFilter: 'blur(4px)', zIndex: 10
          }}
        >
          Lewati Intro
        </button>
      )}

      {/* Tombol Back */}
      {showControls && (
        <button
          onClick={e => { e.stopPropagation(); navigate(-1) }}
          style={{ position: 'absolute', top: '20px', left: '20px', background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', zIndex: 10 }}
        >
          ←
        </button>
      )}

      {/* CONTROLS BAR BAWAH */}
      {showControls && (
        <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '30px 24px 16px', zIndex: 10 }}>
          
          {/* Progress Bar */}
          <div
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pct = ((e.clientX - rect.left) / rect.width) * 100
              setProgress(pct)
            }}
            style={{ height: '4px', background: '#555', borderRadius: '2px', marginBottom: '12px', cursor: 'pointer', position: 'relative' }}
          >
            <div style={{ width: `${progress}%`, height: '100%', background: '#E50914', borderRadius: '2px', position: 'relative' }}>
              <div style={{ position: 'absolute', right: '-6px', top: '-4px', width: '12px', height: '12px', borderRadius: '50%', background: 'white' }} />
            </div>
          </div>

          {/* Control Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            
            {/* Bagian Kiri Kontrol */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button onClick={() => setIsPlaying(p => !p)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer' }}>
                {isPlaying ? '⏸' : '▶'}
              </button>

              <button onClick={() => setProgress(p => Math.max(0, p - 1.67))} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }} title="Mundur 10 detik">
                ⟲10s
              </button>

              <button onClick={() => setProgress(p => Math.min(100, p + 1.67))} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }} title="Maju 10 detik">
                 ⟳10s
              </button>

              {/* Volume Slider */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => { setIsMuted(m => !m); setShowVolumeSlider(s => !s) }} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}>
                  {isMuted || volume === 0 ? '🔇' : '🔊'}
                </button>
                {showVolumeSlider && (
                  <input type="range" min="0" max="100" value={isMuted ? 0 : volume} onChange={e => { setVolume(Number(e.target.value)); setIsMuted(false) }} style={{ width: '80px', accentColor: 'white' }} onClick={e => e.stopPropagation()} />
                )}
              </div>

              {/* Judul & Episode Aktif */}
              <span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                {currentMovie.title} - E{currentEpisode}: {currentEpisodesList[currentEpisode - 1]?.title}
              </span>
            </div>

            {/* Bagian Kanan Kontrol */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              
              {/* Tombol Film Berikutnya */}
              <button
                onClick={() => {
                  const currentIndex = allMovies.findIndex(m => m.title === currentMovie.title);
                  if (currentIndex !== -1 && currentIndex < allMovies.length - 1) {
                    const nextMovie = allMovies[currentIndex + 1];
                    setCurrentMovie({ title: nextMovie.title, img: nextMovie.img });
                    setCurrentEpisode(1); // Balikkan ke episode 1 film baru
                    setProgress(0);
                    setIsPlaying(true);
                    setShowSkipIntro(true);
                  } else {
                    alert('Ini adalah film terakhir di daftar!');
                  }
                }}
                style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}
                title="Film Berikutnya"
              >
                ⏩
              </button>

              {/* Dropdown Konten/Episode */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => { setShowEpisodeList(s => !s); setShowSubtitle(false); setShowSpeed(false) }} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }} title="Daftar Konten">
                  ☰
                </button>
                {showEpisodeList && (
                  <div style={{ position: 'absolute', bottom: '40px', right: 0, background: '#1a1a1a', borderRadius: '8px', width: '260px', padding: '8px 0', boxShadow: '0 0 12px rgba(0,0,0,0.6)' }}>
                    <div style={{ padding: '10px 16px', fontSize: '12px', color: '#aaa', borderBottom: '1px solid #333' }}>Daftar Konten: {currentMovie.title}</div>
                    {currentEpisodesList.map(ep => (
                      <div
                        key={ep.num}
                        style={{ padding: '10px 16px', cursor: 'pointer', fontSize: '13px', color: currentEpisode === ep.num ? '#E50914' : 'white', display: 'flex', justifyContent: 'space-between', background: currentEpisode === ep.num ? '#2a2a2a' : 'transparent' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#2a2a2a'}
                        onMouseLeave={e => e.currentTarget.style.background = currentEpisode === ep.num ? '#2a2a2a' : 'transparent'}
                        onClick={() => {
                          setCurrentEpisode(ep.num);
                          setProgress(0);
                          setIsPlaying(true);
                          setShowSkipIntro(true);
                          setShowEpisodeList(false);
                        }}
                      >
                        <span>E{ep.num}: {ep.title.length > 20 ? ep.title.slice(0, 18) + '..' : ep.title}</span>
                        <span style={{ color: '#aaa', fontSize: '11px' }}>{ep.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

         {/* Subtitle & Audio Popover */}
<div style={{ position: 'relative' }}>
  <button 
    onClick={(e) => { 
      e.stopPropagation(); // Biar tidak memicu play/pause video saat klik tombol ini
      setShowSubtitle(s => !s); 
      setShowEpisodeList(false); 
      setShowSpeed(false) 
    }} 
    style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }} 
    title="Subtitle & Audio"
  >
    [CC]
  </button>
  {showSubtitle && (
    <div 
      onClick={e => e.stopPropagation()} // Cegah popover menutup sendiri saat area dalamnya diklik
      style={{ position: 'absolute', bottom: '40px', right: 0, background: 'rgba(30,30,30,0.95)', borderRadius: '8px', width: '320px', padding: '16px', boxShadow: '0 0 12px rgba(0,0,0,0.6)', display: 'flex', gap: '30px', zIndex: 30 }}
    >
      {/* Kolom Pilihan Audio */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px', color: 'white' }}>Audio</div>
        {['Bahasa Inggris', 'Bahasa Indonesia'].map((audioName) => {
          const isSelected = currentAudio === audioName;
          return (
            <div 
              key={audioName} 
              onClick={() => setCurrentAudio(audioName)} // Set audio aktif saat diklik
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', cursor: 'pointer', fontSize: '13px', color: isSelected ? '#E50914' : 'white', fontWeight: isSelected ? 'bold' : 'normal' }}
            >
              <span style={{ width: '14px', display: 'inline-block', color: '#E50914' }}>
                {isSelected ? '✓' : ''}
              </span>
              {audioName}
            </div>
          );
        })}
      </div>

      {/* Pembatas Tengah */}
      <div style={{ width: '1px', background: '#444' }} />

      {/* Kolom Pilihan Terjemahan (Subtitle) */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px', color: 'white' }}>Terjemahan</div>
        {['Off', 'Bahasa Indonesia', 'Bahasa Inggris'].map((subName) => {
          const isSelected = currentSubtitle === subName;
          return (
            <div 
              key={subName} 
              onClick={() => setCurrentSubtitle(subName)} // Set subtitle aktif saat diklik
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', cursor: 'pointer', fontSize: '13px', color: isSelected ? '#E50914' : 'white', fontWeight: isSelected ? 'bold' : 'normal' }}
            >
              <span style={{ width: '14px', display: 'inline-block', color: '#E50914' }}>
                {isSelected ? '✓' : ''}
              </span>
              {subName}
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>

              {/* Kecepatan Video (Speed Slider) */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => { setShowSpeed(s => !s); setShowEpisodeList(false); setShowSubtitle(false) }} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }} title="Kecepatan">
                  {speed}⏱️
                </button>
                {showSpeed && (
                  <div style={{ position: 'absolute', bottom: '40px', right: 0, background: '#1a1a1a', borderRadius: '8px', width: '130px', padding: '8px 0', boxShadow: '0 0 12px rgba(0,0,0,0.6)' }}>
                    <div style={{ padding: '10px 16px', fontSize: '12px', color: '#aaa', borderBottom: '1px solid #333' }}>Kecepatan</div>
                    {speedOptions.map(s => (
                      <div
                        key={s}
                        style={{ padding: '10px 16px', cursor: 'pointer', fontSize: '13px', color: speed === s ? '#E50914' : 'white' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#2a2a2a'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        onClick={() => { setSpeed(s); setShowSpeed(false) }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen Toggle */}
              <button onClick={toggleFullscreen} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }} title="Fullscreen">
                ⛶
              </button>
            </div>

          </div>
        </div>
      )}
      {showPremiumPopup && (
  <div
    onClick={e => e.stopPropagation()}
    style={{
      position: 'absolute', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '40px',
    }}
  >
    <h2 style={{color: '#aaa', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
      Layanan Premium ⭐
    </h2>
    <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '40px' }}>
      Tingkatkan paket anda untuk dapat menonton video ini.
    </p>
    <p style={{color: '#aaa', fontSize: '16px', fontWeight: 'bold', marginBottom: '30px' }}>
      Kenapa Harus Berlangganan?
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px 60px', marginBottom: '40px', textAlign: 'center' }}>
      {[
        { icon: '⬇️', label: 'Download Konten\nPilihan' },
        { icon: '🚫', label: 'Tidak Ada Iklan' },
        { icon: '🎬', label: 'Tonton Semua Konten' },
        { icon: '4K', label: 'Kualitas Maksimal\nSampai Dengan 4K', is4k: true },
        { icon: '💻', label: 'Tonton di Tv, Tablet,\nMobile, dan Laptop' },
        { icon: '💬', label: 'Subtitle Untuk Konten\nPilihan' },
      ].map((f, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '50px', height: '50px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: f.is4k ? '14px' : '22px',
            fontWeight: f.is4k ? 'bold' : 'normal', color: 'white',
          }}>
            {f.icon}
          </div>
          <div style={{ fontSize: '12px', color: '#ccc', whiteSpace: 'pre-line', lineHeight: '1.5' }}>{f.label}</div>
        </div>
      ))}
    </div>
    <button
      onClick={() => navigate('/premium')}
      style={{
        background: '#3b5bdb', border: 'none', color: 'white',
        padding: '14px 40px', borderRadius: '30px',
        fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
      }}
    >
      Ubah Jadi Premium
    </button>
  </div>
)}
    </div>
  )
}

export default VideoPlayerPage;