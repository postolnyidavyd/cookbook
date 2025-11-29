// scripts/seed.js
require('dotenv').config();
const bcrypt = require('bcrypt');

const { connectDB } = require('../db');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Playlist = require('../models/Playlist');
const Review = require('../models/Review');

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function pickRandomMany(arr, count) {
  if (count >= arr.length) return [...arr];
  const result = [];
  const used = new Set();
  while (result.length < count) {
    const idx = randInt(0, arr.length - 1);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

async function main() {
  await connectDB();
  console.log('✅ Connected to MongoDB');

  // ⚠️ Все стираємо
  await Promise.all([
    User.deleteMany({}),
    Recipe.deleteMany({}),
    Playlist.deleteMany({}),
    Review.deleteMany({})
  ]);
  console.log('🧹 Collections cleared');

  // ---------- 1. USERS ----------
  const rawUsers = [
    { email: 'anna@example.com', username: 'Анна' },
    { email: 'dmytro@example.com', username: 'Дмитро' },
    { email: 'olena@example.com', username: 'Олена' },
    { email: 'ivan@example.com', username: 'Іван' },
    { email: 'sofia@example.com', username: 'Софія' },
    { email: 'maksym@example.com', username: 'Максим' },
    { email: 'chefpro@example.com', username: 'ChefPro' },
    { email: 'studentcook@example.com', username: 'StudentCook' }
  ];

  const passwordHash = await bcrypt.hash('password123', 10);

  const users = await User.insertMany(
    rawUsers.map((u) => ({
      ...u,
      passwordHash
    }))
  );

  console.log('👤 Users created:', users.map((u) => u.email).join(', '));
  console.log('Пароль для всіх: password123');

  // ---------- 2. RECIPES ----------
  const baseRecipes = [
    {
      title: 'Класичний борщ',
      description: 'Насичений український борщ з мʼясом та овочами.',
      timeMinutes: 90,
      servings: 6,
      difficulty: 'Помірно',
      ingredients: [
        { name: 'Свинина', amount: 500, unit: 'г' },
        { name: 'Картопля', amount: 4, unit: 'шт' },
        { name: 'Буряк', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 300, unit: 'г' },
        { name: 'Морква', amount: 1, unit: 'шт' },
        { name: 'Цибуля', amount: 1, unit: 'шт' }
      ],
      steps: [
        { order: 1, title: 'Варіння бульйону', text: 'Зварити мʼясний бульйон.' },
        { order: 2, title: 'Додавання овочів', text: 'Додати нарізані овочі та варити до готовності.' },
        { order: 3, title: 'Спеції', text: 'Приправити сіллю, перцем та спеціями.' }
      ]
    },
    {
      title: 'Паста карбонара',
      description: 'Швидка паста з беконом, яйцем і твердим сиром.',
      timeMinutes: 25,
      servings: 2,
      difficulty: 'Легко',
      ingredients: [
        { name: 'Спагеті', amount: 200, unit: 'г' },
        { name: 'Бекон', amount: 100, unit: 'г' },
        { name: 'Яйце', amount: 2, unit: 'шт' },
        { name: 'Сир Пармезан', amount: 50, unit: 'г' }
      ],
      steps: [
        { order: 1, title: 'Приготування пасти', text: 'Відварити спагеті до стану al dente.' },
        { order: 2, title: 'Смаження бекону', text: 'Обсмажити бекон до хрусткої скоринки.' },
        { order: 3, title: 'Змішування', text: 'Змішати яйця з тертим сиром і додати до гарячої пасти.' }
      ]
    },
    {
      title: 'Млинці з сиром',
      description: 'Тонкі млинці з солодкою сирною начинкою.',
      timeMinutes: 40,
      servings: 4,
      difficulty: 'Легко',
      ingredients: [
        { name: 'Молоко', amount: 500, unit: 'мл' },
        { name: 'Борошно', amount: 250, unit: 'г' },
        { name: 'Яйце', amount: 2, unit: 'шт' },
        { name: 'Сир кисломолочний', amount: 200, unit: 'г' },
        { name: 'Цукор', amount: 50, unit: 'г' }
      ],
      steps: [
        { order: 1, title: 'Смаження млинців', text: 'Приготувати тісто на млинці та обсмажити їх.' },
        { order: 2, title: 'Підготовка начинки', text: 'Змішати сир з цукром.' },
        { order: 3, title: 'Загортання', text: 'Загорнути сир у млинці та злегка обсмажити.' }
      ]
    },
    {
      title: 'Цезар з куркою',
      description: 'Салат з куркою, сухариками та сиром пармезан.',
      timeMinutes: 20,
      servings: 2,
      difficulty: 'Легко',
      ingredients: [
        { name: 'Куряче філе', amount: 200, unit: 'г' },
        { name: 'Салат Ромен', amount: 150, unit: 'г' },
        { name: 'Сухарики', amount: 50, unit: 'г' },
        { name: 'Сир Пармезан', amount: 30, unit: 'г' }
      ],
      steps: [
        { order: 1, title: 'Підготовка курки', text: 'Обсмажити куряче філе та нарізати слайсами.' },
        { order: 2, title: 'Підготовка салату', text: 'Змішати салат з соусом цезар.' },
        { order: 3, title: 'Сервіровка', text: 'Додати курку, сухарики та пармезан.' }
      ]
    },
    {
      title: 'Омлет з овочами',
      description: 'Поживний омлет з овочами на сніданок.',
      timeMinutes: 15,
      servings: 1,
      difficulty: 'Легко',
      ingredients: [
        { name: 'Яйце', amount: 3, unit: 'шт' },
        { name: 'Помідор', amount: 1, unit: 'шт' },
        { name: 'Перець болгарський', amount: 0.5, unit: 'шт' },
        { name: 'Сир твердий', amount: 30, unit: 'г' }
      ],
      steps: [
        { order: 1, title: 'Збивання яєць', text: 'Збити яйця з сіллю та перцем.' },
        { order: 2, title: 'Нарізка овочів', text: 'Додати нарізані овочі.' },
        { order: 3, title: 'Смаження', text: 'Обсмажити на середньому вогні.' }
      ]
    },
    {
      title: 'Шоколадний брауні',
      description: 'Насичений шоколадний десерт.',
      timeMinutes: 45,
      servings: 8,
      difficulty: 'Помірно',
      ingredients: [
        { name: 'Шоколад чорний', amount: 200, unit: 'г' },
        { name: 'Масло вершкове', amount: 150, unit: 'г' },
        { name: 'Цукор', amount: 150, unit: 'г' },
        { name: 'Яйце', amount: 3, unit: 'шт' },
        { name: 'Борошно', amount: 120, unit: 'г' }
      ],
      steps: [
        { order: 1, title: 'Розтоплення шоколаду', text: 'Розтопити шоколад з маслом.' },
        { order: 2, title: 'Заміс тіста', text: 'Додати цукор, яйця та борошно.' },
        { order: 3, title: 'Випікання', text: 'Випікати у формі 25–30 хвилин.' }
      ]
    },
    {
      title: 'Запечена картопля з часником',
      description: 'Проста та ароматна картопля в духовці.',
      timeMinutes: 35,
      servings: 3,
      difficulty: 'Легко',
      ingredients: [
        { name: 'Картопля', amount: 600, unit: 'г' },
        { name: 'Часник', amount: 3, unit: 'зубчики' },
        { name: 'Олія', amount: 30, unit: 'мл' }
      ],
      steps: [
        { order: 1, title: 'Підготовка картоплі', text: 'Нарізати картоплю часточками.' },
        { order: 2, title: 'Маринування', text: 'Додати олію, часник, сіль та спеції.' },
        { order: 3, title: 'Запікання', text: 'Запікати до золотистої скоринки.' }
      ]
    }
  ];

  // Зробимо з них ~20 рецептів (варіанти)
  const recipeDocsToInsert = [];

  baseRecipes.forEach((base) => {
    recipeDocsToInsert.push(base); // оригінал

    // Вариант 2
    recipeDocsToInsert.push({
      ...base,
      title: base.title + ' (швидкий варіант)',
      timeMinutes: Math.max(10, base.timeMinutes - randInt(5, 15)),
      description: base.description + ' Швидша версія з невеликими спрощеннями.'
    });

    // Варіант 3
    recipeDocsToInsert.push({
      ...base,
      title: base.title + ' (святковий варіант)',
      timeMinutes: base.timeMinutes + randInt(5, 20),
      description: base.description + ' Підійде для святкового столу.'
    });
  });

  // Тепер роздаємо автора та дрібні варіації
  const difficultyOptions = ['Легко', 'Помірно', 'Складно'];

  const recipeDocsWithAuthors = recipeDocsToInsert.map((r) => {
    const author = pickRandom(users);
    const diff =
      r.difficulty || pickRandom(difficultyOptions);

    return {
      ...r,
      difficulty: diff,
      author: author._id,
      imageUrl: null
    };
  });

  const recipes = await Recipe.insertMany(recipeDocsWithAuthors);
  console.log(`🍲 Recipes created: ${recipes.length}`);

  // ---------- 3. PLAYLISTS ----------
  const playlistsToInsert = [];

  // Кожному юзеру зробимо по 1–2 плейлисти
  for (const user of users) {
    const playlistCount = randInt(1, 2);
    for (let i = 0; i < playlistCount; i++) {
      const someRecipes = pickRandomMany(recipes, randInt(3, 7));
      playlistsToInsert.push({
        name: `Улюблені страви ${user.username} #${i + 1}`,
        description: 'Автоматично згенерований плейлист для тестових даних.',
        owner: user._id,
        recipes: someRecipes.map((r) => r._id),
        likesCount: 0
      });
    }
  }

  // Додаткові тематичні плейлисти
  const quickRecipes = recipes.filter((r) => r.timeMinutes <= 30);
  const desserts = recipes.filter((r) =>
    r.title.toLowerCase().includes('шоколад') ||
    r.title.toLowerCase().includes('млинці') ||
    r.title.toLowerCase().includes('брауні')
  );

  if (quickRecipes.length >= 3) {
    playlistsToInsert.push({
      name: 'Швидкі страви до 30 хв',
      description: 'Колекція найшвидших рецептів.',
      owner: pickRandom(users)._id,
      recipes: pickRandomMany(quickRecipes, Math.min(6, quickRecipes.length)),
      likesCount: 0
    });
  }

  if (desserts.length >= 3) {
    playlistsToInsert.push({
      name: 'Десерти та солодке',
      description: 'Підбірка десертів до чаю.',
      owner: pickRandom(users)._id,
      recipes: pickRandomMany(desserts, Math.min(6, desserts.length)),
      likesCount: 0
    });
  }

  const playlists = await Playlist.insertMany(playlistsToInsert);
  console.log(`🎧 Playlists created: ${playlists.length}`);

  // ---------- 4. REVIEWS ----------
  const reviewDocs = [];

  // Для кожного рецепта 1–4 відгуки
  for (const recipe of recipes) {
    const reviewCount = randInt(1, 4);
    const reviewAuthors = pickRandomMany(users, Math.min(reviewCount, users.length));

    reviewAuthors.forEach((user) => {
      const rating = randInt(3, 5);
      const texts = [
        'Дуже смачно, буду готувати ще!',
        'Непоганий рецепт, трішки змінив під себе.',
        'Все вийшло з першого разу.',
        'Дуже сподобалось всій родині!',
        'Було трохи складно, але результат того вартий.'
      ];
      reviewDocs.push({
        recipe: recipe._id,
        author: user._id,
        rating,
        text: pickRandom(texts)
      });
    });
  }

  const reviews = await Review.insertMany(reviewDocs);
  console.log(`⭐ Reviews created: ${reviews.length}`);

  // ---------- 5. Оновлюємо рейтинг рецептів (ratingAverage, ratingCount) ----------
  const ratingStats = await Review.aggregate([
    {
      $group: {
        _id: '$recipe',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  for (const stat of ratingStats) {
    await Recipe.updateOne(
      { _id: stat._id },
      {
        $set: {
          ratingAverage: stat.avgRating,
          ratingCount: stat.count
        }
      }
    );
  }
  console.log('📊 Recipe ratings recalculated');

  // ---------- 6. Лайки рецептів і плейлистів + savedInPlaylistRecipes ----------
  const recipeLikesMap = {};
  const playlistLikesMap = {};

  // Для кожного юзера рандомно лайкаємо рецепти й плейлисти
  for (const user of users) {
    const likedRecipes = pickRandomMany(recipes, randInt(5, 12));
    const likedPlaylists = pickRandomMany(playlists, randInt(2, 6));

    likedRecipes.forEach((r) => {
      const id = r._id.toString();
      recipeLikesMap[id] = (recipeLikesMap[id] || 0) + 1;
    });

    likedPlaylists.forEach((p) => {
      const id = p._id.toString();
      playlistLikesMap[id] = (playlistLikesMap[id] || 0) + 1;
    });

    // savedInPlaylistRecipes — всі рецепти, які є в плейлистах цього юзера
    const ownedPlaylists = playlists.filter((pl) =>
      pl.owner.toString() === user._id.toString()
    );

    const savedSet = new Set();

    ownedPlaylists.forEach((pl) => {
      // ВИПРАВЛЕНО: перевіряємо, чи це об'єкт чи ID, щоб не додавати сміття
      (pl.recipes || []).forEach((item) => {
        const id = item._id ? item._id.toString() : item.toString();
        savedSet.add(id);
      });
    });

    user.likedRecipes = likedRecipes.map((r) => r._id);
    user.likedPlaylists = likedPlaylists.map((p) => p._id);
    user.savedInPlaylistRecipes = Array.from(savedSet);
    await user.save();
  }

  // Оновлюємо likesCount на Recipe
  for (const recipe of recipes) {
    const id = recipe._id.toString();
    const count = recipeLikesMap[id] || 0;
    recipe.likesCount = count;
    await recipe.save();
  }

  // Оновлюємо likesCount на Playlist
  for (const playlist of playlists) {
    const id = playlist._id.toString();
    const count = playlistLikesMap[id] || 0;
    playlist.likesCount = count;
    await playlist.save();
  }

  console.log('👍 Likes for recipes & playlists updated');

  console.log('✅ SEED FINISHED');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});