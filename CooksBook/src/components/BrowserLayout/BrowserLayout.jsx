import { Container } from '../../ui/Container.jsx';
import { RecipeFilter } from './RecipeFilter.jsx';
import { PlayListFilter } from './PlayListFilter.jsx';
import { Tags } from './Tags.jsx';
import { RecipeCard } from '../Cards/RecipeCard.jsx';
import styled, { css } from 'styled-components';
import refreshIcon from '../../assets/Refresh cw.svg';
import { Wrapper } from '../../ui/Wrapper.jsx';
import leftArrow from '../../assets/ArrowLeft.svg';
import rightArrow from '../../assets/ArrowRight.svg';
const BrowserLayout = ({
  type,
  maxNumberOfCards,
  recipes,
  showPageNavigation,
}) => {
  return (
    <Container $padding="5rem">
      {type === 'recipe' ? <RecipeFilter /> : <PlayListFilter />}
      <Tags
        tags={
          type === 'recipe'
            ? ['Курка', 'Цибуля', 'Часник']
            : ['Швидко', 'Святкова', 'Вечірка']
        }
      />
      <RecipeFeed
        recipes={recipes}
        maxNumberOfCards={maxNumberOfCards}
        showPageNavigation={showPageNavigation}
      ></RecipeFeed>
    </Container>
  );
};
function PageNavigation({ pageCount }) {
  return (
    <Wrapper>
      <PageNavigationButton>
        <img src={leftArrow} alt="Ліва стрілка" />
      </PageNavigationButton>
      {Array.from({ length: pageCount }).map((_, i) => (
        <PageNavigationButton key={i}> {i}</PageNavigationButton>
      ))}
      <PageNavigationButton>
        <img src={rightArrow} alt="Ліва стрілка" />
      </PageNavigationButton>
    </Wrapper>
  );
}
const PageNavigationButton = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 0.625rem;
  ${({ $main }) =>
    $main
      ? css`
          background-color: #2d4a2f;
          color: #ffffff;
          &:hover {
            background-color: #1e331f;
          }
        `
      : css`
          background-color: #d9d9d9;
          &:hover {
            background-color: #a7b098;
          }
        `}
`;
const RecipeFeed = ({
  recipes,
  maxNumberOfCards,
  showPageNavigation = true,
}) => {
  return (
    <>
      <RecipeGrid>
        {recipes.slice(0, maxNumberOfCards).map((recipe) => (
          <RecipeCard key={recipe.title} recipe={recipe} />
        ))}
      </RecipeGrid>
      <ShowMoreButton>
        <img src={refreshIcon} alt="Завантажити" /> <p>Показати більше</p>
      </ShowMoreButton>
      {showPageNavigation && (
        <PageNavigation pageCount={recipes / maxNumberOfCards} />
      )}
    </>
  );
};
const ShowMoreButton = styled.button`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  margin: 3.75rem auto;
  font-size: 1.5rem;
  font-weight: 600;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;
const RecipeGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;
export default BrowserLayout;
