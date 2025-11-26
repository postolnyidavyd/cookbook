import {
  BigAvatarImage,
  Rating,
  Section,
  Username,
} from '../SharedComponents/SharedComponents.jsx';
import { FocusButton } from '../../../ui/buttons/FocusButton.jsx';
import styled from 'styled-components';
import { Wrapper } from '../../../ui/Wrapper.jsx';

export const Review = ({ review }) => {
  console.log(review);
  const { author, rating, comment, avatar } = review;

  return (
    <li>
      <Wrapper $margin="0 0 0.5rem 0">
        <BigAvatarImage src={avatar} alt={author} />
        <div>
          <Username>{author}</Username>
          <Rating rating={rating} small />
        </div>
      </Wrapper>
      <Comment>{comment}</Comment>
    </li>
  );
};
const ReviewLi = styled.li`
  list-style: none;
`;
const Comment = styled.p`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`;