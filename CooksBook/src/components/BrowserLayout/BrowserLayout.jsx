import { Container } from '../../ui/Container.jsx';
import { RecipeFilter } from './RecipeFilter.jsx';
import { PlayListFilter } from './PlayListFilter.jsx';
import { Tags } from './Tags.jsx';
import { RecipeCard } from '../Cards/RecipeCard.jsx';
import { PlaylistCard } from '../Cards/PlaylistCard.jsx';
import styled, { css } from 'styled-components';
import refreshIcon from '../../assets/Refresh cw.svg';
import { Wrapper } from '../../ui/Wrapper.jsx';
import leftArrow from '../../assets/ArrowLeft.svg';
import rightArrow from '../../assets/ArrowRight.svg';

const BrowserLayout = ({
  type,
  maxNumberOfCards,
  recipes = [],
  playlists = [],
  showPageNavigation,
  playlistVariant = 'grid',
}) => {
  const items = type === 'recipe' ? recipes : playlists;
  const limit = Math.max(1, maxNumberOfCards ?? (items.length || 0));

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
      <CardFeed
        type={type}
        items={items}
        limit={limit}
        showPageNavigation={showPageNavigation}
        playlistVariant={playlistVariant}
      />
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
        <PageNavigationButton key={i} $main={i === 0}>
          {i + 1}
        </PageNavigationButton>
      ))}
      <PageNavigationButton>
        <img src={rightArrow} alt="Права стрілка" />
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

const CardFeed = ({ type, items, limit, showPageNavigation = true, playlistVariant }) => {
  const pageCount = Math.max(1, Math.ceil(items.length / limit));

  const showLoadMore = items.length > limit;

  return (
    <>
      <CardGrid>
        {items.slice(0, limit).map((item) =>
          type === 'recipe' ? (
            <RecipeCard key={item.title} recipe={item} />
          ) : (
            <PlaylistCard key={item.title} playlist={item} variant={playlistVariant} />
          ),
        )}
      </CardGrid>
      {showLoadMore && (
        <ShowMoreButton>
          <img src={refreshIcon} alt="Завантажити" /> <p>Показати більше</p>
        </ShowMoreButton>
      )}
      {showPageNavigation && <PageNavigation pageCount={pageCount} />}
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

const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;

export default BrowserLayout;
