describe("Створення рецепту", () => {
beforeEach(() => {
    cy.autoIntercept();
    cy.login('test@gmail.com', 'postd@v34');

    cy.visit('/profile/new-recipe');
    cy.wait('@getMe');
}); 
it("успішно створює новий рецепт", () => {
    cy.get('input[type="file"]').first().selectFile('cypress/fixtures/cover.jpg', { force: true });
    cy.get('input[id="recipe-name"]').type("Яєчня з помідорами");
    cy.get('textarea[id="recipe-desc"]').type("Смачний сніданок для всієї родини.");
    cy.get('input[id="cooking-time"]').type("15");
    cy.get('select[id="recipe-difficulty"]').select("Легко");

    cy.get('input[id="portion-amount"]').clear().type("2");


    cy.get('input[id="1-recipe-name"]').type("Яйця");
    cy.get('input[id="1-recipe-amount"]').type("4");
    cy.get('input[id="1-recipe-unit"]').type("шт");
    cy.contains('h5', 'Для основної страви')
      .parents('div')
      .find('button')
      .contains(/^Додати$/)
      .click();

    cy.get('input[id="1-recipe-name"]').type("Помідори");
    cy.get('input[id="1-recipe-amount"]').type("2");
    cy.get('input[id="1-recipe-unit"]').type("шт");
    cy.contains('h5', 'Для основної страви')
      .parents('div')
      .find('button')
      .contains(/^Додати$/)
      .click();
    
    cy.get('input[id="0-step-name"]').type("Підготовка інгредієнтів");
    cy.get('textarea[id="0-step-description"]').type("Помити та нарізати помідори.");

    cy.get('input[id="1-step-name"]').type("Приготування яєчні");
    cy.get('textarea[id="1-step-description"]').type("Збити яйця та обсмажити з помідорами.");

    cy.contains('button', "Додати крок").click();
    cy.get('input[id="2-step-name"]').type("Подача");
    cy.get('textarea[id="2-step-description"]').type("Викласти яєчню на тарілку та прикрасити зеленню.");

    cy.contains('button', "Створити рецепт").click();
    cy.wait('@postRecipe').its('response.statusCode').should('eq', 201);
    cy.url().should('not.include', '/profile/new-recipe');

    cy.contains("Яєчня з помідорами").should("exist");

});


});