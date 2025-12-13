import ProfilePage from './ProfilePage';
import { createTestStore } from '../../cypress/support/test-utils';

describe('<ProfilePage />', () => {
  const mockUser = {
    id: 'user_123',
    username: 'Тарас Шевченко',
    email: 'taras@kobzar.ua',
    avatar: '/uploads/avatar.jpg'
  };

  const initialState = {
    auth: { user: mockUser, isAuthenticated: true }
  };

  // Повні дані для рецепта (щоб RecipeCard не впала)
  const mockRecipe = {
    id: '1',
    title: 'Мій борщ',
    image: '/uploads/borsch.jpg',
    time: 60,
    difficulty: 'Середньо',
    rating: 5
  };

  // Повні дані для плейлиста (щоб PlaylistCard не впала)
  const mockPlaylist = {
    id: 'p1',
    name: 'Мої сніданки',
    coverImage: '/uploads/cover.jpg',
    views: 100,
    recipesCount: 5,
    owner: {
      name: 'Тарас',
      avatar: '/uploads/avatar.jpg'
    }
  };

  beforeEach(() => {
    cy.intercept('GET', '/api/recipes*authorId=user_123*', {
      body: { items: [mockRecipe], total: 1 }
    }).as('getMyRecipes');

    cy.intercept('GET', '/api/playlists*ownerId=user_123*', {
      body: { items: [mockPlaylist], total: 1 }
    }).as('getMyPlaylists');

    cy.intercept('GET', '/api/recipes*likedBy=user_123*', {
      body: { items: [mockRecipe], total: 1 }
    }).as('getLikedRecipes');

    cy.intercept('GET', '/api/playlists*likedBy=user_123*', {
      body: { items: [mockPlaylist], total: 1 }
    }).as('getLikedPlaylists');
  });

  it('відображає інформацію про користувача', () => {
    const store = createTestStore(initialState);
    cy.mount(<ProfilePage />, { reduxStore: store });

    cy.contains('Тарас').should('be.visible');
    cy.contains('Шевченко').should('be.visible');
    cy.contains('Пошта: taras@kobzar.ua').should('be.visible');
    cy.get('img[alt="Аватар"]')
      .should('have.attr', 'src')
      .and('include', 'avatar.jpg');
  });

  it('відкриває модальне вікно редагування профілю', () => {
    const store = createTestStore(initialState);
    cy.mount(<ProfilePage />, { reduxStore: store });

    cy.contains('Зміна даних користувача').should('not.be.visible');

    cy.contains('button', 'Змінити дані').click();

    cy.contains('Зміна даних користувача').should('be.visible');
    cy.get('input[name="name"]').should('have.value', 'Шевченко');
    cy.get('input[name="surname"]').should('have.value', 'Тарас');
  });

  it('завантажує та відображає секції з правильними параметрами запиту', () => {
    const store = createTestStore(initialState);
    cy.mount(<ProfilePage />, { reduxStore: store });

    cy.wait('@getMyRecipes').its('request.url').should('include', 'authorId=user_123');
    cy.wait('@getMyPlaylists').its('request.url').should('include', 'ownerId=user_123');
    cy.wait('@getLikedRecipes').its('request.url').should('include', 'likedBy=user_123');
    cy.wait('@getLikedPlaylists').its('request.url').should('include', 'likedBy=user_123');

    cy.contains('Мої рецепти').should('be.visible');
    cy.contains('Мої плейлисти').should('be.visible');
    cy.contains('Вподобані рецепти').should('be.visible');
    cy.contains('Вподобані плейлисти').should('be.visible');

    cy.contains('Мій борщ').should('be.visible');
    cy.contains('Мої сніданки').should('be.visible');
  });

  it('відображає кнопку додавання рецепту', () => {
    const store = createTestStore(initialState);
    cy.mount(<ProfilePage />, { reduxStore: store });

    cy.contains('a', 'Додати рецепт')
      .should('be.visible')
      .and('have.attr', 'href', '/profile/new-recipe');
  });
});