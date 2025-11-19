import React from 'react';
import Carousel from '../components/Carousel/Carousel.jsx';
import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { PlaylistCarousel } from '../components/Carousel/PlaylistCarousel.jsx';
import { PLAYLISTS_MOCK, RECIPES_MOCK } from '../shared/utils/mockData.js';
import { Container, PageContainer } from '../ui/Container.jsx';
import { Display } from '../ui/texts/Display.jsx';
const MainPage = () => {
  return (
    <PageContainer>
      <Carousel />
      <Container $padding="0 5rem" $margin="0 0 5rem">
        <BrowserLayout
          type="recipe"
          maxNumberOfCards={6}
          recipes={RECIPES_MOCK}
          showPageNavigation={false}
          padding="5rem 0"
        />
        <PlaylistCarousel items={PLAYLISTS_MOCK} visibleCount={3} alignChildren="center">
          <Display>Популярні плейлисти</Display>
        </PlaylistCarousel>
      </Container>
    </PageContainer>
  );
};

export default MainPage;
