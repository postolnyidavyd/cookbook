const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
      index: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    text: {
      type: String
    }
  },
  { timestamps: true }
);
//Створюємо власний індекс
//За його допомогою не можуть створювати більше одного відгуку від користувача для кожного рецепту
ReviewSchema.index({ recipe: 1, author: 1 }, { unique: true });

ReviewSchema.index({ recipe: 1, createdAt: -1 });
module.exports = mongoose.model('Review', ReviewSchema);