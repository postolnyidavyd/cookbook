import RecipeDetailPage from './RecipeDetailPage';
import { createMemoryRouter } from 'react-router-dom';

describe('<RecipeDetailPage />', () => {
  const mockRecipe = {
    id: '123',
    title: 'Український Борщ',
    cover: '/uploads/borsch.jpg',
    description: 'Традиційна страва',
    time: 120,
    servings: 4,
    difficulty: 'Середньо',
    rating: 4.8,
    author: {
      id: 'u1',
      name: 'Шеф Андрій',
      avatar: '/uploads/avatar.jpg'
    },
    ingredients: [
      {
        title: 'Овочі',
        items: [{ name: 'Буряк', amount: 2, unit: 'шт' }]
      }
    ],
    steps: [
      { title: 'Підготовка', text: 'Помити овочі' }
    ],
    reviews: [
      {
        id: 'r1',
        rating: 5,
        text: 'Смачно',
        author: { name: 'Оля', avatar: '/uploads/user.jpg' }
      }
    ]
  };

  it('відображає сторінку завантаження', () => {
    cy.intercept('GET', '/api/recipes/123', {
      delay: 1000,
      body: {}
    }).as('getRecipeDelayed');

    const router = createMemoryRouter([
      {
        path: '/recipes/:recipeId',
        element: <RecipeDetailPage />
      }
    ], {
      initialEntries: ['/recipes/123']
    });

    cy.mount(null, { router });

    cy.get('[data-testid="loading-page"]').should('be.visible');
    cy.contains('Український Борщ').should('not.exist');
  });

  it('відображає всі секції сторінки з даними рецепта', () => {
    cy.intercept('GET', '/api/recipes/123', {
      body: mockRecipe
    }).as('getRecipe');

    const router = createMemoryRouter([
      {
        path: '/recipes/:recipeId',
        element: <RecipeDetailPage />
      }
    ], {
      initialEntries: ['/recipes/123']
    });

    cy.mount(null, { router });

    cy.wait('@getRecipe');

    cy.contains('Український Борщ').should('be.visible');
    cy.contains('Традиційна страва').should('be.visible');

    cy.contains('Шеф Андрій').should('be.visible');
    cy.contains('120').should('be.visible');
    cy.contains('Середньо').should('be.visible');

    cy.contains('Інгредієнти').should('be.visible');
    cy.contains('Овочі').should('be.visible');
    cy.contains('Буряк').should('be.visible');

    cy.contains('Приготування').should('be.visible');
    cy.contains('Підготовка').should('be.visible');

    cy.contains('Залиште відгук').should('be.visible');
    cy.contains('Відгуки').should('be.visible');
    cy.contains('Оля').should('be.visible');
  });

  it('коректно передає ID рецепта у форму відгуку', () => {
    cy.intercept('GET', '/api/recipes/123', {
      body: mockRecipe
    }).as('getRecipe');

    cy.intercept('POST', '/api/recipes/123/reviews', {
      body: { success: true }
    }).as('postReview');

    const router = createMemoryRouter([
      {
        path: '/recipes/:recipeId',
        element: <RecipeDetailPage />
      }
    ], {
      initialEntries: ['/recipes/123']
    });

    cy.mount(null, { router });
    cy.wait('@getRecipe');

    cy.get('button').find('img[alt="5 зірок"]').closest('button').click();
    cy.get('textarea').type('Тестовий відгук');
    cy.contains('button', 'Надіслати відгук').click();

    cy.wait('@postReview').its('request.url').should('include', '/api/recipes/123/reviews');
  });
});