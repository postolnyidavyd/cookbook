import React from 'react';
import Carousel from '../components/Carousel/Carousel.jsx';
import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { PlaylistCarousel } from '../components/Carousel/PlaylistCarousel.jsx';
import { PLAYLISTS_MOCK, RECIPES_MOCK } from '../shared/utils/mockData.js';

const MainPage = ({ onNavigate }) => {
  return (
    <>
      <Carousel />
      <BrowserLayout
        type="recipe"
        maxNumberOfCards={6}
        recipes={RECIPES_MOCK}
        showPageNavigation={false}
      />
      <PlaylistCarousel
        title="Популярні плейлисти"
        playlists={PLAYLISTS_MOCK}
        visibleCount={4}
      />
    </>
  );
};

export default MainPage;
