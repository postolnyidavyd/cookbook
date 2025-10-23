import React from 'react';
import Carousel from '../components/Carousel/Carousel.jsx';
import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import {RECIPES_MOCK} from '../shared/utils/mockData.js';

const MainPage = () => {
  return (
    <>
      <Carousel />
      <BrowserLayout type="recipe" maxNumberOfCards="6" recipes={RECIPES_MOCK} showPageNavigation={false}/>

    </>
  );
};

export default MainPage;
