import { apiSlice } from './apiSlice.js';

export const playlistsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylists: builder.query({
      query: (params) => ({
        url: '/playlists',
        method: 'GET',
        params
      }),
      providesTags: (result) =>
        result?.items
          ? [
            ...result.items.map((p) => ({ type: 'Playlist', id: p.id })),
            { type: 'PlaylistList', id: 'LIST' }
          ]
          : [{ type: 'PlaylistList', id: 'LIST' }]
    }),

    getPlaylistById: builder.query({
      query: (id) => ({ url: `/playlists/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Playlist', id }]
    }),

    createPlaylist: builder.mutation({
      query: (body) => ({
        url: '/playlists',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'PlaylistList', id: 'LIST' }]
    }),

    updatePlaylist: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/playlists/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Playlist', id },
        { type: 'PlaylistList', id: 'LIST' }
      ]
    }),

    deletePlaylist: builder.mutation({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Playlist', id },
        { type: 'PlaylistList', id: 'LIST' }
      ]
    }),

    likePlaylist: builder.mutation({
      query: ({ id, like }) => ({
        url: `/playlists/${id}/like`,
        method: 'POST',
        body: { like }
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Playlist', id },
        { type: 'PlaylistList', id: 'LIST' }
      ]
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
