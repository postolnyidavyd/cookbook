import { RecipeFilter } from './RecipePlaylistBrowser/RecipeFilter/RecipeFilter.jsx';
import { Tags } from './RecipePlaylistBrowser/Tags/Tags.jsx';
import BrowserLayout from './RecipePlaylistBrowser/BrowserLayout/BrowserLayout.jsx';
import { useGetRecipesQuery } from '../store/api/recipesApi.js';
import styled, { keyframes } from 'styled-components';
import { RecipeCard } from './Cards/RecipeCard/RecipeCard.jsx';
import { Link} from 'react-router-dom';
import refreshIcon from '../assets/refresh.svg';
import { useFilterParams } from '../shared/hooks/useFilterParams.js';
import DataRenderer from './RecipePlaylistBrowser/DataRenderer/DataRenderer.jsx';
const DEFAULT_FILTERS = {
  limit: 6,
  input: '',
  ingredients: '',
  difficulty: '',
  time: '',
  sortBy: 'popularity',
};
const MainPageRecipes = () => {
  const { queryParams, handleParamChange, getListParam, searchParams } =
    useFilterParams(DEFAULT_FILTERS);

  const { data, isLoading, isFetching, isError, error } =
    useGetRecipesQuery(queryParams);
  const { items = [], total = 0 } = data || {};

  const ingredients = getListParam('ingredients');

  return (
    <>
      <BrowserLayout
        padding="5rem 0"
        filterSlot={
          <RecipeFilter values={queryParams} onChange={handleParamChange} />
        }
        tagsSlot={
          <Tags
            tags={ingredients}
            onChange={handleParamChange}
            filterKey={'ingredients'}
          />
        }
        endSlot={
          !isLoading &&
          !isFetching &&
          items.length > 0 &&
          total > 6 && (
            <ShowMore to={`/recipes?${searchParams.toString()}`}>
              <img src={refreshIcon} alt="Завантажити" />
              <p>Показати більше</p>
            </ShowMore>
          )
        }
      >
        <DataRenderer
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          data={items}
          skeletonCount={6}
          renderItemFn={(recipe) => <RecipeCard recipe={recipe} key={recipe.id}/>}
        />
      </BrowserLayout>
    </>
  );
};

const ShowMore = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  border: 0;
  color: inherit;
  background-color: transparent;

  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  margin: 3.75rem auto;

  transition: color 160ms ease;
  &:hover {
    color: #1e1e1e;
  }
`;

const pulse = keyframes`
    0% { background-color: #e0e0e0; }
    50% { background-color: #f5f5f5; }
    100% { background-color: #e0e0e0; }
`;

const SkeletonCard = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 1rem;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: #757575;

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #1e1e1e;
  }
`;

export default MainPageRecipes;
