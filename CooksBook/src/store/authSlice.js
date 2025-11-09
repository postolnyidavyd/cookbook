import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {
    token: null,
    username: null,
    email: null,
    savedRecipes: [],
    savedPlaylists: [],
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }) {
      state.isAuthenticated = true;
      const { token, userName, email, savedRecipes, savedPlaylists } = payload;
      state.user.token = token;
      state.user.username = userName;
      state.user.email = email;
      state.user.savedRecipes = savedRecipes;
      state.user.savedPlaylists = savedPlaylists;
    },
    logout(state) {
      return initialState;
    }
  },

});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;