import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import DaftarSayaPage from './pages/DaftarSayaPage'
import Film from './pages/FilmPage'
import Series from './pages/SeriesPage'
import ProfilePage from './pages/ProfilePage'
import PremiumPage from './pages/PremiumPage'
import PembayaranPage from './pages/PembayaranPage'
import PembayaranDetailPage from './pages/PembayaranDetailPage'
import VideoPlayerPage from './pages/VideoPlayerPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/daftar-saya" element={<DaftarSayaPage />} />
        <Route path="/film" element={<Film />} />
        <Route path="/series" element={<Series />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/pembayaran" element={<PembayaranPage />} />
        <Route path="/pembayaran-detail" element={<PembayaranDetailPage />} />
        <Route path="/watch" element={<VideoPlayerPage />} />   
      </Routes>
    </BrowserRouter>
  )
}

export default App
