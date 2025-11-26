import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAccessToken, logout } from '../authSlice';
const apiUrl = import.meta.env.VITE_API_URL;
const BASE_URL = `${apiUrl}/api`;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState,body }) => {
    const token = getState().auth?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    if (body instanceof FormData) {
      //НЕ ставим бо браузер сам це зробить
    } else {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const isRefreshCall =
      typeof args === 'string'
        ? args.includes('/auth/refresh')
        : args?.url?.includes('/auth/refresh');

    if (!isRefreshCall) {
      const refreshResult = await rawBaseQuery(
        { url: '/auth/refresh', method: 'POST' },
        api,
        extraOptions
      );

      if (refreshResult.data?.accessToken) {
        api.dispatch(setAccessToken(refreshResult.data.accessToken));
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me', 'Recipe', 'RecipeList', 'Playlist', 'PlaylistList'],
  endpoints: () => ({}), // ендпоінти додаю через injectEndpoint
});
