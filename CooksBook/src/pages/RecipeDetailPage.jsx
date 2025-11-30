import { useLoaderData, useParams } from 'react-router-dom';
import { PageContainer } from '../ui/Container.jsx';

import HeroComponent from '../components/RecipePlaylistDetailComponents/HeroSection/HeroComponent.jsx';
import RecipeSideBar from '../components/RecipePlaylistDetailComponents/HeroSection/RecipeSideBar.jsx';
import Ingredients from '../components/RecipePlaylistDetailComponents/Ingredients/Ingredients.jsx';
import CookingSteps from '../components/RecipePlaylistDetailComponents/CookingSteps/CookingSteps.jsx';
import ReviewForm from '../components/RecipePlaylistDetailComponents/Reviews/ReviewForm.jsx';
import Reviews from '../components/RecipePlaylistDetailComponents/Reviews/Reviews.jsx';
import { useGetRecipeByIdQuery } from '../store/api/recipesApi.js';
import LoadingPage from './LoadingPage.jsx';
import { generateUrl } from '../shared/utils/generateUrl.js';

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const { data, isLoading, isError, error } = useGetRecipeByIdQuery(recipeId);
  const {
    id,
    title,
    cover,
    description,
    time,
    servings,
    difficulty,
    rating,
    author,
    ingredients,
    steps,
    reviews,
  } = data || {};

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <PageContainer $padding="0 2rem 0 5rem" $margin="0 0 5rem 0">
      <HeroComponent
        title={title}
        image={generateUrl(cover)}
        description={description}
      >
        <RecipeSideBar
          recipeId={id}
          time={time}
          avatar={generateUrl(author.avatar)}
          authorName={author.name}
          rating={rating}
          difficulty={difficulty}
        />
      </HeroComponent>
      <Ingredients ingredients={ingredients} defaultServings={servings} />
      <CookingSteps steps={steps} />
      <ReviewForm recipeId={id}/>
      <Reviews reviews={reviews} rating={rating} />
    </PageContainer>
  );
};
export default RecipeDetailPage;
