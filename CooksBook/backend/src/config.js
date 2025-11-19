require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
  IS_PROD: process.env.NODE_ENV === 'production',

  ACCESS_EXPIRES: '15m',
  REFRESH_EXPIRES: '30d'
}