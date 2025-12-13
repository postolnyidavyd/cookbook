import { useState } from 'react';
import styled from 'styled-components';
import { PlaylistCard } from '../../../Cards/PlaylistCard/PlaylistCard.jsx';
import leftArrow from '../../../../assets/arrowLeft.svg';
import rightArrow from '../../../../assets/arrowRight.svg';
import { NavButton } from '../../../../ui/buttons/NavButton.jsx';
import { RecipeCard } from '../../../Cards/RecipeCard/RecipeCard.jsx';
import { SkeletonCard } from '../../../Cards/SkeletonCard/SkeletonCard.jsx';

export const CardCarousel = ({
  children,
  data,
  isFetching,
  isError,
  error,
  type = 'playlist',
  alignChildren = 'space-between',
}) => {
  const [index, setIndex] = useState(0);

  // Безпечна перевірка довжини
  const itemsLength = data?.length || 0;
  const visibleCount = 3;
  const maxIndex = Math.max(0, itemsLength - visibleCount);

  const handleNext = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };
  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const prevDisabled = index === 0;
  const nextDisabled = index >= maxIndex;

  const showNavigation = itemsLength > visibleCount && !isFetching;

  let content = null;
  if (isFetching) {
    //Рендеримо 3 скелети
    content = (
      <Viewport data-testid="carousel-track">
        <Track>
          {Array.from({ length: visibleCount }).map((_, i) => (
            <Slide key={i} $visibleCount={visibleCount}>
              <SkeletonCard />
            </Slide>
          ))}
        </Track>
      </Viewport>
    );
  } else if (isError) {
    content = (
      <ErrorState>
        <p>{error?.data?.message || 'Не вдалося завантажити дані.'}</p>
      </ErrorState>
    );
  } else if (itemsLength > 0) {
    content = (
      <Viewport>
        <Track
          data-testid="carousel-track"
          style={{
            transform: `translateX(-${(100 / visibleCount) * index}%)`,
          }}
        >
          {data.map((item) => (
            <Slide key={item.id} $visibleCount={visibleCount}>
              {type === 'playlist' ? (
                <PlaylistCard playlist={item} />
              ) : (
                <RecipeCard recipe={item} />
              )}
            </Slide>
          ))}
        </Track>

        {showNavigation && (
          <>
            <NavButton
              $variant="ghost"
              $left="1.5rem"
              $top="50%"
              onClick={handlePrev}
              disabled={prevDisabled}
            >
              <img src={leftArrow} alt="Попередній" />
            </NavButton>
            <NavButton
              $variant="ghost"
              $right="1.5rem"
              $top="50%"
              onClick={handleNext}
              disabled={nextDisabled}
            >
              <img src={rightArrow} alt="Наступний" />
            </NavButton>
          </>
        )}
      </Viewport>
    );
  } else {
    content = <Empty>Немає елементів</Empty>;
  }
  return (
    <section>
      {children && <Header $alignChildren={alignChildren}>{children}</Header>}
      {content}
    </section>
  );
};

const Empty = styled.div`
  text-align: center;
  padding: 3rem;
  color: #757575;
  border-radius: 1rem;
  font-size: 2rem;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #d32f2f;
  border-radius: 1rem;
  font-weight: 500;
`;

const Header = styled.div`
  display: flex;
  justify-content: ${({ $alignChildren }) => $alignChildren};
  align-items: center;
  margin-bottom: 1rem;
`;

const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 -0.75rem;
  padding: 1rem 0;
`;

const Track = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const Slide = styled.div`
  flex: 0 0 calc(100% / ${({ $visibleCount }) => $visibleCount});
  padding: 0 0.75rem;
  box-sizing: border-box;
`;
