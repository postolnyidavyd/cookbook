describe('Редагування профілю', () => {
  beforeEach(() => {
    cy.autoIntercept();
    cy.login('test@gmail.com', 'postd@v34');
    cy.visit('/profile');
    cy.wait('@getMe');
  });

  it('успішно змінює імʼя та аватар користувача', () => {
    const newName = `Update${Math.round(Math.random() * 1000)}`;

    cy.contains('button', 'Змінити дані').click();

    cy.get('input[name="name"]').clear();
    cy.get('input[name="name"]').type(newName);

    cy.get('input[type="file"]')
      .first()
      .selectFile('cypress/fixtures/avatar.jpg', { force: true });

    cy.contains('button', 'Зберегти').click();

    cy.wait('@updateMe').its('response.statusCode').should('eq', 200);

    cy.contains(newName).should('be.visible');
  });
});
