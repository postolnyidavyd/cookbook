import React from 'react';
import Navbar from './Navbar';

describe('<Navbar />', () => {
  it('відображає кнопки входу та реєстрації для незареєстрованого юзера', () => {
    cy.mount(<Navbar />, {
      initialState: { auth: { isAuthenticated: false } },
    });
    cy.get('nav').should('be.visible');

    cy.contains('Ввійти').should('be.visible');
    cy.contains('Зареєструвати').should('be.visible');

    cy.contains('button', 'Вийти').should('not.exist');
  });
  it('відображає аватар і кнопку виходу для залогіненого юзера', () => {
    cy.mount(<Navbar />, {
      initialState: {
        auth: {
          isAuthenticated: true,
          user: { id: '123', avatar: '/uploads/default_avatar.jpg' },
        },
      },
    });

    cy.contains('button', 'Вийти').should('be.visible');

    cy.get('img[alt="Аватар"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'default_avatar.jpg');

    cy.contains('button', 'Ввійти').should('not.exist');
  });
  it('викликає logout при натисканні кнопки "Вийти"', () => {
    cy.intercept('POST', 'api/auth/logout', {
      statusCode: 200,
      body: { message: 'Вихід успіш' },
    }).as('logoutRequest');

    cy.mount(<Navbar />, {
      initialState: { auth: { isAuthenticated: true, user: { id: '123' } } },
    });

    cy.contains('button', 'Вийти').click();

    // Перевіряємо що запит пішов
    cy.wait('@logoutRequest');
  });
  it('підсвічує активне посилання', () => {
    cy.mount(<Navbar />, {
      initialState: { auth: { isAuthenticated: false } },
      routerProps: { initialEntries: ['/recipes'] },
    });

    cy.contains('a', 'Рецепти').should('have.class', 'active');
    cy.contains('a', 'Головна').should('not.have.class', 'active');
  });
});
