import { apiSlice } from './apiSlice.js';
import { setLikeRecipe, setSavedInPlaylist } from '../authSlice.js';

export const recipesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: (params) => ({
        url: '/recipes',
        method: 'GET',
        params,
      }),
      providesTags: (result, error, arg) => {
        if (arg?.likedBy) {
          // Якщо фільтр по лайках - даємо тег LIKED_LIST
          return [{ type: 'RecipeList', id: 'LIKED_LIST' }];
        } else {
          // Якщо це звичайний каталог - даємо тег MAIN_LIST
          return [{ type: 'RecipeList', id: 'MAIN_LIST' }];
        }
      },
    }),

    getRecipeById: builder.query({
      query: (id) => ({ url: `/recipes/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Recipe', id }],
    }),

    createRecipe: builder.mutation({
      query: (formData) => ({
        url: '/recipes',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [
        { type: 'RecipeList', id: 'MAIN_LIST' },
        // Якщо у вас є фільтр authorId, можна додати логіку і для нього
      ],
    }),

    likeRecipe: builder.mutation({
      query: ({ id, like }) => ({
        url: `/recipes/${id}/like`,
        method: 'POST',
        body: { like },
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: 'RecipeList', id: 'LIKED_LIST' }, // Оновлюємо список вподобаних
      ],

      async onQueryStarted({ id, like }, { dispatch, queryFulfilled }) {
        dispatch(setLikeRecipe({ recipeId: id, like }));
        try {
          await queryFulfilled;
        } catch {
          dispatch(setLikeRecipe({ recipeId: id, like: !like }));
        }
      },
    }),

    addReview: builder.mutation({
      query: ({ id, rating, text }) => ({
        url: `/recipes/${id}/reviews`,
        method: 'POST',
        body: { rating, text },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Recipe', id }],
    }),

    saveRecipeToPlaylists: builder.mutation({
      query: ({ id, playlistIds }) => ({
        url: `/recipes/${id}/save`,
        method: 'POST',
        body: { playlistIds },
      }),

      invalidatesTags: (result, error, { id }) => [{ type: 'Recipe', id }],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setSavedInPlaylist({
              recipeId: data.recipeId,
              present: data.present,
            })
          );
        } catch{}
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useCreateRecipeMutation,
  useLikeRecipeMutation,
  useAddReviewMutation,
  useSaveRecipeToPlaylistsMutation,
} = recipesApi;
