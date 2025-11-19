import styled from 'styled-components';
import { useLoaderData } from 'react-router-dom';
import { Display } from '../ui/texts/Display.jsx';
import { Container, PageContainer } from '../ui/Container.jsx';
import HeroComponent from '../components/RecipePlaylistDetailComponents/HeroSection/HeroComponent.jsx';
import PlaylistSideBar from '../components/RecipePlaylistDetailComponents/HeroSection/PlaylistSideBar.jsx';
import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { RECIPES_MOCK } from '../shared/utils/mockData.js';

const PlaylistDetailsPage = () => {
  const { title, subtitle, cover, author, tags, views, recipeCount } =
    useLoaderData();
  return (
      <PageContainer $padding="0 2rem 0 5rem" $margin="0 0 5rem 0">
        <HeroComponent title={title} description={subtitle} image={cover}>
          <PlaylistSideBar
            avatar={author.avatar}
            authorName={author.name}
            recipeCount={recipeCount}
            views={views}
            tags={tags}
          />
        </HeroComponent>
        <BrowserLayout recipes={RECIPES_MOCK} type="recipe" maxNumberOfCards={12} padding="5rem 0rem"/>
      </PageContainer>
  );
};
export default PlaylistDetailsPage;
