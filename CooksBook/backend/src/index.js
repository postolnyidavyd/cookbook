const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const { connectDB } = require('./db');
const { PORT, FRONTEND_ORIGIN } = require('./config');

// routes
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/uploads');
const recipeRoutes = require('./routes/recipes');
const playlistRoutes = require('./routes/playlists');

async function main() {
  await connectDB();

  const app = express();

  //Для заголовків формування
  app.use(helmet());
  //Для логування http запитів
  app.use(morgan('dev'));
  app.use(express.json());
  //Парсер кукі
  app.use(cookieParser());

  app.use(
    cors({
      origin: FRONTEND_ORIGIN,
      credentials: true
    })
  );

  // статичне віддавання картинок
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  app.use('/api/auth', authRoutes);
  app.use('/api/uploads', uploadRoutes);
  app.use('/api/recipes', recipeRoutes);
  app.use('/api/playlists', playlistRoutes);

  app.use((req, res) => res.status(404).json({ message: 'Not found' }));

  app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
