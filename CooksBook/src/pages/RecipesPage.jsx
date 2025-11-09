import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { RECIPES_MOCK } from '../shared/utils/mockData.js';
import { Container } from '../ui/Container.jsx';

const RecipesPage = () => {
  return (
    <Container>
      <BrowserLayout
        type="recipe"
        maxNumberOfCards={12}
        recipes={RECIPES_MOCK}
        showPageNavigation={true}
      />
    </Container>
  );
};

export default RecipesPage;
