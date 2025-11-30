import { RecipeCard } from './RecipeCard.jsx';
import filledHeart from '../../../assets/filledHeart.svg';
import filledBookmark from '../../../assets/filledBookmark.svg';
import hollowHeart from '../../../assets/hollowHeart.svg';
import hollowBookmark from '../../../assets/hollowBookmark.svg';
import { createTestStore } from '../../../../cypress/support/test-utils.js';

describe('<RecipeCard />', () => {
  // Мок-дані рецепта
  const mockRecipe = {
    id: '123',
    title: 'Паста Карбонара',
    image: '/uploads/pasta.jpg',
    time: 45,
    difficulty: 'Середньо',
    rating: 4.8,
  };

  it('відображає дані рецепта коректно', () => {
    cy.mount(<RecipeCard recipe={mockRecipe} />);

    cy.contains('Паста Карбонара').should('be.visible');
    cy.contains('45').should('be.visible');
    cy.contains('Середньо').should('be.visible');
    cy.contains('4.8').should('be.visible');

    cy.get('img[alt="Паста Карбонара"]')
      .should('have.attr', 'src')
      .and('include', 'pasta.jpg');
  });

  it('відображає правильний колір для складності "Легко"', () => {
    const easyRecipe = { ...mockRecipe, difficulty: 'Легко' };
    cy.mount(<RecipeCard recipe={easyRecipe} />);

    cy.contains('p', 'Легко')
      .prev()
      .should('have.css', 'background-color', 'rgb(31, 169, 40)');
  });

  it('відображає правильний колір для складності "Складно"', () => {
    const hardRecipe = { ...mockRecipe, difficulty: 'Складно' };
    cy.mount(<RecipeCard recipe={hardRecipe} />);

    cy.contains('p', 'Складно')
      .prev()
      .should('have.css', 'background-color', 'rgb(225, 50, 53)');
  });

  // 3. ТЕСТ СТАНІВ (Liked / Saved)
  it('показує зафарбовані іконки, якщо рецепт вподобаний та збережений', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
        user: {
          likedRecipes: ['123'],
          savedInPlaylistRecipes: ['123'],
        },
      },
    };

    cy.mount(<RecipeCard recipe={mockRecipe} />, { initialState });

    cy.get('button').find(`img[src="${filledHeart}"]`).should('exist');

    cy.get('button').find(`img[src="${filledBookmark}"]`).should('exist');
  });

  it('показує пусті іконки, якщо рецепт не вподобаний', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
        user: { likedRecipes: [], savedInPlaylistRecipes: [] },
      },
    };

    cy.mount(<RecipeCard recipe={mockRecipe} />, { initialState });

    cy.get('button').find(`img[src="${hollowHeart}"]`).should('exist');
    cy.get('button').find(`img[src="${hollowBookmark}"]`).should('exist');
  });

  it('відправляє мутацію likeRecipe при кліку', () => {
    cy.intercept('POST', '/api/recipes/123/like', {
      statusCode: 200,
      body: { success: true },
    }).as('likeRequest');

    // монтуємо з залогіненим юзером
    cy.mount(<RecipeCard recipe={mockRecipe} />, {
      initialState: {
        auth: { isAuthenticated: true, user: { likedRecipes: [] } },
      },
    });

    // Використовуємо .closest('button'), щоб клікнути саме на кнопку
    cy.get(`img[src="${hollowHeart}"]`).closest('button').click();

    cy.wait('@likeRequest').then((interception) => {
      expect(interception.request.body).to.deep.equal({ like: true });
    });
  });

  it('диспатчить відкриття модалки збереження', () => {
    const store = createTestStore({
      auth: { isAuthenticated: true },
      ui: { saveRecipeModal: { isOpen: false, recipeId: null } },
    });

    cy.mount(<RecipeCard recipe={mockRecipe} />, { reduxStore: store });

    cy.get('button')
      .find('img[alt="Зберегти"]')
      .closest('button')
      .click()
      .should(() => {
        const state = store.getState();

        expect(state.ui.saveRecipeModal.isOpen).to.equal(true);
        expect(state.ui.saveRecipeModal.recipeId).to.equal('123');
      });
  });

  it('має посилання на сторінку деталей', () => {
    cy.mount(<RecipeCard recipe={mockRecipe} />);

    cy.get('a').should('have.attr', 'href', '/recipes/123');
  });
});
