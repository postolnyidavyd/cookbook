import {
  Description,
  Rating,
  Section,
  SectionTitle,
} from '../SharedComponents/SharedComponents.jsx';
import { FocusButton } from '../../../ui/buttons/FocusButton.jsx';
import styled from 'styled-components';

const ReviewForm = () => {
  return (
    <Section>
      <SectionTitle>Залиште відгук</SectionTitle>
      <ReviewFormLayout>
        <Rating rating={0} />
        <Description>Що вам сподобалося?</Description>
        <ReviewTextArea />
        <FocusButton>Надіслати відгук</FocusButton>
      </ReviewFormLayout>
    </Section>
  );
};

const ReviewTextArea = styled.textarea`
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  aspect-ratio: 4/1;
`;
const ReviewTextarea = styled.textarea``;
const ReviewFormLayout = styled.form`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #b2bba2;
  margin: 1.25rem 5rem;
`;
export default ReviewForm