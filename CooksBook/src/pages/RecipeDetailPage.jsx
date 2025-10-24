import styled from 'styled-components';
import clockIcon from '../assets/clock.svg';
import starIcon from '../assets/star.svg';
import { RECIPE_DETAIL_MOCK } from '../shared/utils/mockData.js';

const RecipeDetailPage = () => {
  const {
    title,
    cover,
    description,
    playlist,
    time,
    servings,
    difficulty,
    rating,
    author,
    badges,
    ingredients,
    steps,
    reviewPrompt,
    reviews,
  } = RECIPE_DETAIL_MOCK;

  const servingsNumber = typeof servings === 'string' ? servings.split(' ')[0] : servings;

  return (
    <Page>
      <Hero>
        <HeroText>
          <PlaylistTag>{playlist}</PlaylistTag>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <BadgeList>
            {badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </BadgeList>
          <MetaList>
            <MetaItem>
              <MetaIcon src={clockIcon} alt="Час" />
              <MetaValue>
                <strong>{time}</strong>
                <span>Час приготування</span>
              </MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaBadge>{servingsNumber}</MetaBadge>
              <MetaValue>
                <strong>{servings}</strong>
                <span>Порції</span>
              </MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaDot $difficulty={difficulty} />
              <MetaValue>
                <strong>{difficulty}</strong>
                <span>Складність</span>
              </MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaIcon src={starIcon} alt="Рейтинг" />
              <MetaValue>
                <strong>{rating}</strong>
                <span>Середній рейтинг</span>
              </MetaValue>
            </MetaItem>
          </MetaList>
          <AuthorBlock>
            <AuthorAvatar src={author.avatar} alt={author.name} />
            <div>
              <AuthorName>{author.name}</AuthorName>
              <AuthorRole>{author.role}</AuthorRole>
            </div>
          </AuthorBlock>
        </HeroText>
        <HeroImageWrapper>
          <HeroImage src={cover} alt={title} />
        </HeroImageWrapper>
      </Hero>
      <ContentSection>
        <SectionTitle>Інгредієнти</SectionTitle>
        <IngredientsGrid>
          {ingredients.map((group) => (
            <IngredientGroup key={group.title}>
              <GroupTitle>{group.title}</GroupTitle>
              <IngredientList>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </IngredientList>
            </IngredientGroup>
          ))}
        </IngredientsGrid>
      </ContentSection>
      <ContentSection>
        <SectionTitle>Приготування</SectionTitle>
        <StepsList>
          {steps.map((step, index) => (
            <StepItem key={step}>
              <StepNumber>{index + 1}.</StepNumber>
              <p>{step}</p>
            </StepItem>
          ))}
        </StepsList>
      </ContentSection>
      <ReviewSection>
        <ReviewHeader>
          <SectionTitle>{reviewPrompt.title}</SectionTitle>
          <ReviewSubtitle>{reviewPrompt.subtitle}</ReviewSubtitle>
          <StarRow>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} src={starIcon} alt="Оцінка" />
            ))}
          </StarRow>
          <ReviewTextarea placeholder="Напишіть свій відгук..." />
          <SubmitButton type="button">Надіслати відгук</SubmitButton>
        </ReviewHeader>
      </ReviewSection>
      <ContentSection>
        <SectionTitle>Відгуки</SectionTitle>
        <ReviewsList>
          {reviews.map((review) => (
            <ReviewCard key={review.author}>
              <ReviewHeaderRow>
                <ReviewerAvatar src={review.avatar || author.avatar} alt={review.author} />
                <div>
                  <ReviewerName>{review.author}</ReviewerName>
                  <ReviewerMeta>Оцінка: {review.rating}/5</ReviewerMeta>
                </div>
              </ReviewHeaderRow>
              <ReviewText>{review.comment}</ReviewText>
            </ReviewCard>
          ))}
        </ReviewsList>
      </ContentSection>
    </Page>
  );
};

const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 5rem;
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

const Description = styled.p`
  font-size: 1.1rem;
  color: #4d5d4e;
  line-height: 1.7;
`;

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
  font-size: 2.1rem;
  color: #1e331f;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2rem;
`;

const IngredientGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(212, 217, 202, 0.5);
  border-radius: 1.25rem;
  padding: 1.5rem;
`;

const GroupTitle = styled.h3`
  font-size: 1.2rem;
  color: #1e331f;
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
`;

const StepItem = styled.li`
  display: flex;
  gap: 1rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #3f4d40;
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

const ReviewTextarea = styled.textarea`
  min-height: 8rem;
  border-radius: 1rem;
  border: 1px solid rgba(30, 51, 31, 0.2);
  padding: 1rem 1.25rem;
  font-size: 1rem;
  background: rgba(244, 246, 239, 0.7);
  resize: vertical;
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
