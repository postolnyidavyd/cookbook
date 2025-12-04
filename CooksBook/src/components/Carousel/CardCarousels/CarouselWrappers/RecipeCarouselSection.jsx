import { CardCarousel } from '../BaseCarousel/CardCarousel.jsx';
import { useGetRecipesQuery } from '../../../../store/api/recipesApi.js';

const RecipeCarouselSection = ({
  queryParams,
  title,
  children,
  alignChildren,
}) => {
  const { data, isFetching, isError, error } = useGetRecipesQuery(queryParams);
  const items = data?.items || [];

  return (
    <CardCarousel
      type="recipe"
      data={items}
      isFetching={isFetching}
      isError={isError}
      error={error}
      alignChildren={alignChildren}
    >
      {title && <h2>{title}</h2>}
      {children}
    </CardCarousel>
  );
};
export default RecipeCarouselSection;
