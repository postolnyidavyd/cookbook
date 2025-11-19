import styled from 'styled-components';
import clockIcon from '../assets/clock.svg';
import starIcon from '../assets/star.svg';
import starBigUnfilled from '../assets/starBigUnfilled.svg';
import starBigFilled from '../assets/starBigFilled.svg';
import whiteHeart from '../assets/heartWhite.svg';
import filledHeart from '../assets/filledHeart.svg';
import bookmark from '../assets/bookmarkBig.svg';
import share from '../assets/share.svg';
import { RECIPE_DETAIL_MOCK } from '../shared/utils/mockData.js';
import { Container } from '../ui/Container.jsx';
import { Display } from '../ui/texts/Display.jsx';
import { Difficulty } from '../components/Cards/RecipeCard.jsx';
import { Wrapper } from '../ui/Wrapper.jsx';
import { FocusButton } from '../ui/buttons/FocusButton.jsx';
import { WideFocusButton } from '../ui/buttons/WideFocusButton.jsx';
import Ingredients from '../components/Ingredients/Ingredients.jsx';
import { useLoaderData } from 'react-router-dom';

export const recipeDetailLoader = async ({ params }) => {
  const { recipeId } = params;
  console.log(recipeId);
  return RECIPE_DETAIL_MOCK;
};
const RecipeDetailPage = () => {
  const {
    title,
    cover,
    description,
    time,
    servings,
    difficulty,
    rating,
    author,
    ingredients,
    steps,
    reviews,
  } = useLoaderData();

  return (
    <Container $padding="0 2rem 0 5rem">
      <HeroElement title={title} image={cover} description={description}>
        <RecipeSideBar
          time={time}
          avatar={author.avatar}
          authorName={author.name}
          rating={rating}
          difficulty={difficulty}
        />
      </HeroElement>
      <Ingredients ingredients={ingredients} defaultServings={servings} />
      <Steps steps={steps} />
      <ReviewForm />
      <Reviews reviews={reviews} />
    </Container>
  );
};
const Reviews = ({ reviews }) => {
  return <div></div>;
};
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

const Steps = ({ steps }) => {
  return (
    <Section>
      <SectionTitle>Приготування</SectionTitle>

      <StepsList>
        {steps.map((step, index) => {
          const { title, text, image } = step;
          return (
            <StepItem key={step}>
              <StepContent>
                <GroupTitle>
                  {index + 1}.{title}
                </GroupTitle>

                {text && <StepText>{text}</StepText>}

                {image && (
                  <StepImageWrapper>
                    <StepImage src={image} alt={title} />
                  </StepImageWrapper>
                )}
              </StepContent>
            </StepItem>
          );
        })}
      </StepsList>
    </Section>
  );
};
const GroupTitle = styled.h3`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;
const Section = styled.section`
  margin-top: 3rem;
`;
const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StepHeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
`;

const StepText = styled.p`
  font-size: 1.25rem;
`;

const StepImageWrapper = styled.div`
  margin-top: 1.25rem;
  overflow: hidden;
  padding: 0 10rem;
`;

const StepImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1.25rem;
  object-fit: cover;
