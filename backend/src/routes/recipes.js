const express = require('express');
const mongoose = require('mongoose');

const Recipe = require('../models/Recipe');
const Review = require('../models/Review');
const User = require('../models/User');
const Playlist = require('../models/Playlist');

const { requireAuth } = require('../auth/requireAuth');
const { upload } = require('../utils/upload');

const router = express.Router();

function safeJsonParse(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

async function recomputeRecipeRating(recipeId) {
  const stats = await Review.aggregate([
    { $match: { recipe: new mongoose.Types.ObjectId(recipeId) } },
    {
      $group: {
        _id: '$recipe',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  const info = stats[0];
  const ratingAverage = info ? info.avgRating : 0;
  const ratingCount = info ? info.count : 0;

  await Recipe.findByIdAndUpdate(recipeId, {
    $set: { ratingAverage, ratingCount },
  });
}

// Отримання рецептів /api/recipes
router.get('/', async (req, res) => {
  try {
    const {
      page,
      limit,
      input,
      ingredients,
      difficulty,
      time,
      sortBy = 'popularity',
      authorId,
      likedBy,
      ids,
    } = req.query;

    // Перевірка чи треба пагінація рецептів
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

    //Пошук по назві title
    if (input && input.trim()) {
      const trimmedText = input.trim();
      const editted = trimmedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.title = new RegExp(editted, 'i');
    }

    //По складності
    if (difficulty && difficulty.trim()) {
      filter.difficulty = difficulty.trim();
    }

    //По часу приготування
    if (time) {
      const timeParsed = String(time).trim();
      if (timeParsed === 'underThirtyMinutes') {
        filter.timeMinutes = { $lt: 30 };
      } else if (timeParsed === 'underAnHour') {
        filter.timeMinutes = { $gte: 30, $lte: 60 };
      } else if (timeParsed === 'overAnHour') {
        filter.timeMinutes = { $gt: 60 };
      }
    }
    //По автору
    if (authorId && mongoose.isValidObjectId(authorId)) {
      filter.author = authorId;
    }
    //По списку id
    if (ids) {
      const idsArray = String(ids)
        .split(',')
        .map((id) => id.trim())
        .filter((id) => mongoose.isValidObjectId(id));

      if (idsArray.length > 0) {
        filter._id = { $in: idsArray };
      }
    }

    // Інгредієнти (Враховуємо групи)
    if (ingredients) {
      const ingredientsArray = String(ingredients)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      if (ingredientsArray.length > 0) {
        // Ми використовуємо dot notation: 'ingredients.items.name'
        // Mongo вміє шукати всередині масиву (ingredients), всередині якого є масив (items)
        const ingredientConditions = ingredientsArray.map((name) => ({
          'ingredients.items.name': new RegExp(`^${name}$`, 'i'),
        }));
        andParts.push(...ingredientConditions);
      }
    }

    //Повертає рецепти які лайкнув певний користувач за ід
    if (likedBy && mongoose.isValidObjectId(likedBy)) {
      const user = await User.findById(likedBy).select('likedRecipes');
      if (!user || !user.likedRecipes || user.likedRecipes.length === 0) {
        return res.status(200).json({
          items: [],
          total: 0,
          page: usePagination ? pageNum || 1 : 1,
          totalPages: usePagination ? 0 : 1,
        });
      }
      filter._id = { $in: user.likedRecipes };
    }

    //Щоб зберегти всі фільтри
    if (andParts.length > 0) {
      filter.$and = andParts;
    }

    const sortMap = {
      popularity: 'likesCount',
      rating: 'ratingAverage',
      reviewsAmount: 'ratingCount',
    };

    const sortField = sortMap[sortBy] || 'likesCount';

    let query = Recipe.find(filter)
      .sort({ [sortField]: -1, _id: 1 })
      .select('title imageUrl timeMinutes difficulty ratingAverage');

    if (usePagination) {
      query = query.skip(skipAmount).limit(limitNum);
    }

    const [rawItems, total] = await Promise.all([
      query.lean(),
      Recipe.countDocuments(filter),
    ]);

    const items = rawItems.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      image: item.imageUrl || null,
      time: item.timeMinutes,
      difficulty: item.difficulty,
      rating: item.ratingAverage,
    }));
    const totalPages = usePagination ? Math.ceil(total / (limitNum || 1)) : 1;

    return res.status(200).json({
      items,
      total,
      page: usePagination ? pageNum || 1 : 1,
      totalPages,
    });
  } catch (err) {
    console.error('Помила get метода /api/recipes error:', err);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
});

//Детальна інформація про рецепти /api/recipes/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Невалідний id рецепта' });
  }

  const recipe = await Recipe.findById(id)
    .populate('author', 'username avatar')
    .lean();

  if (!recipe) {
    return res.status(404).json({ message: 'Рецепт не знайдено' });
  }

  const reviewDocs = await Review.find({ recipe: id })
    .sort({ createdAt: -1 })
    .populate('author', 'username avatar')
    .lean();

  const reviews = reviewDocs.map((review) => ({
    id: review._id.toString(),
    rating: review.rating,
    text: review.text || '',
    author: {
      id: review.author._id.toString(),
      name: review.author.username,
      avatar: review.author.avatar,
    },
  }));

  const response = {
    id: recipe._id.toString(),
    title: recipe.title,
    cover: recipe.imageUrl || null,
    description: recipe.description || '',
    time: recipe.timeMinutes,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    rating: recipe.ratingAverage,
    author: {
      id: recipe.author._id.toString(),
      name: recipe.author.username,
      avatar: recipe.author.avatar || null,
    },

    ingredients: recipe.ingredients || [],
    steps: recipe.steps || [],
    reviews,
  };

  return res.status(200).json(response);
});

