import { createMemoryRouter } from 'react-router-dom';
import { routesConfig } from '../router/routes.jsx';

describe('<PlaylistDetailsPage />', () => {
  const mockPlaylist = {
    id: '123',
    name: 'Мій улюблений плейлист',
    description: 'Опис',
    coverImage: '/uploads/playlist.jpg',
    owner: { name: 'Шеф', avatar: '/uploads/avatar.jpg' },
    tags: ['Сніданок'],
    views: 150,
    recipesCount: 2,
    recipes: ['r1', 'r2']
  };

  it('відображає сторінку завантаження', () => {
    cy.intercept('GET', '/api/playlists/123', {
      delay: 1000,
      body: {}
    }).as('getPlaylistDelayed');

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/playlists/123']
    });

    cy.mount(null, { router });

    cy.get('[data-testid="loading-page"]').should('be.visible');
  });

  it('відображає пустий стан, якщо рецептів немає', () => {
    const emptyPlaylist = { ...mockPlaylist, recipes: [], recipesCount: 0 };

    cy.intercept('GET', '/api/playlists/123', { body: emptyPlaylist }).as('getPlaylist');

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/playlists/123']
    });

    cy.mount(null, { router });

    cy.wait('@getPlaylist');

    cy.contains('У цьому плейлисті ще немає рецептів').should('be.visible');
    cy.get('input[placeholder*="Пошук"]').should('not.exist');
  });

  it('передає правильні ID рецептів у запит браузера', () => {
    cy.intercept('GET', '/api/playlists/123', { body: mockPlaylist }).as('getPlaylist');

    cy.intercept('GET', '/api/recipes*ids=r1%2Cr2*', {
      body: { items: [], total: 0 }
    }).as('getFilteredRecipes');

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/playlists/123']
    });

    cy.mount(null, { router });

    cy.wait('@getPlaylist');
    cy.wait('@getFilteredRecipes');

    cy.contains('Мій улюблений плейлист').should('be.visible');
  });
});