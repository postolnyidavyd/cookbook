const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
const Playlist = require('../models/Playlist');
const { connectDB } = require('../db');

dotenv.config();

const runMigration = async () => {
  try {
    await connectDB();
    console.log('Успішне підключення до MongoDB');

    console.log('✅ Підключено до MongoDB');

    console.log('------------------------------------------------');
    console.log('🏷  Оновлення плейлистів: додавання поля tags...');

    // 2. Оновлення
    // Фільтр: { tags: { $exists: false } } — вибираємо тільки ті, де поля немає
    // Дія: { $set: { tags: [] } } — встановлюємо пустий масив
    const result = await Playlist.updateMany(
      { tags: { $exists: false } },
      { $set: { tags: [] } }
    );

    console.log(`   -> Знайдено плейлистів без тегів: ${result.matchedCount}`);
    console.log(`   -> Оновлено (додано tags: []): ${result.modifiedCount}`);

    console.log('------------------------------------------------');
    console.log('🎉 Міграцію успішно завершено!');

  } catch (error) {
    console.error('❌ Помилка під час міграції:', error);
  } finally {
    // await mongoose.disconnect();
    console.log('🔌 Відключено від БД');
    process.exit();
  }
};

runMigration();
