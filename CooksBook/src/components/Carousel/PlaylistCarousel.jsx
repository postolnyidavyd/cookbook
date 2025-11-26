import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../ui/Container.jsx';
import { PlaylistCard } from '../Cards/PlaylistCard.jsx';
import leftArrow from '../../assets/arrowLeft.svg';
import rightArrow from '../../assets/arrowRight.svg';
import { NavButton } from '../../ui/buttons/NavButton.jsx';
import { RecipeCard } from '../Cards/RecipeCard.jsx';

export const PlaylistCarousel = ({
  children,
  items,
  type = 'playlist',
  alignChildren = 'space-between',
}) => {
  const [index, setIndex] = useState(0);

  const itemsLength = items.length;
  const visibleCount = 3;
  const maxIndex = Math.max(0, items.length - visibleCount);

  const handleNext = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };
  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const prevDisabled = index === 0;
  const nextDisabled = index >= maxIndex;

  return (
    <section>
      {children && <Header $alignChildren={alignChildren}>{children}</Header>}
      {itemsLength > 0 ? (
        <Viewport>
          <Track
            style={{
              transform: `translateX(-${(100 / visibleCount) * index}%)`,
            }}
          >
            {items.map((item) => (
              <Slide key={item.id} $visibleCount={visibleCount}>
                {type === 'playlist' ? (
                  <PlaylistCard playlist={item} />
                ) : (
                  <RecipeCard recipe={item} />
                )}
              </Slide>
            ))}
          </Track>
          <NavButton
            $variant="ghost"
            $left="1.5rem"
            $top="50%"
            onClick={handlePrev}
            disabled={prevDisabled}
          >
            <img src={leftArrow} alt="Попередній плейлист" />
          </NavButton>
          <NavButton
            $variant="ghost"
            $right="1.5rem"
            $top="50%"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            <img src={rightArrow} alt="Наступний плейлист" />
          </NavButton>
        </Viewport>
      ) : (
        <Empty>Немає елементів</Empty>
      )}
    </section>
  );
};
const Empty = styled.p`
  text-align: center;
`;
const Header = styled.div`
  display: flex;
  justify-content: ${({ $alignChildren }) => $alignChildren};
  align-items: center;
  margin-bottom: 1rem;
`;
const Title = styled.h2`
  font-size: 3rem;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #5a6a5b;
`;

const Counter = styled.span`
  font-size: 1.05rem;
  font-weight: 600;
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
