Cypress.Commands.add('login', (email, password) => {
  // session команда для кешування сесії користувача
  cy.session(
    [email, password],
    () => {
      // Виконуємо запит на вхід користувача
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/api/auth/login',
        body: { email, password },
      }).then((resp) => {
        //
        expect(resp.status).to.eq(200);
      });
    },
    {
      validate: () => {
        cy.request('/api/auth/me').its('status').should('eq', 200);
      },
    }
  );
});
