import { createSelector } from '@reduxjs/toolkit';
//Базові селектори
export const selectAuth = (state) => state.auth;
export const selectIsAuth = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

//Селектори юсера
export const selectToken = (state) => selectUser(state).token || null;
export const selectEmail = state => selectUser(state).email || null;
export const selectUserName = state => selectUser(state).userName || null;
export const selectAvatar = state => selectUser(state).avatar || null;

export const selectLikedRecipesIds = (state) =>
  state.auth.user.likedRecipes || [];
export const selectLikedPlaylistsIds = (state) =>
  state.auth.user.likedPlaylists || [];
export const selectSavedInPlaylistRecipesIds = (state) =>
  state.auth.user.savedInPlaylistRecipes;

//Меморізовані селектори
export const selectLikedRecipesIdsSet = createSelector(
  selectLikedRecipesIds,
  (ids) => new Set(ids)
);
export const selectLikedPlaylistsIdsSet = createSelector(
  selectLikedPlaylistsIds,
  (ids) => new Set(ids)
);
export const selectSavedInPlaylistRecipesIdsSet = createSelector(
  selectSavedInPlaylistRecipesIds,
  (ids) => new Set(ids)
);