//Додавання рецепту /api/recipes/
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  const {
    title,
    description,
    timeMinutes,
    servings,
    difficulty,
    ingredients,
    steps,
  } = req.body || {};

  if (!title || !timeMinutes || !servings || !difficulty) {
    return res.status(400).json({ message: 'Обовʼязкові поля відсутні' });
  }

  const timeNum = Number(timeMinutes);
  const servingsNum = Number(servings);

  if (!Number.isFinite(timeNum) || timeNum <= 0) {
    return res.status(400).json({ message: 'Час має бути додатнім числом' });
  }

  if (!Number.isFinite(servingsNum) || servingsNum <= 0) {
    return res
      .status(400)
      .json({ message: 'Кількість порцій має бути додатнім числом' });
  }


  const ingredientsParsed = safeJsonParse(ingredients, []);
  const stepsParsed = safeJsonParse(steps, []);

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const recipe = await Recipe.create({
      title: title.trim(),
      description: (description || '').trim(),
      timeMinutes: timeNum,
      servings: servingsNum,
      difficulty: difficulty.trim(),
      ingredients: ingredientsParsed, // Mongoose перевірить структуру за схемою
      steps: stepsParsed,
      imageUrl,
      author: req.user.id,
    });

    return res.status(201).json({
      id: recipe._id.toString(),
      title: recipe.title,
      image: recipe.imageUrl,
      time: recipe.timeMinutes,
      difficulty: recipe.difficulty,
      rating: recipe.ratingAverage,
    });
  } catch (err) {
    console.error("Create recipe error:", err);
    return res.status(400).json({ message: 'Помилка при створенні рецепта (перевірте дані)' });
  }
});

