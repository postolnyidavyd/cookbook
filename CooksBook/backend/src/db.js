const mongoose = require('mongoose');
const { MONGO_URL } = require('./config');
function connectDB() {
  //відкидування полів в запитах, які не визначені в схемі
  mongoose.set('strictQuery', true);
  mongoose.connection.on('connected', () => console.log('Mongo connected'));
  mongoose.connection.on('error', (e) => console.error('Mongo error:', e));

  return mongoose.connect(MONGO_URL, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000, //час для конекту
  });
}
module.exports = { connectDB };
