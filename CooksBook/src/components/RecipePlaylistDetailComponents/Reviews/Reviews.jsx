import {
  Rating,
  Section,
  SectionTitle,
} from '../SharedComponents/SharedComponents.jsx';
import { Wrapper } from '../../../ui/Wrapper.jsx';
import { FocusButton } from '../../../ui/buttons/FocusButton.jsx';
import styled from 'styled-components';
import { Review } from './Review.jsx';

const Reviews = ({ reviews, rating }) => {
  return (
    <Section>
      <SectionTitle>Відгуки</SectionTitle>
      <StatsRow>
        <StatBlock>
          <StatLabel>Кількість відгуків</StatLabel>
          <StatValue>{reviews.length}</StatValue>
        </StatBlock>
        <StatBlock>
          <StatLabel>Середній рейтинг</StatLabel>
          <Wrapper $gap="2">
            <StatValue>{rating}</StatValue>
            <Rating rating={rating} />
          </Wrapper>
        </StatBlock>
      </StatsRow>
      <ReviewsList>
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ReviewsList>
    </Section>
  );
};
const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
`;


const ReviewsList = styled.ol`
  list-style-type: none;
  counter-reset: step-counter;
  margin-top: 1.5rem;
`;
const StatLabel = styled.h3`
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
`;
const StatValue = styled.h2`
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
`;
const StatBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
const StatsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; /* центрує весь блок по горизонталі */
  gap: 6rem; /* відстань між двома колонками */
  margin: 2rem 0;
`;
export default Reviews