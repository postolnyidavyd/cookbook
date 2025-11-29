import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  user: {
    id: null,
    email: null,
    username: null,
    avatar: null,
    likedRecipes: [],
    likedPlaylists: [],
    savedInPlaylistRecipes:[],
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setCredentials(state, action) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLikeRecipe(state, action) {
      const { recipeId, like } = action.payload;
      const list = state.user.likedRecipes;
      const index = list.indexOf(recipeId);

      if (like) {
        // Хочемо додати лайк. Перевіряємо, чи його ще немає, щоб не було дублів
        if (index === -1) {
          list.push(recipeId);
        }
      } else {
        if (index !== -1) {
          list.splice(index, 1);
        }
      }
    },
    setLikePlaylist(state, action) {
      const { playlistId, like } = action.payload;
      const list = state.user.likedPlaylists;
      const index = list.indexOf(playlistId);

      if (like) {
        if (index === -1) {
          list.push(playlistId);
        }
      } else {
        if (index !== -1) {
          list.splice(index, 1);
        }
      }
    },
    setSavedInPlaylist(state, action) {
      const { recipeId, present } = action.payload;

      const list = state.user.savedInPlaylistRecipes;
      const index = list.indexOf(recipeId);

      if (present) {
        if (index === -1) {
          list.push(recipeId);
        }
      } else {
        if (index !== -1) {
          list.splice(index, 1);
        }
      }
    },
    toggleSaveInPlaylist(state, action) {
      const recipeId = action.payload;
      const index = state.user.savedInPlaylistRecipes.indexOf(recipeId);
      if (index !== -1) {
        state.user.savedInPlaylistRecipes.splice(index, 1);
      } else {
        state.user.savedInPlaylistRecipes.push(recipeId);
      }
    },
    logout(state) {
      return initialState;
    },
  },
});

export const {
  setAccessToken,
  setCredentials,
  setUser,
  setLikeRecipe,
  setLikePlaylist,
  setSavedInPlaylist,
  toggleSaveInPlaylist,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
