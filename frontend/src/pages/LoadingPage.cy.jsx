import LoadingPage, { Spinner } from './LoadingPage';

describe('<LoadingPage />', () => {
  it('відображає сторінку завантаження на весь екран', () => {
    cy.mount(<LoadingPage />);

    cy.get('[data-testid="loading-page"]').as('wrapper');

    cy.get('@wrapper').should('be.visible');
    cy.get('@wrapper').should('have.css', 'position', 'fixed');
    cy.get('@wrapper').should('have.css', 'display', 'flex');

    cy.get('@wrapper')
      .invoke('outerWidth')
      .should('equal', 1000);

    cy.get('@wrapper')
      .invoke('outerHeight')
      .should('equal', 600);
  });

  it('відображає спінер із заданим розміром та анімацією', () => {
    cy.mount(<LoadingPage />);

    cy.get('[data-testId = "loading-page"]').children().first().as('spinner');

    cy.get('@spinner').should('have.css', 'width', '64px');
    cy.get('@spinner').should('have.css', 'height', '64px');
    cy.get('@spinner').should('have.css', 'border-radius', '50%');

    cy.get('@spinner').should('have.css', 'animation');
  });

  it('Spinner коректно використовує розмір за замовчуванням', () => {
    cy.mount(
      <div style={{ padding: '20px' }}>
        <Spinner />
      </div>
    );

    cy.get('div').last().should('have.css', 'width', '48px');
    cy.get('div').last().should('have.css', 'height', '48px');
  });
});
