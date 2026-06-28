import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const recommendations = [
  { title: 'The Tomorrow War', top: '10' },
  { title: 'Quantumania', top: '10' },
  { title: 'Guardians Vol. 3', top: '10' },
]

function MovieModal({ movie, onClose }) {
  const navigate = useNavigate()
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'auto' }
  }, [])

  if (!movie) return null
const isPremium = localStorage.getItem('isPremium') === 'true'
const handleTambahDaftar = () => {
  const saved = JSON.parse(localStorage.getItem('daftarFilm')) || []
  const sudahAda = saved.find(f => f.alt === movie.title)
  if (sudahAda) {
    alert('⚠️Film sudah ada di Daftar Saya')
    return
  }
  const newFilm = {
    id: Date.now(),
    alt: movie.title,
    badge: null,
    top: null,
  }
  localStorage.setItem('daftarFilm', JSON.stringify([...saved, newFilm]))
  alert(`✅"${movie.title}" ditambahkan ke Daftar Saya`)
}
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflowY: 'auto',
        padding: '40px 0',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '600px',
          background: '#181818',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Hero Image */}
        <div style={{
          height: '320px',
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
            }}
          >✕</button>

          <div style={{ width: '100%' }}>
            <h2 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>{movie.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
  <button
    onClick={() => navigate('/watch', { state: { movie: { title: movie.title, img: movie.img } } })}
    style={{ background: '#2d7ef7', border: 'none', padding: '8px 20px', color: 'white', borderRadius: '20px', cursor: 'pointer', fontSize: '14px' }}
  >
    Mulai
  </button>
  <button
    onClick={handleTambahDaftar}
    style={{
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: 'transparent',
      border: '2px solid #aaa',
      color: 'white',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold'
    }}
  >
    +
  </button>

  {isPremium && (
    <div style={{
      background: 'linear-gradient(135deg, #f5a623, #f7c948)',
      borderRadius: '20px', padding: '4px 12px',
      fontSize: '12px', fontWeight: 'bold', color: '#1a1a1a',
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

          <div style={{ display: 'flex', gap: '30px' }}>
            {/* Kiri - Deskripsi */}
            <div style={{ flex: 2 }}>
              <p style={{ color: '#ccc', fontSize: '13px', lineHeight: '1.6' }}>
                {movie.description || 'Deskripsi film tidak tersedia.'}
              </p>
            </div>

            {/* Kanan - Info */}
            <div style={{ flex: 1, fontSize: '13px' }}>
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
            <div style={{ display: 'flex', gap: '10px' }}>
              {(movie.recommendations || []).map((rec, i) => (
                <div key={i} style={{ flex: 1, borderRadius: '6px', overflow: 'hidden', position: 'relative', aspectRatio: '2/3', cursor: 'pointer' }}>
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

export default MovieModal
