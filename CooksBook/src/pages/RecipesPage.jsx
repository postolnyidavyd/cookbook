import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { RECIPES_MOCK } from '../shared/utils/mockData.js';
import styled from 'styled-components';

const RecipesPage = ({ onNavigate }) => {
  return (
    <Page>
      <Header>
        <Badge>Колекція спільноти</Badge>
        <Title>Рецепти</Title>
        <Description>
          Добірка найкращих ідей для щоденного меню: обирайте за настроєм, інгредієнтами
          або складністю.
        </Description>
        <Stats>
          <StatCard>
            <StatValue>1200+</StatValue>
            <StatLabel>рецептів</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>35</StatValue>
            <StatLabel>новинок цього тижня</StatLabel>
          </StatCard>
        </Stats>
      </Header>
      <BrowserLayout
        type="recipe"
        maxNumberOfCards={12}
        recipes={RECIPES_MOCK}
        showPageNavigation={true}
        onRecipeSelect={() => onNavigate?.('recipeDetail')}
      />
    </Page>
  );
};

const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.section`
  padding: 3.5rem 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Badge = styled.span`
  align-self: flex-start;
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  background: rgba(45, 74, 47, 0.12);
  color: #1e331f;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: #1e331f;
`;

const Description = styled.p`
  max-width: 42rem;
  font-size: 1.15rem;
  color: #4d5d4e;
  line-height: 1.6;
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  min-width: 12rem;
  background: #d4d9ca;
  border-radius: 1rem;
  padding: 1.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatValue = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e331f;
`;

const StatLabel = styled.span`
  font-size: 0.95rem;
  color: #4d5d4e;
`;

export default RecipesPage;