`;

const HeroElement = ({ image, title, description, children }) => {
  return (
    <Container>
      <Display>{title}</Display>
      {description && <Description>{description}</Description>}
      <HeroContainer>
        <HeroImg src={image} alt={title} />
        {children}
      </HeroContainer>
    </Container>
  );
};
const HeroContainer = styled.section`
  margin-top: 4rem;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`;
const HeroImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 1.25rem;
`;
const Description = styled.h2`
  margin: 1.5rem 0;
  font-size: 2rem;
`;
const RecipeSideBar = ({ rating, avatar, authorName, time, difficulty }) => {
  return (
    <SideBarContainer>
      <MetaContainer>
        <Rating rating={rating} />
        <Wrapper $gap="1">
          <AvatarImage src={avatar} alt={authorName} />
          <Paragraph>{authorName}</Paragraph>
        </Wrapper>
        <Wrapper $gap="1">
          <MetaImage src={clockIcon} />
          <Paragraph>{time}</Paragraph>
        </Wrapper>
        <Wrapper $gap="1">
          <DifficultyBigger $level={difficulty} />
          <Paragraph>{difficulty}</Paragraph>
        </Wrapper>
      </MetaContainer>
      <MetaContainer $gap="0.625rem">
        <WideFocusButton>
          <MetaImage src={whiteHeart} />
          Зберегти рецепт
        </WideFocusButton>
        <WideFocusButton $minWidth="100%">
          <MetaImage src={bookmark} />
          Додати до плейлиста
        </WideFocusButton>
        <WideFocusButton $minWidth="100%">
          <MetaImage src={share} />
          Поділитися
        </WideFocusButton>
      </MetaContainer>
    </SideBarContainer>
  );
};
const Paragraph = styled.p`
  font-size: 1.5rem;
`;
const Rating = ({ rating }) => {
  const filledHeartCount = Math.round(rating);
  const hollowStarsCount = 5 - filledHeartCount;
  return (
    <Wrapper $gap="1">
      {Array.from({ length: filledHeartCount }).map((_, i) => (
        <RatingImage key={i} src={starBigFilled} alt="Заповнена зірка" />
      ))}
      {Array.from({ length: hollowStarsCount }).map((_, i) => (
        <RatingImage key={i * 10} src={starBigUnfilled} alt="Пуста зірка" />
      ))}
    </Wrapper>
  );
};
const MetaImage = styled.img`
  width: 2rem;
  height: 2rem;
`;
const RatingImage = styled.img`
  width: 3rem;
  height: 3rem;
`;
const AvatarImage = styled(MetaImage)`
  border-radius: 50%;
  object-fit: cover;
`;
const DifficultyBigger = styled(Difficulty)`
  height: 2rem;
  width: 2rem;
`;
const SideBarContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
const MetaContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ $gap }) => $gap || '1.5rem'};
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
  padding: 3.5rem 5rem 0;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PlaylistTag = styled.span`
  align-self: flex-start;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  background: rgba(30, 51, 31, 0.12);
  color: #1e331f;
  font-weight: 600;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  line-height: 1.15;
  color: #1e331f;
`;

// const Description = styled.p`
//   font-size: 1.1rem;
//   color: #4d5d4e;
//   line-height: 1.7;
// `;

const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const Badge = styled.span`
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: rgba(212, 217, 202, 0.8);
  color: #1e331f;
  font-weight: 600;
  font-size: 0.9rem;
`;

const MetaList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: #d4d9ca;
`;

const MetaIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const MetaBadge = styled.div`
  min-width: 2.5rem;
  min-height: 2.5rem;
  border-radius: 1rem;
  background: rgba(30, 51, 31, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  font-weight: 700;
  color: #1e331f;
  text-align: center;
`;

const MetaDot = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${({ $difficulty }) =>
    $difficulty === 'Складно'
      ? '#E13235'
      : $difficulty === 'Легко'
        ? '#1FA928'
        : '#E3C73B'};
`;

const MetaValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: #1e331f;
  font-size: 0.95rem;

  strong {
    font-size: 1.2rem;
  }

  span {
    color: #4f5f50;
    font-size: 0.85rem;
  }
`;

const AuthorBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(30, 51, 31, 0.2);
`;

const AuthorName = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e331f;
`;

const AuthorRole = styled.span`
  font-size: 0.95rem;
  color: #5c6b5d;
`;

const HeroImageWrapper = styled.div`
  border-radius: 2rem;
  overflow: hidden;
  min-height: 26rem;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 0 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2rem;
`;

const IngredientList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #4f5f50;

  li::before {
    content: '•';
    margin-right: 0.5rem;
    color: #2d4a2f;
  }
`;

const StepsList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  list-style: none;
  counter-reset: step-counter;
  margin-top: 1.5rem;
`;

const StepItem = styled.li`
  display: flex;
  gap: 1rem;
  font-size: 1.05rem;
  line-height: 1.7;
`;

const StepNumber = styled.span`
  font-weight: 700;
  color: #1e331f;
`;

const ReviewSection = styled.section`
  padding: 0 5rem;
`;

const ReviewHeader = styled.div`
  background: rgba(45, 74, 47, 0.12);
  border-radius: 1.5rem;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ReviewSubtitle = styled.span`
  font-size: 1rem;
  color: #4f5f50;
`;

const StarRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const StarIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  border: none;
  background: #2d4a2f;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #1e331f;
  }
`;

const ReviewsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1.5rem;
`;

const ReviewCard = styled.article`
  background: rgba(244, 246, 239, 0.8);
  border-radius: 1.25rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewHeaderRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ReviewerAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ReviewerName = styled.span`
  font-weight: 600;
  color: #1e331f;
`;

const ReviewerMeta = styled.span`
  font-size: 0.85rem;
  color: #5b6a5c;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  color: #3f4d40;
  line-height: 1.6;
`;

export default RecipeDetailPage;
