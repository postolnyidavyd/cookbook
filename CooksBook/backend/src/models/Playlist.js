const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],

    description: {
      type: String,
      default: '',
    },

    coverImage: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    likesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

PlaylistSchema.index({ owner: 1, createdAt: -1 });

PlaylistSchema.index({ createdAt: -1 });
PlaylistSchema.index({ views: -1 });
module.exports = mongoose.model('Playlist', PlaylistSchema);
