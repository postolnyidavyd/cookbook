const express = require('express');
const mongoose = require('mongoose');

const Playlist = require('../models/Playlist');
const User = require('../models/User');
const { requireAuth } = require('../auth/requireAuth');

const router = express.Router();

//
// Отримання рецептів
// query:
//  - page?: number
//  - limit?: number
//  - sortBy?: "popularity" | "newest" (default "newest")
//  - ownerId?: ObjectId
//  - withRecipe?: ObjectId
//
router.get('/', async (req, res) => {
  try {
    const { page, limit, sortBy = 'newest', ownerId, withRecipe } = req.query;

    let usePagination = false;
    let pageNum = null;
    let limitNum = null;
    let skip = null;

    if (page !== undefined || limit !== undefined) {
      usePagination = true;
      pageNum = Math.max(1, Number(page) || 1);
      limitNum = Math.max(1, Math.min(50, Number(limit) || 20));
      skip = (pageNum - 1) * limitNum;
    }

    const filter = {};
    if (ownerId && mongoose.isValidObjectId(ownerId)) {
      filter.owner = ownerId;
    }

    let sort = { createdAt: -1, _id: -1 }; // newest
    if (sortBy === 'popularity') {
      sort = { likesCount: -1, _id: -1 };
    }

    let query = Playlist.find(filter)
      .sort(sort)
      .select('name coverImage description likesCount recipes owner createdAt');

    if (usePagination) {
      query = query.skip(skip).limit(limitNum);
    }

    const [rawLists, total] = await Promise.all([
      query.lean(),
      Playlist.countDocuments(filter)
    ]);

    let having = new Set();

    if (withRecipe && mongoose.isValidObjectId(withRecipe)) {
      const havingDocs = await Playlist.find({
        ...filter,
        recipes: withRecipe
      }).select('_id');

      having = new Set(havingDocs.map((d) => d._id.toString()));
    }

    const items = rawLists.map((pl) => ({
      id: pl._id.toString(),
      name: pl.name,
      coverImage: pl.coverImage || null,
      description: pl.description || '',
      likesCount: pl.likesCount || 0,
      recipesCount: Array.isArray(pl.recipes) ? pl.recipes.length : 0,
      ownerId: pl.owner?.toString(),
      hasRecipe: having.has(pl._id.toString()),
      createdAt: pl.createdAt
    }));

    const totalPages = usePagination ? Math.ceil(total / (limitNum || 1)) : 1;

    return res.status(200).json({
      items,
      total,
      page: usePagination ? pageNum : 1,
      totalPages
    });
  } catch (err) {
    console.error('GET /api/playlists error:', err);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Детальна інформація про плейлист /api/playlists/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалідний id плейлиста' });
  }

  const playlist = await Playlist.findById(id)
    .populate('owner', 'username avatar')
    .populate({
      path: 'recipes',
      select: 'title imageUrl timeMinutes difficulty ratingAverage'
    })
    .lean();

  if (!playlist) {
    return res.status(404).json({ message: 'Плейлист не знайдено' });
  }

  const recipes = (playlist.recipes || []).map((r) => ({
    id: r._id.toString(),
    title: r.title,
    image: r.imageUrl || null,
    time: r.timeMinutes,
    difficulty: r.difficulty,
    rating: r.ratingAverage
  }));

  return res.status(200).json({
    id: playlist._id.toString(),
    name: playlist.name,
    description: playlist.description || '',
    coverImage: playlist.coverImage || null,
    likesCount: playlist.likesCount || 0,
    recipesCount: recipes.length,
    owner: playlist.owner
      ? {
        id: playlist.owner._id.toString(),
        name: playlist.owner.username,
        avatar: playlist.owner.avatar || null
      }
      : null,
    recipes,
    createdAt: playlist.createdAt
  });
});

// Створення плейлиста /api/playlists
router.post('/', requireAuth, async (req, res) => {
  const { name, description } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Назва обовʼязкова' });
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 3 || trimmedName.length > 50) {
    return res.status(400).json({ message: 'Назва має бути 3–50 символів' });
  }

  const playlist = await Playlist.create({
    name: trimmedName,
    description: (description || '').trim(),
    owner: req.user.id,
    recipes: [],
    likesCount: 0
  });

  return res.status(201).json({
    id: playlist._id.toString(),
    name: playlist.name,
    description: playlist.description,
    coverImage: playlist.coverImage || null,
    likesCount: playlist.likesCount,
    recipesCount: 0,
    ownerId: playlist.owner.toString(),
    createdAt: playlist.createdAt
  });
});

// Змінити дані /api/playlists/:id
router.patch('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body || {};

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалідний id плейлиста' });
  }

  const updates = {};

  if (typeof name === 'string') {
    const trimmedName = name.trim();
    if (trimmedName.length < 3 || trimmedName.length > 50) {
      return res.status(400).json({ message: 'Назва має бути 3–50 символів' });
    }
    updates.name = trimmedName;
  }

  if (typeof description === 'string') {
    updates.description = description.trim();
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'Немає даних для оновлення' });
  }

  const playlist = await Playlist.findOneAndUpdate(
    { _id: id, owner: req.user.id },
    { $set: updates },
    { new: true }
  ).lean();

  if (!playlist) {
    return res.status(404).json({ message: 'Плейлист не знайдено або не ваш' });
  }

  return res.status(200).json({
    id: playlist._id.toString(),
    name: playlist.name,
    description: playlist.description || '',
    coverImage: playlist.coverImage || null,
    likesCount: playlist.likesCount || 0,
    recipesCount: Array.isArray(playlist.recipes) ? playlist.recipes.length : 0,
    ownerId: playlist.owner.toString(),
    createdAt: playlist.createdAt
  });
});

// Видалити свій плейлист /api/playlists/:id
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалідний id плейлиста' });
  }

  const deleted = await Playlist.findOneAndDelete({
    _id: id,
    owner: req.user.id
  });

  if (!deleted) {
    return res.status(404).json({ message: 'Плейлист не знайдено або не ваш' });
  }

  await User.updateMany(
    { likedPlaylists: id },
    { $pull: { likedPlaylists: id } }
  );

  return res.status(200).json({ ok: true });
});

// Лайк та анлайк /api/playlists/:id/like
router.post('/:id/like', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { like } = req.body || {};

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалідний id плейлиста' });
  }

  const playlist = await Playlist.findById(id);
  if (!playlist) {
    return res.status(404).json({ message: 'Плейлист не знайдено' });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ message: 'Не знайдено користувача' });
  }

  const set = new Set(user.likedPlaylists.map((p) => p.toString()));
  let changed = false;

  if (like) {
    if (!set.has(id)) {
      set.add(id);
      playlist.likesCount += 1;
      changed = true;
    }
  } else {
    if (set.has(id)) {
      set.delete(id);
      playlist.likesCount = Math.max(0, playlist.likesCount - 1);
      changed = true;
    }
  }

  if (!changed) {
    return res.status(200).json({
      playlistId: id,
      like: set.has(id),
      likesCount: playlist.likesCount
    });
  }

  user.likedPlaylists = Array.from(set);
  await Promise.all([user.save(), playlist.save()]);

  return res.status(200).json({
    playlistId: id,
    like: like === true,
    likesCount: playlist.likesCount
  });
});

module.exports = router;
