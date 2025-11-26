import { apiSlice } from './apiSlice.js';

export const recipesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: (params) => ({
        url: '/recipes',
        method: 'GET',
        params
      }),
      providesTags: (result) =>
        result?.items
          ? [
            ...result.items.map((r) => ({ type: 'Recipe', id: r.id })),
            { type: 'RecipeList', id: 'LIST' }
          ]
          : [{ type: 'RecipeList', id: 'LIST' }]
    }),

    getRecipeById: builder.query({
      query: (id) => ({ url: `/recipes/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Recipe', id }]
    }),

    createRecipe: builder.mutation({
      query: (formData) => ({
        url: '/recipes',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: [{ type: 'RecipeList', id: 'LIST' }]
    }),

    likeRecipe: builder.mutation({
      query: ({ id, like }) => ({
        url: `/recipes/${id}/like`,
        method: 'POST',
        body: { like }
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Recipe', id },
        { type: 'RecipeList', id: 'LIST' }
      ]
    }),

    addReview: builder.mutation({
      query: ({ id, rating, text }) => ({
        url: `/recipes/${id}/reviews`,
        method: 'POST',
        body: { rating, text }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Recipe', id }]
    }),

    saveRecipeToPlaylists: builder.mutation({
      query: ({ id, playlistIds }) => ({
        url: `/recipes/${id}/save`,
        method: 'POST',
        body: { playlistIds }
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Recipe', id },
        { type: 'PlaylistList', id: 'LIST' }
      ]
    })
  }),
  overrideExisting: false
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useCreateRecipeMutation,
  useLikeRecipeMutation,
  useAddReviewMutation,
  useSaveRecipeToPlaylistsMutation
} = recipesApi;
