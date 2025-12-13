import { createMemoryRouter } from 'react-router-dom';
import { routesConfig } from '../routes.jsx';

describe('<RootLayout />', () => {

  it('рендерить меню та головну сторінку', () => {
    cy.intercept('GET', '/api/auth/me', {
      statusCode: 200,
      body: { user: null }
    }).as('getMe');


    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });

    cy.mount(null, { router });

    cy.wait('@getMe');
    cy.get('nav').should('be.visible');
  });

  it('відображає LoadingPage, поки перевіряється авторизація', () => {
    cy.intercept('GET', '/api/auth/me', {
      delay: 1000,
      statusCode: 200,
      body: {}
    }).as('getMeDelayed');

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });

    cy.mount(null, { router });


    cy.get('nav').should('not.exist');
  });

  it('відкриває сторінку рецептів (перевірка навігації та Outlet)', () => {
    cy.intercept('GET', '/api/auth/me', { body: { user: null } });
    cy.intercept('GET', '/api/recipes*', { body: { items: [], total: 0 } });


    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/recipes'],
    });

    cy.mount(null, { router });


    cy.get('input[placeholder*="Пошук"]').should('exist');
  });

});