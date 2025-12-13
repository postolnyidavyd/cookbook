describe('Реєстрація користувача', () => {
  beforeEach(() => {
    cy.autoIntercept();

    cy.visit('/register');

    cy.wait('@getMe');
    cy.get('[data-testid="loading-page"]').should('not.exist');

    cy.get('input[name="email"]').should('be.visible');
  });
  it('успішно реєструє нового користувача', () => {
    const uniqueEmail = `test_${Date.now()}@example.com`;
    const password = 'Password123!';
    const name = 'Тестер';
    const surname = 'Автоматичний';

    cy.get('input[id="register-email"]').type(uniqueEmail);
    cy.get('input[id="register-name"]').type(name);
    cy.get('input[id="register-surname"]').type(surname);
    cy.get('input[id="register-password"]').type(password);

    cy.get('button[type="submit"]').last().click();

    cy.wait('@registerUser').its('response.statusCode').should('eq', 201);
    cy.url().should('not.include', '/register');


    cy.get('img[alt="Аватар"]').should('be.visible');

    cy.visit('/profile');

    cy.contains(name).should('exist');
    cy.contains(surname).should('exist');
    cy.contains(uniqueEmail).should('exist');
  });
});
