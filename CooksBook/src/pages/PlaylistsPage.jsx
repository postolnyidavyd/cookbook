import BrowserLayout from '../components/RecipePlaylistBrowser/BrowserLayout/BrowserLayout.jsx';
import { Container, PageContainer } from '../ui/styledBlocks/Container.jsx';
import { useFilterParams } from '../shared/hooks/useFilterParams.js';
import { useGetPlaylistsQuery } from '../store/api/playlistApi.js';
import { Tags } from '../components/RecipePlaylistBrowser/Tags/Tags.jsx';
import PageNavigation from '../components/RecipePlaylistBrowser/PageNavigation/PageNavigation.jsx';
import DataRenderer from '../components/RecipePlaylistBrowser/DataRenderer/DataRenderer.jsx';
import { PlayListFilter } from '../components/RecipePlaylistBrowser/PlaylistFilter/PlayListFilter.jsx';
import { PlaylistCard } from '../components/Cards/PlaylistCard/PlaylistCard.jsx';
const DEFAULT_FILTERS = {
  page: 1,
  limit: 12,
  input: '',
  tags: '',
  sortBy: 'popularity',
}
const PlaylistsPage = () => {
  const {queryParams,handleParamChange,getListParam}= useFilterParams(DEFAULT_FILTERS);
  const {data,isLoading,isFetching, isError, error} = useGetPlaylistsQuery(queryParams);
  const { items = [], totalPages = 1, page = 1 } = data || {};
  const tags = getListParam("tags");
  return (
  <PageContainer $padding="0 5rem">
    <BrowserLayout
      padding="5rem 0"
      filterSlot={
        <PlayListFilter values={queryParams} onChange={handleParamChange} />
      }
      tagsSlot={
        <Tags
          tags={tags}
          onChange={handleParamChange}
          filterKey={'tags'}
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
        renderItemFn={(playlist) => <PlaylistCard playlist={playlist} key={playlist.id}/>}
      />
    </BrowserLayout>
  </PageContainer>
  );
};

export default PlaylistsPage;
