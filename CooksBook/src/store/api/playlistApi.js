import { apiSlice } from './apiSlice.js';
import { setLikePlaylist } from '../authSlice.js';

export const playlistsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getPlaylists: builder.query({
      query: (params) => ({
        url: '/playlists',
        method: 'GET',
        params
      }),
      providesTags: (result, error, arg) => {
        const tags = result?.items
          ? result.items.map((p) => ({ type: 'Playlist', id: p.id }))
          : [];

        if (arg?.likedBy) {
          tags.push({ type: 'PlaylistList', id: 'LIKED_LIST' });
        } else {
          tags.push({ type: 'PlaylistList', id: 'MAIN_LIST' });
        }

        return tags;
      }
    }),

    getPlaylistById: builder.query({
      query: (id) => ({ url: `/playlists/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Playlist', id }]
    }),

    createPlaylist: builder.mutation({
      query: (formData) => ({
        url: '/playlists',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'PlaylistList', id: 'MAIN_LIST' }]
    }),

    updatePlaylist: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/playlists/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Playlist', id },
        { type: 'PlaylistList', id: 'MAIN_LIST' }
      ]
    }),

    deletePlaylist: builder.mutation({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Playlist', id },
        { type: 'PlaylistList', id: 'MAIN_LIST' },
        { type: 'PlaylistList', id: 'LIKED_LIST' }
      ]
    }),

    likePlaylist: builder.mutation({
      query: ({ id, like }) => ({
        url: `/playlists/${id}/like`,
        method: 'POST',
        body: { like }
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: 'PlaylistList', id: 'LIKED_LIST' }
      ],

      async onQueryStarted({ id, like }, { dispatch, queryFulfilled }) {
        dispatch(setLikePlaylist({ playlistId: id, like }));
        try {
          await queryFulfilled;
        } catch {
          dispatch(setLikePlaylist({ playlistId: id, like: !like }));
        }
      }
    })
  }),
  overrideExisting: false
});

export const {
  useGetPlaylistsQuery,
  useGetPlaylistByIdQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
  useLikePlaylistMutation
} = playlistsApi;