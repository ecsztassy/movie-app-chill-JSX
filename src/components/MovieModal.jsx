import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// 1. IMPORT API UNTUK MOCKAPI
import { addDaftar, getDaftar } from '../services/api'

function MovieModal({ movie, onClose }) {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  
  useEffect(() => {
    // Mencegah background scrolling saat modal dibuka
    document.body.style.overflow = 'hidden'
    
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    
    return () => { 
      document.body.style.overflow = 'auto'
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!movie) return null
  
  const isPremium = localStorage.getItem('isPremium') === 'true'

  // 2. FUNGSI TAMBAH DAFTAR: Menggunakan async-await untuk validasi & hit MockAPI
  const handleTambahDaftar = async () => {
    try {
      // Ambil seluruh data dari MockAPI untuk mengecek duplikasi
      const daftarSaatIni = await getDaftar()
      
      // Cek apakah judul film (movie.title) sudah ada di database
      const sudahAda = daftarSaatIni.find(f => f.alt === movie.title)
      
      if (sudahAda) {
        alert(`⚠️ Film "${movie.title}" sudah ada di Daftar Saya!`)
        return // Stop di sini, jangan kirim data dobel
      }

      // Siapkan objek data sesuai dengan skema database kamu
      const newFilm = {
        alt: movie.title,
        img: movie.img || "", // Menjamin gambar tersimpan dengan benar di server
        badge: movie.badge || "",
        top: movie.top || "",
      }

      // Kirim data baru menggunakan Axios ke MockAPI
      await addDaftar(newFilm)
      alert(`✅ "${movie.title}" berhasil ditambahkan ke Daftar Saya!`)
    } catch (error) {
      console.error("Gagal menambahkan ke Daftar Saya:", error)
      alert("❌ Gagal memeriksa atau menambahkan film ke server.")
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: isMobile ? 'center' : 'flex-start',
        overflowY: 'auto',
        padding: isMobile ? '10px' : '40px 0',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '600px',
          background: '#181818',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          maxHeight: isMobile ? '90vh' : 'auto',
          overflowY: isMobile ? 'auto' : 'visible'
        }}
      >
        {/* Hero Image */}
        <div style={{
          height: isMobile ? '200px' : '320px',
          background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(24,24,24,1)), url(${movie.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '20px',
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '12px', right: '12px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#181818', border: 'none',
              color: 'white', fontSize: '16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10
            }}
          >✕</button>

          <div style={{ width: '100%' }}>
            <h2 style={{ color: 'white', fontSize: isMobile ? '18px' : '24px', marginBottom: '12px' }}>{movie.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => navigate('/watch', { state: { movie: { title: movie.title, img: movie.img } } })}
                  style={{ background: '#2d7ef7', border: 'none', padding: isMobile ? '6px 14px' : '8px 20px', color: 'white', borderRadius: '20px', cursor: 'pointer', fontSize: isMobile ? '12px' : '14px' }}
                >
                  Mulai
                </button>
                <button
                  onClick={handleTambahDaftar}
                  style={{
                    width: isMobile ? '32px' : '38px',
                    height: isMobile ? '32px' : '38px',
                    borderRadius: '50%',
                    background: 'transparent',
                    border: '2px solid #aaa',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: isMobile ? '16px' : '18px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>

                {isPremium && (
                  <div style={{
                    background: 'linear-gradient(135deg, #f5a623, #f7c948)',
                    borderRadius: '20px', padding: '4px 12px',
                    fontSize: '11px', fontWeight: 'bold', color: '#1a1a1a',
                  }}>
                    Premium
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Content */}
        <div style={{ padding: '20px', color: 'white' }}>
          {/* Meta info */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#aaa', fontSize: '13px' }}>{movie.year || '2023'}</span>
            <span style={{ color: '#aaa', fontSize: '13px' }}>{movie.duration || '2j 29m'}</span>
            <span style={{
              border: '1px solid #aaa', color: '#aaa',
              fontSize: '11px', padding: '1px 6px', borderRadius: '3px',
            }}>{movie.rating || 'PG-13'}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '15px' : '30px' }}>
            {/* Kiri - Deskripsi */}
            <div style={{ flex: 2 }}>
              <p style={{ color: '#ccc', fontSize: isMobile ? '12px' : '13px', lineHeight: '1.6' }}>
                {movie.description || 'Deskripsi film tidak tersedia.'}
              </p>
            </div>

            {/* Kanan - Info */}
            <div style={{ flex: 1, fontSize: isMobile ? '12px' : '13px' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#888' }}>Cast : </span>
                <span style={{ color: '#ccc' }}>{movie.cast || 'Tidak tersedia'}</span>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#888' }}>Genre : </span>
                <span style={{ color: '#ccc' }}>{movie.genre || 'Tidak tersedia'}</span>
              </div>
              <div>
                <span style={{ color: '#888' }}>Pembuat Film : </span>
                <span style={{ color: '#ccc' }}>{movie.director || 'Tidak tersedia'}</span>
              </div>
            </div>
          </div>

          {/* Rekomendasi */}
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Rekomendasi Serupa</h3>
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              overflowX: isMobile ? 'auto' : 'visible',
              paddingBottom: isMobile ? '10px' : '0',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              {(movie.recommendations || []).map((rec, i) => (
                <div 
                  key={i} 
                  style={{ 
                    flex: isMobile ? '0 0 110px' : 1, // Kunci lebar item rekomendasi di mobile agar bisa digeser horizontal
                    borderRadius: '6px', 
                    overflow: 'hidden', 
                    position: 'relative', 
                    aspectRatio: '2/3', 
                    cursor: 'pointer' 
                  }}
                >
                  <img src={rec.img} alt={rec.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {rec.top && (
                    <div style={{
                      position: 'absolute', top: '6px', right: '6px',
                      background: '#E50914', color: 'white',
                      fontSize: '9px', fontWeight: 'bold',
                      padding: '2px 5px', borderRadius: '3px',
                      textAlign: 'center', lineHeight: '1.3',
                    }}>Top<br />{rec.top}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal;
