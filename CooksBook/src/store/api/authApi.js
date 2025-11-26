import { apiSlice } from './apiSlice.js';
import { setCredentials, logout } from '../authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // { accessToken, user }
          dispatch(setCredentials(data));
        } catch {}
      },
      invalidatesTags: ['Me']
    }),

    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {}
      },
      invalidatesTags: ['Me']
    }),

    getMe: builder.query({
      query: () => ({ url: '/auth/me', method: 'GET' }),
      providesTags: ['Me']
    }),

    updateMe: builder.mutation({
      query: (formData) => ({
        url: '/auth/me',
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['Me']
    }),

    logoutUser: builder.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },
      invalidatesTags: ['Me', 'RecipeList', 'PlaylistList', 'Playlist']
    })
  }),
  overrideExisting: false
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useLogoutUserMutation
} = authApi;
