import HeroCarousel from '../components/Carousel/HeroCarousel/HeroCarousel.jsx';
import { Container, PageContainer } from '../ui/styledBlocks/Container.jsx';
import { Display } from '../ui/texts/Display.jsx';
import MainPageRecipes from '../components/MainPageRecipes/MainPageRecipes.jsx';
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
