CREATE DATABASE IF NOT EXISTS movie_app_chill;
USE movie_app_chill;

-- 1. USER
CREATE TABLE users (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    photo_url       VARCHAR(255),
    is_premium      BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. MOVIE
CREATE TABLE movies (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(200) NOT NULL,
    img_url         VARCHAR(255),
    year            VARCHAR(10),
    duration        VARCHAR(20),
    rating_age      VARCHAR(20),
    description     TEXT,
    director        VARCHAR(150),
    type            ENUM('film', 'series') DEFAULT 'film',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. GENRE
CREATE TABLE genres (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(50) NOT NULL UNIQUE
);

-- 4. ACTOR
CREATE TABLE actors (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150) NOT NULL UNIQUE
);

-- 5. MOVIE_GENRE (pivot)
CREATE TABLE movie_genres (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    movie_id        INT NOT NULL,
    genre_id        INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE,
    UNIQUE (movie_id, genre_id)
);

-- 6. MOVIE_CAST (pivot)
CREATE TABLE movie_casts (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    movie_id        INT NOT NULL,
    actor_id        INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES actors(id) ON DELETE CASCADE,
    UNIQUE (movie_id, actor_id)
);

-- 7. EPISODE (hanya relevan untuk movie.type = 'series')
CREATE TABLE episodes (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    movie_id        INT NOT NULL,
    episode_number  INT NOT NULL,
    title           VARCHAR(200),
    video_url       VARCHAR(255),
    duration        VARCHAR(20),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    UNIQUE (movie_id, episode_number)
);

-- 8. MYLIST (Daftar Saya)
CREATE TABLE my_lists (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    movie_id        INT NOT NULL,
    added_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    UNIQUE (user_id, movie_id)
);

-- 9. WATCH_HISTORY (fitur "Lanjutkan Tonton")
-- episode_id NULL artinya menonton film biasa, bukan episode series
CREATE TABLE watch_histories (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    user_id                 INT NOT NULL,
    movie_id                INT NOT NULL,
    episode_id              INT NULL,
    last_position_seconds   INT DEFAULT 0,
    watched_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (episode_id) REFERENCES episodes(id) ON DELETE CASCADE,
    UNIQUE (user_id, movie_id, episode_id)
);

-- 10. PLAN (Individual / Berdua / Keluarga)
CREATE TABLE plans (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    price           DECIMAL(10,2) NOT NULL,
    max_devices     INT DEFAULT 1
);

-- 11. PAYMENT
CREATE TABLE payments (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    plan_id         INT NOT NULL,
    amount          DECIMAL(10,2) NOT NULL,
    status          ENUM('pending', 'success', 'failed', 'expired') DEFAULT 'pending',
    payment_method  VARCHAR(50),
    expires_at      DATETIME,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE RESTRICT
);

-- ==========================================================
-- Sample seed (optional, illustrative only)
-- ==========================================================
-- INSERT INTO plans (name, price, max_devices) VALUES
--   ('Individual', 54000, 1), ('Berdua', 99000, 2), ('Keluarga', 149000, 4);
