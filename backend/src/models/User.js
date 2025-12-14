const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
      trim: true,
      lowerCase: true,
    },
    passwordHash: { type: String, required: true },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/du3ytr3rx/image/upload/v1765661390/default-avatar_ekcdcn.png",
    },

    tokenVersion: { type: Number, default: 0 },

    likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    likedPlaylists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],

    savedInPlaylistRecipes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
