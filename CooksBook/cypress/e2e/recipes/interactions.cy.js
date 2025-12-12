describe('Пошук та взаємодія з рецептом', () => {
  beforeEach(() => {
    cy.autoIntercept(); // Твої стандартні інтерсепти

    cy.login('test@gmail.com', 'postd@v34');
    cy.visit('/');
    cy.wait('@getMe');
    cy.wait('@getRecipes');
    cy.wait('@getPlaylists');
  });

  it('успішно знаходить рецепт та вподобає його', () => {
    cy.get('input[placeholder="Пошук рецепту..."]').type('Борщ');

    cy.wait('@getRecipes')

    cy.contains('борщ').click();
    cy.url().should('include', '/recipes/');
    // cy.wait('@getRecipes')
    cy.contains('button', 'Вподобати рецепт').click();

    cy.wait('@toggleLike').its('response.statusCode').should('eq', 200);

    cy.contains('button', 'Вподобати рецепт').should('not.exist');
    cy.contains('button', 'Вподобано').should('exist');

    cy.contains('button', 'Вподобано').click();
    cy.wait('@toggleLike').its('response.statusCode').should('eq', 200);
  });

  it('успішно додає відгук до рецепту', () => {
    const reviewText = `Смачний рецепт! Дуже сподобався`;

    cy.get('input[placeholder="Пошук рецепту..."]').type('Борщ');

    cy.wait('@getRecipes');

    cy.contains('борщ').click();
    // cy.wait('@getRecipes');

    cy.get('img[alt="5 зірок"]').click();
    cy.get('textarea[id="review-text"]').type(reviewText);
    cy.contains('button', 'Надіслати відгук').click();

    cy.wait('@postReview').its('response.statusCode').should('eq', 409);

    cy.contains(reviewText).should('be.visible');
  });
});
