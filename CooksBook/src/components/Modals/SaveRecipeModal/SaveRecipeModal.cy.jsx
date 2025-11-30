import SaveRecipeModal from './SaveRecipeModal';
import { createTestStore } from '../../../../cypress/support/test-utils.js';

describe('<SaveRecipeModal />', () => {
  const openState = {
    ui: {
      saveRecipeModal: {
        isOpen: true,
        recipeId: '123',
      },
    },
    auth: {
      user: { id: 'user1' }
    }
  };

  beforeEach(() => {
    cy.intercept('GET', '/api/playlists*', {
      body: { items: [], total: 0 }
    }).as('getPlaylists');
  });

  it('не відображається, коли закрито', () => {
    cy.mount(<SaveRecipeModal />, {
      initialState: {
        ui: { saveRecipeModal: { isOpen: false, recipeId: null } }
      }
    });

    cy.get('[role="dialog"]').should('not.exist');
  });

  it('відображає вибір плейлиста при відкритті', () => {
    cy.mount(<SaveRecipeModal />, { initialState: openState });

    cy.contains('Зберегти рецепт').should('be.visible');
    cy.contains('Новий плейлист').should('not.exist');
  });

  it('перемикається між екранами створення та вибору', () => {
    cy.mount(<SaveRecipeModal />, { initialState: openState });

    cy.contains('button', '+ Створити плейлист').click();

    cy.contains('Новий плейлист').should('be.visible');
    cy.contains('Зберегти рецепт').should('not.exist');

    cy.contains('button', 'Скасувати').click();

    cy.contains('Зберегти рецепт').should('be.visible');
  });

  it('закриває модалку при кліку на фоні', () => {
    const store = createTestStore(openState);
    cy.spy(store, 'dispatch').as('dispatchSpy');

    cy.mount(<SaveRecipeModal />, { reduxStore: store });

    cy.get('body').click(0, 0);

    cy.get('@dispatchSpy').should('have.been.calledWith',
      Cypress.sinon.match.hasNested('payload.isOpen', false)
    );
  });
});