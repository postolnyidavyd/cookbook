import { createSelector } from '@reduxjs/toolkit';


const EMPTY_ARRAY = [];
//Базові селектори
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
//Селектори юзера
export const selectEmail = (state) => state.auth.user?.email ?? null;
export const selectUserName = (state) => state.auth.user?.username ?? null;
export const selectAvatar = (state) => state.auth.user?.avatar ?? null;
export const selectUserId = state => state.auth.user?.id ?? null;

//Селектори вподобаних/збережених рецептів/плейлистів
export const selectLikedRecipesIds = (state) =>
  state.auth.user?.likedRecipes ?? EMPTY_ARRAY;

export const selectLikedPlaylistsIds = (state) =>
  state.auth.user?.likedPlaylists ?? EMPTY_ARRAY;

export const selectSavedInPlaylistRecipesIds = (state) =>
  state.auth.user?.savedInPlaylistRecipes ?? EMPTY_ARRAY;

// Меморізовані селектори
export const selectLikedRecipesIdsSet = createSelector(
  [selectLikedRecipesIds], // Краще брати в масив, хоча працює і так
  (ids) => new Set(ids)
);
export const selectLikedPlaylistsIdsSet = createSelector(
  [selectLikedPlaylistsIds],
  (ids) => new Set(ids)
);
export const selectSavedInPlaylistRecipesIdsSet = createSelector(
  [selectSavedInPlaylistRecipesIds],
  (ids) => new Set(ids)
);
