import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { RECIPES_MOCK } from '../shared/utils/mockData.js';
import { PageContainer } from '../ui/Container.jsx';

const RecipesPage = () => {
  return (
    <PageContainer $padding="0 5rem">
      <BrowserLayout
        type="recipe"
        maxNumberOfCards={12}
        recipes={RECIPES_MOCK}
        showPageNavigation={true}
      />
    </PageContainer>
  );
};

export default RecipesPage;
