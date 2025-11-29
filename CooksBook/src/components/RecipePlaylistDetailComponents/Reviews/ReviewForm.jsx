import { useState } from 'react';
import styled from 'styled-components';
import {
  Description,
  Section,
  SectionTitle,
} from '../SharedComponents/SharedComponents.jsx';
import { FocusButton } from '../../../ui/buttons/FocusButton.jsx';
import { useAddReviewMutation } from '../../../store/api/recipesApi.js';
import starIcon from '../../../assets/star.svg';
import hollowStarIcon from '../../../assets/starBigUnfilled.svg';
import { Field, InputError } from '../../../ui/inputs/index.js';
const ReviewForm = ({ recipeId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [errors, setErrors] = useState({
    reviewText: null,
    rating: null,
    server: null,
  });
  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (rating === 0) {
      newErrors.rating = 'Додайте рейтинг';
    }
    if (!reviewText.trim()) {
      newErrors.reviewText = 'Додайте текст відгуку';
    }
    if (Object.entries(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await addReview({
        id: recipeId,
        rating,
        text: reviewText,
      }).unwrap();

      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error(error);
      const errorMsg = error?.data?.message || 'Не вдалося надіслати відгук';
      setErrors({ server: errorMsg });
    }
  };

  return (
    <Section>
      <SectionTitle>Залиште відгук</SectionTitle>
      <ReviewFormLayout onSubmit={handleSubmit}>
        <Field>
          <InteractiveRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarButton
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                $active={star <= (hoverRating || rating)}
              >
                <img src={starIcon} alt={`${star} зірок`} />
              </StarButton>
            ))}
          </InteractiveRating>
          {errors?.rating && <InputError>{errors.rating}</InputError>}
        </Field>

        <Description>
          {rating === 0
            ? 'Що вам сподобалося?'
            : rating > 3
              ? 'Що вам сподобалося?'
              : 'Що пішло не так?'}
        </Description>
        <Field>
          <ReviewTextArea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Поділіться своїми враженнями..."
            disabled={isLoading}
          />
          {errors?.reviewText && <InputError>{errors.reviewText}</InputError>}
        </Field>

        <Field>
          {errors?.server && <InputError>{errors.server}</InputError>}
          <FocusButton type="submit" disabled={isLoading}>
            {isLoading ? 'Надсилання...' : 'Надіслати відгук'}
          </FocusButton>
        </Field>
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
  resize: vertical; 
  font-family: inherit; 

  &:focus {
    outline: 2px solid #2d4a2f;
  }
`;

const ReviewFormLayout = styled.form`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #b2bba2;
  margin: 1.25rem 5rem;
`;

const InteractiveRating = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StarButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.1s;

  img {
    width: 2rem;
    height: 2rem;
    opacity: ${({ $active }) => ($active ? '1' : '0.7')};
      filter: ${({ $active }) => ($active ? 'none' : 'grayscale(30%)')};
    transition: all 0.2s ease;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

export default ReviewForm;
