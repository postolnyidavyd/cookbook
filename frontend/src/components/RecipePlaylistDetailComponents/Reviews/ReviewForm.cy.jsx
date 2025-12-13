import ReviewForm from './ReviewForm';

describe('<ReviewForm />', () => {
  const recipeId = '123';

  it('відображає форму та елементи рейтингу', () => {
    cy.mount(<ReviewForm recipeId={recipeId} />);

    cy.contains('Залиште відгук').should('be.visible');
    cy.get('textarea[placeholder="Поділіться своїми враженнями..."]').should('be.visible');
    cy.contains('button', 'Надіслати відгук').should('be.visible');
    cy.get('button').find('img[alt*="зірок"]').should('have.length', 5);
  });

  it('показує помилки валідації при спробі відправки порожньої форми', () => {
    cy.mount(<ReviewForm recipeId={recipeId} />);

    cy.contains('button', 'Надіслати відгук').click();

    cy.contains('Додайте рейтинг').should('be.visible');
    cy.contains('Додайте текст відгуку').should('be.visible');
  });

  it('змінює текст підказки залежно від обраного рейтингу', () => {
    cy.mount(<ReviewForm recipeId={recipeId} />);

    cy.contains('Що вам сподобалося?').should('be.visible');

    cy.get('button').find('img[alt="2 зірок"]').closest('button').click();
    cy.contains('Що пішло не так?').should('be.visible');

    cy.get('button').find('img[alt="5 зірок"]').closest('button').click();
    cy.contains('Що вам сподобалося?').should('be.visible');
  });

  it('успішно відправляє відгук та очищує форму', () => {
    cy.intercept('POST', `/api/recipes/${recipeId}/reviews`, {
      statusCode: 201,
      body: { success: true }
    }).as('addReview');

    cy.mount(<ReviewForm recipeId={recipeId} />);

    cy.get('button').find('img[alt="5 зірок"]').closest('button').click();
    cy.get('textarea').type('Дуже смачний рецепт!');
    cy.contains('button', 'Надіслати відгук').click();

    cy.wait('@addReview').then((interception) => {
      expect(interception.request.body).to.deep.include({
        rating: 5,
        text: 'Дуже смачний рецепт!'
      });
    });

    cy.get('textarea').should('have.value', '');
  });

  it('відображає помилку від сервера', () => {
    const errorMessage = 'Ви вже залишили відгук';

    cy.intercept('POST', `/api/recipes/${recipeId}/reviews`, {
      statusCode: 400,
      body: { message: errorMessage }
    }).as('addReviewFail');

    cy.mount(<ReviewForm recipeId={recipeId} />);

    cy.get('button').find('img[alt="4 зірок"]').closest('button').click();
    cy.get('textarea').type('Нормально');
    cy.contains('button', 'Надіслати відгук').click();

    cy.wait('@addReviewFail');

    cy.contains(errorMessage).should('be.visible');
  });
});