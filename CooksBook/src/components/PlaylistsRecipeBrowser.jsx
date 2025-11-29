import BrowserLayout from './BrowserLayout/BrowserLayout.jsx';
import { RecipeFilter } from './BrowserLayout/RecipeFilter.jsx';
import { Tags } from './BrowserLayout/Tags.jsx';
import PageNavigation from './CardFeed/PageNavigation.jsx';
import DataRenderer from './BrowserLayout/DataRenderer.jsx';
import { RecipeCard } from './Cards/RecipeCard.jsx';
import { useFilterParams } from '../shared/hooks/useFilterParams.js';
import { useGetRecipesQuery } from '../store/api/recipesApi.js';

const PlaylistsRecipeBrowser = ({ filters }) => {
  const { queryParams, handleParamChange, getListParam } =
    useFilterParams(filters);

  const { data, isLoading, isFetching, isError, error } =
    useGetRecipesQuery(queryParams);

  const { items = [], totalPages = 1, page = 1 } = data || {};

  const ingredients = getListParam('ingredients');
  return (
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
        renderItemFn={(recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        )}
      />
    </BrowserLayout>
  );
};
export default PlaylistsRecipeBrowser