// лайк/анлайк рецепта /api/recipes/:id/like
router.post('/:id/like', requireAuth, async (req, res) => {
  const recipeId = req.params.id;
  const { like } = req.body || {};

  if (!mongoose.isValidObjectId(recipeId)) {
    return res.status(400).json({ message: 'Невалідний id рецепта' });
  }

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: 'Рецепт не знайдено' });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ message: 'Не знайдено користувача' });
  }

  const set = new Set(user.likedRecipes.map((id) => id.toString()));
  let changed = false;

  if (like) {
    if (!set.has(recipeId)) {
      set.add(recipeId);
      recipe.likesCount += 1;
      changed = true;
    }
  } else {
    if (set.has(recipeId)) {
      set.delete(recipeId);
      recipe.likesCount = Math.max(0, recipe.likesCount - 1);
      changed = true;
    }
  }

  if (!changed) {
    return res.status(200).json({
      recipeId,
      like: set.has(recipeId),
      likesCount: recipe.likesCount,
    });
  }

  user.likedRecipes = Array.from(set);
  await Promise.all([user.save(), recipe.save()]);

  return res.status(200).json({
    recipeId,
    like: like === true,
    likesCount: recipe.likesCount,
  });
});

// створити відгук POST /api/recipes/:id/reviews
router.post('/:id/reviews', requireAuth, async (req, res) => {
  const recipeId = req.params.id;
  const { rating, text } = req.body || {};

  if (!mongoose.isValidObjectId(recipeId)) {
    return res.status(400).json({ message: 'Невалідний id рецепта' });
  }

  const ratingNum = Number(rating);
  if (!Number.isFinite(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ message: 'Рейтинг має бути від 1 до 5' });
  }

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: 'Рецепт не знайдено' });
  }

  const existing = await Review.findOne({
    recipe: recipeId,
    author: req.user.id,
  });

  if (existing) {
    return res
      .status(409)
      .json({ message: 'Ви вже залишили відгук до цього рецепта' });
  }

  const textSafe = typeof text === 'string' ? text.trim() : '';

  let review = await Review.create({
    recipe: recipeId,
    author: req.user.id,
    rating: ratingNum,
    text: textSafe,
  });

  review = await review.populate('author', 'username avatar');

  await recomputeRecipeRating(recipeId);

  return res.status(201).json({
    id: review._id.toString(),
    rating: review.rating,
    text: review.text,
    createdAt: review.createdAt,
    author: review.author
      ? {
        id: review.author._id.toString(),
        name: review.author.username,
        avatar: review.author.avatar || null,
      }
      : null,
  });
});

// збереження рецепту в плейлисти /recipes/:id/save
router.post('/:id/save', requireAuth, async (req, res) => {
  const recipeId = req.params.id;
  const incoming = Array.isArray(req.body.playlistIds)
    ? req.body.playlistIds
    : [];

  if (!mongoose.isValidObjectId(recipeId)) {
    return res.status(400).json({ message: 'Невалідний id рецепта' });
  }

  const recipe = await Recipe.findById(recipeId).select('_id');
  if (!recipe) {
    return res.status(404).json({ message: 'Рецепт не знайдено' });
  }

  const currentDocs = await Playlist.find({
    owner: req.user.id,
    recipes: recipeId,
  }).select('_id');

  const current = currentDocs.map((d) => d._id.toString());

  const ownedDocs = await Playlist.find({
    owner: req.user.id,
    _id: { $in: incoming },
  }).select('_id');

  const next = new Set(ownedDocs.map((d) => d._id.toString()));

  const toAdd = [...next].filter((id) => !current.includes(id));
  const toRemove = current.filter((id) => !next.has(id));

  if (toAdd.length) {
    await Playlist.updateMany(
      { _id: { $in: toAdd } },
      { $addToSet: { recipes: recipeId } }
    );
  }

  if (toRemove.length) {
    await Playlist.updateMany(
      { _id: { $in: toRemove } },
      { $pull: { recipes: recipeId } }
    );
  }

  const user = await User.findById(req.user.id);
  const s = new Set(user.savedInPlaylistRecipes.map((r) => r.toString()));

  if (next.size > 0) {
    s.add(recipeId);
  } else {
    s.delete(recipeId);
  }

  user.savedInPlaylistRecipes = Array.from(s);
  await user.save();

  return res.status(200).json({
    recipeId,
    playlistIds: [...next],
    added: toAdd,
    removed: toRemove,
    present: next.size > 0,
  });
});

module.exports = router;