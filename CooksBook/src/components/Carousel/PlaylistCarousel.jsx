import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../ui/Container.jsx';
import { PlaylistCard } from '../Cards/PlaylistCard.jsx';
import leftArrow from '../../assets/ArrowLeft.svg';
import rightArrow from '../../assets/ArrowRight.svg';
import { NavButton } from '../../ui/buttons/NavButton.jsx';

export const PlaylistCarousel = ({
  title,
  playlists,
  visibleCount = 3,
  onOpenPlaylist,
}) => {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, playlists.length - visibleCount);

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const disablePrev = index === 0;
  const disableNext = index >= maxIndex;

  const currentEnd = Math.min(index + visibleCount, playlists.length);

  return (
    <Section>
      <InnerContainer $padding="0 5rem">
        <Header>
          <div>
            <Title>{title}</Title>
            <Subtitle>Натхнення від спільноти для будь-якої нагоди</Subtitle>
          </div>
          <Counter>{currentEnd}/{playlists.length}</Counter>
        </Header>
        <Viewport>
          <Track style={{ transform: `translateX(-${(100 / visibleCount) * index}%)` }}>
            {playlists.map((playlist) => (
              <Slide key={playlist.title} $visibleCount={visibleCount}>
                <PlaylistCard
                  playlist={playlist}
                  onOpen={() => onOpenPlaylist?.(playlist)}
                />
              </Slide>
            ))}
          </Track>
          <NavButton
            $variant="ghost"
            $left="1.5rem"
            $top="50%"
            onClick={handlePrev}
            disabled={disablePrev}
          >
            <img src={leftArrow} alt="Попередній плейлист" />
          </NavButton>
          <NavButton
            $variant="ghost"
            $right="1.5rem"
            $top="50%"
            onClick={handleNext}
            disabled={disableNext}
          >
            <img src={rightArrow} alt="Наступний плейлист" />
          </NavButton>
        </Viewport>
      </InnerContainer>
    </Section>
  );
};

const Section = styled.section`
  background: #f4ecd0;
  padding: 4rem 0 5rem;
`;

const InnerContainer = styled(Container)`
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const Title = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 2.4rem;
  font-weight: 700;
  color: #1e331f;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #5a6a5b;
`;

const Counter = styled.span`
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e331f;
`;

const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 -0.75rem;
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
