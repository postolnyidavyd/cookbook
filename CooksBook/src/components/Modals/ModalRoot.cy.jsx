import ModalRoot from './ModalRoot.jsx';

describe('<ModalRoot />', () => {
  it('рендерить дітей', () => {
    cy.mount(<ModalRoot />, {
      initialState: {
        ui: {
          showLoginModal: true,
          saveRecipeModal: {
            isOpen: true,
            recipeId: 101,
          },
        },
      },
    });

    cy.get('#modal').children().should('have.length', 2);
  });
  it('не рендерить нічого, якщо модальні вікна закриті', () => {
    cy.mount(<ModalRoot />);
    cy.get('#modal').children().should('not.be.visible');
  });
});
