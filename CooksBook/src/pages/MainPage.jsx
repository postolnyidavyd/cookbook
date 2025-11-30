import React from 'react';
import HeroCarousel from '../components/Carousel/HeroCarousel/HeroCarousel.jsx';
import BrowserLayout from '../components/RecipePlaylistBrowser/BrowserLayout/BrowserLayout.jsx';
import { CardCarousel } from '../components/Carousel/CardCarousels/BaseCarousel/CardCarousel.jsx';
import { PLAYLISTS_MOCK, RECIPES_MOCK } from '../shared/utils/mockData.js';
import { Container, PageContainer } from '../ui/styledBlocks/Container.jsx';
import { Display } from '../ui/texts/Display.jsx';
import MainPageRecipes from '../components/MainPageRecipes.jsx';
import RecipeCarouselSection from '../components/Carousel/CardCarousels/CarouselWrappers/RecipeCarouselSection.jsx';
import PlaylistCarouselSection from '../components/Carousel/CardCarousels/CarouselWrappers/PlaylistCarouselSection.jsx';
const MainPage = () => {
  return (
    <PageContainer>
      <HeroCarousel />
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
