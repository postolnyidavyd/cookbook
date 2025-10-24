import styled from 'styled-components';
import { PLAYLIST_DETAIL_MOCK, PLAYLIST_RECIPE_LIST } from '../shared/utils/mockData.js';
import { RecipeCard } from '../components/Cards/RecipeCard.jsx';

const PlaylistDetailsPage = ({ onNavigate }) => {
  const { title, subtitle, description, cover, curator, stats, tags } = PLAYLIST_DETAIL_MOCK;

  return (
    <Page>
      <Hero>
        <HeroContent>
          <Subtitle>{subtitle}</Subtitle>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <CuratorBlock>
            <CuratorAvatar src={curator.avatar} alt={curator.name} />
            <div>
              <CuratorName>{curator.name}</CuratorName>
              <CuratorRole>{curator.role}</CuratorRole>
            </div>
          </CuratorBlock>
          <StatsList>
            {stats.map((item) => (
              <StatCard key={item.label}>
                <StatValue>{item.value}</StatValue>
                <StatLabel>{item.label}</StatLabel>
              </StatCard>
            ))}
          </StatsList>
        </HeroContent>
        <HeroMedia>
          <HeroImage src={cover} alt={title} />
          <HeroOverlay />
          <HeroCTA type="button">Додати в обране</HeroCTA>
        </HeroMedia>
      </Hero>
      <FilterToolbar>
        <TagList>
          {tags.map((tag, index) => (
            <TagButton key={tag} $active={index === 0} type="button">
              {tag}
            </TagButton>
          ))}
        </TagList>
        <ToolbarActions>
          <OutlineButton type="button">Фільтрувати</OutlineButton>
          <OutlineButton type="button">Сортувати</OutlineButton>
        </ToolbarActions>
      </FilterToolbar>
      <RecipesSection>
        <SectionHeader>
          <SectionTitle>Рецепти з плейлиста</SectionTitle>
          <SectionSubtitle>Від сніданків до вечері — готуйте послідовно або оберіть улюблене.</SectionSubtitle>
        </SectionHeader>
        <RecipeGrid>
          {PLAYLIST_RECIPE_LIST.map((recipe) => (
            <RecipeCard
              key={recipe.title}
              recipe={recipe}
              onSelect={() => onNavigate?.('recipeDetail')}
            />
          ))}
        </RecipeGrid>
      </RecipesSection>
    </Page>
  );
};

const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-bottom: 5rem;
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 3rem;
  padding: 3.5rem 5rem 0;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Subtitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #4c5b4d;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: 3.1rem;
  line-height: 1.1;
  color: #1e331f;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #4d5d4e;
  line-height: 1.7;
  max-width: 32rem;
`;

const CuratorBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CuratorAvatar = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(30, 51, 31, 0.2);
`;

const CuratorName = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e331f;
`;

const CuratorRole = styled.span`
  font-size: 0.95rem;
  color: #5c6b5d;
`;

const StatsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StatCard = styled.div`
  min-width: 10rem;
  background: #d4d9ca;
  border-radius: 1.25rem;
  padding: 1.1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatValue = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e331f;
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: #4d5d4e;
`;

const HeroMedia = styled.div`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  min-height: 22rem;
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 40, 24, 0.2) 0%, rgba(18, 40, 24, 0.85) 100%);
`;

const HeroCTA = styled.button`
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  border: none;
  background: rgba(244, 246, 239, 0.95);
  color: #1e331f;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: #ffffff;
    transform: translateY(-2px);
  }
`;

const FilterToolbar = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0 5rem;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TagButton = styled.button`
  padding: 0.6rem 1.3rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#2d4a2f' : 'rgba(30, 51, 31, 0.1)')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#1e331f')};
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ $active }) => ($active ? '#1e331f' : 'rgba(30, 51, 31, 0.18)')};
  }
`;

const ToolbarActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const OutlineButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(30, 51, 31, 0.2);
  background: rgba(244, 246, 239, 0.6);
  color: #1e331f;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(244, 246, 239, 0.95);
    border-color: rgba(30, 51, 31, 0.35);
  }
`;

const RecipesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.1rem;
  color: #1e331f;
`;

const SectionSubtitle = styled.span`
  font-size: 1rem;
  color: #556555;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1.5rem;
`;

export default PlaylistDetailsPage;
