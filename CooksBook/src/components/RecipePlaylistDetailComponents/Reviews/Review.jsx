import {
  BigAvatarImage,
  Rating,
  Section,
  Username,
} from '../SharedComponents/SharedComponents.jsx';
import { FocusButton } from '../../../ui/buttons/FocusButton.jsx';
import styled from 'styled-components';
import { Wrapper } from '../../../ui/Wrapper.jsx';
import { generateUrl } from '../../../shared/utils/generateUrl.js';

export const Review = ({ review }) => {
  const { rating, text, author } = review;
  const {name, avatar} = author;

  return (
    <ReviewLi>
      <Wrapper $margin="0 0 0.5rem 0">
        <BigAvatarImage src={generateUrl(avatar)} alt={author} />
        <div>
          <Username>{name}</Username>
          <Rating rating={rating} small />
        </div>
      </Wrapper>
      <Comment>{text}</Comment>
    </ReviewLi>
  );
};
const ReviewLi = styled.li`
  list-style: none;
  margin-bottom: 1.5rem ;
`;
const Comment = styled.p`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`;