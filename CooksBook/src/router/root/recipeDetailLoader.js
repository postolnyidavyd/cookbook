import { RECIPE_DETAIL_MOCK } from '../../shared/utils/mockData.js';
import store from '../../store/store.js';
import { recipesApi } from '../../store/api/recipesApi.js';

const recipeDetailLoader = async ({ params }) => {
  const { recipeId } = params;
  store.dispatch(recipesApi.endpoints.getRecipeById.initiate(recipeId))

  return null;// Бо читаємо дані з useGetRecipeByIdQuery
};
export default recipeDetailLoader;