import { Wrapper } from '../../../ui/texts/Wrapper.jsx';
import starBigFilled from '../../../assets/starBigFilled.svg';
import starBigUnfilled from '../../../assets/starBigUnfilled.svg';
import styled, { css } from 'styled-components';
import { Difficulty } from '../../Cards/RecipeCard/RecipeCard.jsx';

export const Rating = ({ rating, small = false }) => {
  const filledHeartCount = Math.round(rating);
  const hollowStarsCount = 5 - filledHeartCount;
  return (
    <Wrapper $gap="1">
      {Array.from({ length: filledHeartCount }).map((_, i) => (
        <RatingImage
          key={i}
          src={starBigFilled}
          alt="Заповнена зірка"
          $small={small}
        />
      ))}
      {Array.from({ length: hollowStarsCount }).map((_, i) => (
        <RatingImage
          key={i * 10}
          src={starBigUnfilled}
          alt="Пуста зірка"
          $small={small}
        />
      ))}
    </Wrapper>
  );
};

const RatingImage = styled.img`
  ${({$small}) =>
    $small
      ? css`
          width: 1.5rem;
          height: 1.5rem;
        `
      : css`
          width: 3rem;
          height: 3rem;
        `}
`;
export const MetaImage = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  
`;

export const AvatarImage = styled(MetaImage)`
  border-radius: 50%;
  object-fit: cover;
`;
export const BigAvatarImage = styled(AvatarImage)`
  width: 4rem;
  height: 4rem;
`;
export const DifficultyBigger = styled(Difficulty)`
  height: 2rem;
  width: 2rem;
`;
export const Section = styled.section`
  margin-top: 3rem;
`;
export const SectionTitle = styled.h2`
  font-size: 3rem;
`;
export const Description = styled.h2`
  margin: 1.5rem 0;
  font-size: 2rem;
`;
export const Username = styled.h3`
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
`;