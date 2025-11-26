import { useParams } from 'react-router-dom';
import { Container, PageContainer } from '../ui/Container.jsx';
import HeroComponent from '../components/RecipePlaylistDetailComponents/HeroSection/HeroComponent.jsx';
import PlaylistSideBar from '../components/RecipePlaylistDetailComponents/HeroSection/PlaylistSideBar.jsx';
import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { RECIPES_MOCK } from '../shared/utils/mockData.js';
import { useGetPlaylistByIdQuery } from '../store/api/playlistApi.js';
import LoadingPage from './LoadingPage.jsx';
import PlaylistsRecipeBrowser from '../components/PlaylistsRecipeBrowser.jsx';
import { generateUrl } from '../shared/utils/generateUrl.js';
import styled from 'styled-components';

const PlaylistDetailsPage = () => {
  const { playlistId } = useParams();

  const { data, isLoading } = useGetPlaylistByIdQuery(playlistId);

  const {
    name,
    description,
    coverImage,
    owner,
    tags = [],
    views,
    recipesCount,
    recipes = [],
  } = data || {};
  const hasRecipes = recipes.length > 0;
  const idsString = hasRecipes ? recipes.join(',') : '';
  const filters = {
    page: 1,
    limit: 12,
    input: '',
    ingredients: '',
    difficulty: '',
    time: '',
    sortBy: 'popularity',
    ids: idsString || '',
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <PageContainer $padding="0 2rem 0 5rem" $margin="0 0 5rem 0">
      <HeroComponent
        title={name}
        description={description}
        image={generateUrl(coverImage)}
      >
        <PlaylistSideBar
          playlistId={playlistId}
          avatar={generateUrl(owner.avatar)}
          authorName={owner.name}
          recipesCount={recipesCount}
          views={views}
          tags={tags}
        />
      </HeroComponent>
      {hasRecipes ? (
        <PlaylistsRecipeBrowser filters={filters} />
      ) : (
        <EmptyState>
          <h2>У цьому плейлисті ще немає рецептів</h2>
        </EmptyState>
      )}
    </PageContainer>
  );
};
const EmptyState = styled.div`
  padding: 4rem; 
  align-items: center; 
  color: #757575;
`
export default PlaylistDetailsPage;
