import React from 'react';
import Carousel from '../components/Carousel/Carousel.jsx';
import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { CardCarousel } from '../components/Carousel/CardCarousel.jsx';
import { PLAYLISTS_MOCK, RECIPES_MOCK } from '../shared/utils/mockData.js';
import { Container, PageContainer } from '../ui/Container.jsx';
import { Display } from '../ui/texts/Display.jsx';
import MainPageRecipes from '../components/MainPageRecipes.jsx';
import RecipeCarouselSection from '../components/Carousel/RecipeCarouselSection.jsx';
import PlaylistCarouselSection from '../components/Carousel/PlaylistCarouselSection.jsx';
const MainPage = () => {
  return (
    <PageContainer>
      <Carousel />
      <Container $padding="0 5rem" $margin="0 0 5rem">
        <MainPageRecipes />
        <PlaylistCarouselSection
          queryParams={{
            limit: 10,
            sortBy: 'viewsAmount',
          }}
          alignChildren="center"
        >
          <Display>Популярні плейлисти</Display>
        </PlaylistCarouselSection>
      </Container>
    </PageContainer>
  );
};

export default MainPage;
