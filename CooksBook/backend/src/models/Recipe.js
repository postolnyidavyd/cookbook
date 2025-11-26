const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: Number },          // опціонально
    unit: { type: String, trim: true } // "г", "мл", "шт" і т.д.
  },
  { _id: false }
);

const StepSchema = new mongoose.Schema(
  {
    title: {type: String, required:true, trim:true},
    text: { type: String, required: true, trim: true },
    imageUrl: { type: String } // (може бути null)
  },
  { _id: false }
);

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: 'text', trim: true },
    description: { type: String },

    timeMinutes: { type: Number, required: true, min: 1 },

    servings: { type: Number, default: 1, min: 1 },

    difficulty: {
      type: String,
      enum: ['Легко', 'Помірно', 'Складно'],
      required: true
    },

    imageUrl: String,

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index:true },


    ingredients: [IngredientSchema],

    steps: [StepSchema],

    // вираховуваний відгук
    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },
    //
    likesCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);
RecipeSchema.index({ likesCount: -1 });
RecipeSchema.index({ ratingAverage: -1 });
RecipeSchema.index({ ratingCount: -1 });

module.exports = mongoose.model('Recipe', RecipeSchema);
