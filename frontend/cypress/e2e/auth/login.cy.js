describe('login', () => {
  beforeEach(() => {
    cy.autoIntercept();

    cy.visit('/');
    cy.wait('@getMe');
  });
  it('має успішно виконувати вхід з коректними обліковими даними', () => {
    const email = 'postolnyi.davyd@student.uzhnu.edu.ua';
    const password = 'postd@v34';

    cy.contains('Ввійти').click();

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    cy.get('button[type="submit"]').click();

    cy.wait('@loginUser').its('response.statusCode').should('eq', 200);


    cy.contains('Вийти').should('exist');
  })
});
