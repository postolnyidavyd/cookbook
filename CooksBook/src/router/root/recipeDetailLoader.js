import { RECIPE_DETAIL_MOCK } from '../../shared/utils/mockData.js';

const recipeDetailLoader = async ({ params }) => {
  const { recipeId } = params;
  console.log(recipeId);
  return RECIPE_DETAIL_MOCK;
};
export default recipeDetailLoader;