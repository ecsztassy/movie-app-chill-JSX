# 🎬 CHILL - Movie Streaming App

Aplikasi streaming film dan series berbasis **ReactJS** yang dibangun sebagai project misi Frontend Intermediate.

---

## 📋 Deskripsi

CHILL adalah platform streaming film dan series yang memungkinkan pengguna untuk menonton berbagai konten hiburan. Aplikasi ini dibangun menggunakan ReactJS dengan konsep **component-based architecture** dan **reusable components**.

---

## ✨ Fitur

- 🔐 **Autentikasi** — Halaman Login dan Register dengan validasi form
- 🏠 **Homepage** — Hero banner, carousel film per kategori, hover card interaktif
- 🎥 **Video Player** — Player dengan kontrol lengkap (play/pause, volume, speed, subtitle, episode list)
- 🔍 **Detail Film** — Modal popup dengan informasi film, cast, genre, dan rekomendasi serupa
- 📋 **Daftar Saya** — Koleksi film yang disimpan pengguna
- 🎞️ **Series & Film** — Halaman terpisah untuk konten series dan film
- 👤 **Profil** — Edit nama, email, password, dan foto profil
- ⭐ **Premium** — Sistem langganan dengan 3 paket (Individual, Berdua, Keluarga)
- 💳 **Pembayaran** — Halaman ringkasan dan detail pembayaran dengan countdown timer
- 📱 **Responsive** — Tampilan menyesuaikan desktop dan mobile

---

## 🛠️ Tech Stack

| Tech | Keterangan |
|------|-----------|
| ReactJS 18 | Library utama UI |
| React Router DOM v6 | Client-side routing |
| Vite | Build tool |
| CSS-in-JS (Inline Style) | Styling komponen |

---

## 📁 Struktur Folder

```
chill-app/
├── public/
├── src/
│   ├── assets/          # Gambar dan logo
│   ├── components/      # Komponen reusable
│   │   ├── InputField.jsx
│   │   ├── Button.jsx
│   │   ├── Logo.jsx
│   │   ├── SSOButton.jsx
│   │   └── MovieModal.jsx
│   ├── pages/           # Halaman utama
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── SeriesPage.jsx
│   │   ├── FilmPage.jsx
│   │   ├── DaftarSayaPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── PremiumPage.jsx
│   │   ├── PembayaranPage.jsx
│   │   ├── PembayaranDetailPage.jsx
│   │   └── VideoPlayerPage.jsx
│   ├── App.jsx          # Routing utama
│   └── main.jsx         # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Cara Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/ecsztassy/movie-app-chill-JSX.git
cd movie-app-chill-JSX
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan development server

```bash
npm run dev
```

### 4. Buka di browser

```
http://localhost:5173
```

---

## 🗺️ Routing

| Path | Halaman |
|------|---------|
| `/login` | Halaman Login |
| `/register` | Halaman Register |
| `/home` | Homepage |
| `/series` | Halaman Series |
| `/film` | Halaman Film |
| `/daftar-saya` | Daftar Film Saya |
| `/profile` | Profil Pengguna |
| `/premium` | Halaman Premium |
| `/pembayaran` | Ringkasan Pembayaran |
| `/pembayaran-detail` | Detail Pembayaran |
| `/watch` | Video Player |

---

## 🧩 Reusable Components

| Komponen | Fungsi |
|----------|--------|
| `InputField` | Input form dengan props type, placeholder, value, onChange |
| `Button` | Tombol dengan variant primary/secondary |
| `Logo` | Logo CHILL dengan props width |
| `SSOButton` | Tombol login Google |
| `MovieModal` | Popup detail film dengan props movie, onClose |

---

## 👨‍💻 Developer

**Ecsztassy**  
Bootcamp Frontend Intermediate 2026

---

## 📄 Lisensi

Project ini dibuat untuk keperluan tugas misi bootcamp.  
© 2026 CHILL All Rights Reserved.
