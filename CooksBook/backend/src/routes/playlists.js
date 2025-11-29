const express = require('express');
const mongoose = require('mongoose');

const Playlist = require('../models/Playlist');
const User = require('../models/User');
const { requireAuth } = require('../auth/requireAuth');
const { upload } = require('../utils/upload');

function safeJsonParse(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

const router = express.Router();

//
/*
 * page,
 * limit,
 * input,
 * tags,
 * sortBy = 'likesCount',
 * ownerId,
 * withRecipe,
 * ids,
 * likedBy,
 * */
router.get('/', async (req, res) => {
  try {
    const {
      page,
      limit,
      input,
      tags,
      sortBy = 'newest',
      ownerId,
      withRecipe,
      ids,
      likedBy,
    } = req.query;

    let pageNum = null;
    let limitNum = null;
    let skipAmount = null;
    let usePagination = false;

    if (page !== undefined || limit !== undefined) {
      usePagination = true;
      pageNum = Math.max(1, Number(page) || 1);
      limitNum = Math.max(1, Math.min(50, Number(limit) || 20));
      skipAmount = (pageNum - 1) * limitNum;
    }

    const filter = {};
    const andParts = [];

    if (input && input.trim()) {
      const trimmedText = input.trim();
      const editted = trimmedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.name = new RegExp(editted, 'i');
    }

    if (ownerId && mongoose.isValidObjectId(ownerId)) {
      filter.owner = ownerId;
    }

    if (ids) {
      const idsArray = String(ids)
        .split(',')
        .map((id) => id.trim())
        .filter((id) => mongoose.isValidObjectId(id));

      if (idsArray.length > 0) {
        filter._id = { $in: idsArray };
      }
    }

    if (likedBy && mongoose.isValidObjectId(likedBy)) {
      const user = await User.findById(likedBy).select('likedPlaylists');

      if (!user || !user.likedPlaylists || user.likedPlaylists.length === 0) {
        return res.status(200).json({
          items: [],
          total: 0,
          page: usePagination ? pageNum || 1 : 1,
          totalPages: usePagination ? 0 : 1,
        });
      }
      filter._id = { $in: user.likedPlaylists };
    }

    if (tags) {
      const tagsArray = String(tags)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      if (tagsArray.length > 0) {
        const tagConditions = tagsArray.map((tagName) => ({
          tags: new RegExp(`^${tagName}$`, 'i'),
        }));
        andParts.push(...tagConditions);
      }
    }

    if (andParts.length > 0) {
      filter.$and = andParts;
    }

    const sortMap = {
      popularity: 'likesCount',
      viewsAmount: 'views',
      newest: 'createdAt',
    };

    let sortField = sortMap[sortBy] || 'createdAt';
    let sortOptions = { [sortField]: -1, _id: -1 };

    //Формування запиту
    let query = Playlist.find(filter)
      .sort(sortOptions)
      .select('name coverImage views recipes owner createdAt tags'); // додав tags в select

    if (usePagination) {
      query = query.skip(skipAmount).limit(limitNum);
    }

    const [rawLists, total] = await Promise.all([
      query.populate('owner', 'username avatar').lean(),
      Playlist.countDocuments(filter),
    ]);

    let having = new Set();

    if (withRecipe && mongoose.isValidObjectId(withRecipe)) {
      const currentIds = rawLists.map((p) => p._id);

      const havingDocs = await Playlist.find({
        _id: { $in: currentIds },
        recipes: withRecipe,
      }).select('_id');

      having = new Set(havingDocs.map((d) => d._id.toString()));
    }

    const items = rawLists.map((playlist) => ({
      id: playlist._id.toString(),
      name: playlist.name,
      coverImage: playlist.coverImage || null,
      views: playlist.views || 0,
      recipesCount: Array.isArray(playlist.recipes)
        ? playlist.recipes.length
        : 0,
      owner: playlist.owner
        ? {
            id: playlist.owner._id.toString(),
            name: playlist.owner.username,
            avatar: playlist.owner.avatar,
          }
        : null,
      hasRecipe: having.has(playlist._id.toString()),
      createdAt: playlist.createdAt,
      tags: playlist.tags || [],
    }));

    const totalPages = usePagination ? Math.ceil(total / (limitNum || 1)) : 1;

    return res.status(200).json({
      items,
      total,
      page: usePagination ? pageNum || 1 : 1,
      totalPages,
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

  const playlist = await Playlist.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate('owner', 'username avatar')
    .populate({
      path: 'recipes',
      select: '_id',
    })
    .lean();

  if (!playlist) {
    return res.status(404).json({ message: 'Плейлист не знайдено' });
  }

  const recipes = (playlist.recipes || []).map((recipe) =>
    recipe._id.toString()
  );

  return res.status(200).json({
    id: playlist._id.toString(),
    name: playlist.name,
    description: playlist.description || '',
    coverImage: playlist.coverImage || null,
    views: playlist.views || 0,
    recipesCount: recipes.length,
    owner: playlist.owner
      ? {
          id: playlist.owner._id.toString(),
          name: playlist.owner.username,
          avatar: playlist.owner.avatar || null,
        }
      : null,
    tags: playlist.tags || [],
    recipes,
    createdAt: playlist.createdAt,
  });
});

// Створення плейлиста /api/playlists
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    // Бажано додати try-catch, хоча у вас може бути глобальний обробник
    const { name, description, tags } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Назва обовʼязкова' });
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 3 || trimmedName.length > 50) {
      return res.status(400).json({ message: 'Назва має бути 3–50 символів' });
    }

    const tagsParsed = safeJsonParse(tags, []);

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const playlist = await Playlist.create({
      name: trimmedName,
      description: (description || '').trim(),
      owner: req.user.id,
      coverImage: imageUrl,
      recipes: [],
      likesCount: 0,
      tags: tagsParsed,
    });

    return res.status(201).json({
      id: playlist._id.toString(),
      name: playlist.name,
      description: playlist.description,
      coverImage: playlist.coverImage,
      likesCount: playlist.likesCount,
      recipesCount: 0,
      ownerId: playlist.owner.toString(),
      createdAt: playlist.createdAt,
      tags: playlist.tags,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка створення плейлиста' });
  }
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
    createdAt: playlist.createdAt,
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
    owner: req.user.id,
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
      likesCount: playlist.likesCount,
    });
  }

  user.likedPlaylists = Array.from(set);
  await Promise.all([user.save(), playlist.save()]);

  return res.status(200).json({
    playlistId: id,
    like: like === true,
    likesCount: playlist.likesCount,
  });
});

module.exports = router;
