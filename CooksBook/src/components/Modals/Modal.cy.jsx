import Modal from './Modal.jsx';

describe('<Modal />', () => {
  it('рендерить дітей всередині модального вікна', () => {
    cy.mount(
      <Modal isOpen={true} onClose={cy.spy()}>
        <div data-testid="modal-content">Модальне вміст</div>
      </Modal>
    );

    cy.get('[data-testid="modal-content"]')
      .should('be.visible')
      .and('have.text', 'Модальне вміст');
  });

  it('не відображає модальне вікно, коли isOpen=false', () => {
    cy.mount(
      <Modal isOpen={false} onClose={cy.spy()}>
        <div data-testid="modal-content">Модальне вміст</div>
      </Modal>
    );

    cy.get('[data-testid="modal-content"]').should('not.be.visible');
  });

  it('викликає onClose при натисканні на фон модального вікна', () => {
    const onCloseSpy = cy.spy().as('onClose');

    cy.mount(
      <Modal isOpen={true} onClose={onCloseSpy}>
        <div>Модальне вміст</div>
      </Modal>
    );

    // Клік на фон модального вікна
    cy.get('body').click(0, 0);

    cy.get('@onClose').should('have.been.calledOnce');

  });

});