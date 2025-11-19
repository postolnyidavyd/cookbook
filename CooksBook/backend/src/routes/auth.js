const express = require('express');
const bcrypt = require('bcrypt'); // для хешування паролів
const jwt = require('jsonwebtoken');
const path = require('node:path');
const fs = require('node:fs');

const User = require('../models/User');
const {requireAuth } = require('../auth/requireAuth');
const {
  signAccessToken,
  signRefreshToken,
  sendRefreshCookie,
  clearRefreshCookie,
} = require('../auth/tokens');
const { upload, UPLOAD_DIR } = require('../utils/upload');


const router = express.Router();
function removeOldAvatar(oldAvatarPath) {
  if (!oldAvatarPath) return;

  if (oldAvatarPath.includes('default_avatar')) return;

  const fullPath = path.join(UPLOAD_DIR, path.basename(oldAvatarPath));
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.warn('Не вийшло видалити аватар:', err.message);
    }
  });
}
// Реєстрація /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body || {};
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Відсутні поля' });
  }

  const doesUserExists = await User.findOne({ email });
  if (doesUserExists)
    return res.status(409).json({ message: 'Ця пошта вже використовується' });

  const passwordHash = await bcrypt.hash(password, 12);

  //Створює і зберігає відразу в базу даних
  const user = await User.create({ email, passwordHash, username });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  sendRefreshCookie(res, refreshToken);
  //201 - Created, 200- ok

  res.status(201).json({
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      likedRecipes: user.likedRecipes,
      likedPlaylists: user.likedPlaylists,
      savedInPlaylistRecipes: user.savedInPlaylistRecipes,
    },
  });
});

// Логін /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Недійсні дані' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Недійсні дані' });
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  sendRefreshCookie(res, refreshToken);

  res.status(200).json({
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      likedRecipes: user.likedRecipes,
      likedPlaylists: user.likedPlaylists,
      savedInPlaylistRecipes: user.savedInPlaylistRecipes,
    },
  });
});

// Оновлення токену /api/auth/refresh
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.cookies || {};
  if (!refreshToken)
    return res.status(401).json({ message: 'Немає refresh token' });

  try {
    //Верифікація і отримання токену
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Не знайдено користувача' });

    if (payload.vers !== user.tokenVersion) {
      return res.status(401).json({ message: 'Оновлення невалідне' });
    }

    const newRefreshToken = signRefreshToken(user);
    sendRefreshCookie(res, newRefreshToken);

    const accessToken = signAccessToken(user);

    res.status(200).json({ accessToken });
  } catch {
    res.status(401).json({ message: 'Невалідне оновлення або закінчився час' });
  }
});

// Вихід /api/auth/logout
router.post('/logout', requireAuth, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $inc: { tokenVersion: 1 } });

  clearRefreshCookie(res);

  res.status(200).json({ ok: true });
});

//Отримати дані залогіненого юзера, наприклад коли токен є в cookies після оновлення сайту
// /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'Не знайдено користувача' });

  res.status(200).json({
    id: user._id,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    likedRecipes: user.likedRecipes,
    likedPlaylists: user.likedPlaylists,
    savedInPlaylistRecipes: user.savedInPlaylistRecipes,
  });
});

//Зміна даних юсера (ім'я, email, аватар) /api/auth/me
//upload.single парсить надісланий фронтом formData: поля в req.body, файл зберігає в папку та в req.file
router.patch('/me', requireAuth, upload.single('avatar'), async (req, res) => {
  const { username,email } = req.body || {};
  const updates = {};

  //Валідація username
  if (typeof username === 'string') {
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3 || trimmedUsername.length > 30) {
      return res.status(400).json({ message: 'Імʼя має бути 3–30 символів' });
    }
    updates.username = trimmedUsername;
  }

  //Валідація email
  if (typeof email === 'string') {
    const trimmedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ message: 'Невалідний email' });
    }

    // перевіряємо, чи не зайнятий іншим юзером
    const exists = await User.findOne({
      email: trimmedEmail,
      _id: { $ne: req.user.id }, // не юзером який хоче змінити
    });

    if (exists) {
      return res.status(409).json({ message: 'Цей email вже використовується' });
    }
    updates.email = trimmedEmail;
  }

  // Валідація аватара
  let oldAvatar;
  if (req.file) {
    const userBefore = await User.findById(req.user.id).select('avatar');
    if (!userBefore) return res.status(404).json({ message: 'Не знайдено користувача' });

    oldAvatar = userBefore.avatar;
    updates.avatar = `/uploads/${req.file.filename}`;
  }


  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'Немає даних для оновлення' });
  }

  // Оновлюємо
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: updates },
    { new: true }
  );

  if (!user) return res.status(404).json({ message: 'Не знайдено користувача' });

  if (oldAvatar && req.file) {
    removeOldAvatar(oldAvatar);
  }

  res.status(200).json({
    id: user._id,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    likedRecipes: user.likedRecipes,
    likedPlaylists: user.likedPlaylists,
    savedInPlaylistRecipes: user.savedInPlaylistRecipes,
  });
});

module.exports = router;