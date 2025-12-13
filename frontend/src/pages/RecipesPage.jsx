import { useFilterParams } from '../shared/hooks/useFilterParams.js';
import { useGetRecipesQuery } from '../store/api/recipesApi.js';

import BrowserLayout from '../components/RecipePlaylistBrowser/BrowserLayout/BrowserLayout.jsx';
import { PageContainer } from '../ui/styledBlocks/Container.jsx';
import { RecipeFilter } from '../components/RecipePlaylistBrowser/RecipeFilter/RecipeFilter.jsx';
import { Tags } from '../components/RecipePlaylistBrowser/Tags/Tags.jsx';
import DataRenderer from '../components/RecipePlaylistBrowser/DataRenderer/DataRenderer.jsx';
import { RecipeCard } from '../components/Cards/RecipeCard/RecipeCard.jsx';
import PageNavigation from '../components/RecipePlaylistBrowser/PageNavigation/PageNavigation.jsx';
const DEFAULT_FILTERS = {
  page: 1,
  limit: 12,
  input: '',
  ingredients: '',
  difficulty: '',
  time: '',
  sortBy: 'popularity',
};
const RecipesPage = () => {
  const { queryParams, handleParamChange, getListParam } =
    useFilterParams(DEFAULT_FILTERS);
  const { data, isLoading, isFetching, isError, error } =
    useGetRecipesQuery(queryParams);

  const { items = [],  totalPages = 1, page = 1 } = data || {};

  const ingredients = getListParam('ingredients');
  return (
    <PageContainer $padding="0 5rem">
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
          totalPages > 1 && (
            <PageNavigation
              pageCount={totalPages}
              activePage={page}
              onChange={(newPage) => handleParamChange('page', newPage)}
            />
          )
        }
      >
        <DataRenderer
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          data={items}
          skeletonCount={12}
          renderItemFn={(recipe) => <RecipeCard recipe={recipe} key={recipe.id}/>}
        />
      </BrowserLayout>
    </PageContainer>
  );
};

export default RecipesPage;
