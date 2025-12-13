import NewRecipePage from './NewRecipePage';

describe('<NewRecipePage />', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/recipes', {
      statusCode: 201,
      body: { id: '123', title: 'Новий рецепт' },
    }).as('createRecipe');

    cy.intercept('POST', '/api/upload/image', {
      statusCode: 201,
      body: { url: '/uploads/test.jpg' },
    }).as('uploadImage');
  });

  it('успішно заповнює форму та відправляє дані', () => {
    cy.mount(<NewRecipePage />);

    cy.get('#recipe-name').type('Борщ');
    cy.get('#recipe-desc').type('Традиційний рецепт');
    cy.get('#cooking-time').type('120');
    cy.get('select').select(1);

    cy.get('input[type="file"]')
      .first()
      .selectFile(
        {
          contents: Cypress.Buffer.from('fake image'),
          fileName: 'cover.jpg',
          mimeType: 'image/jpeg',
        },
        { force: true }
      );

    cy.get('#1-recipe-name').type('Буряк');
    cy.get('#1-recipe-amount').type('2');
    cy.get('#1-recipe-unit').type('шт');

    cy.contains('Для основної страви')
      .parent()
      .parent()
      .find('button')
      .contains('Додати')
      .click();

    cy.contains('p', 'Буряк').should('be.visible');

    cy.get('#0-step-name').type('Підготовка');
    cy.get('#0-step-description').type('Помити овочі');

    cy.contains('button', 'Створити рецепт').click();

    cy.wait('@createRecipe').then((interception) => {
      expect(interception.request.headers['content-type']).to.include(
        'multipart/form-data'
      );
    });
  });

  it('показує попередження, якщо обовʼязкові поля не заповнені', () => {
    cy.mount(<NewRecipePage />);

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.contains('button', 'Створити рецепт').click();

    cy.get('@alertStub').should(
      'have.been.calledWith',
      "Будь ласка, заповніть обов'язкові поля!"
    );
  });

  it('блокує кнопку під час відправки запиту', () => {
    cy.intercept('POST', '/api/recipes', {
      delay: 1000,
      body: {},
    }).as('delayedRequest');

    cy.mount(<NewRecipePage />);

    cy.get('#recipe-name').type('Тест');
    cy.get('#cooking-time').type('10');
    cy.get('select').select(1);

    cy.get('input[type="file"]')
      .first()
      .selectFile(
        {
          contents: Cypress.Buffer.from('x'),
          fileName: 'x.jpg',
        },
        { force: true }
      );

    cy.contains('button', 'Створити рецепт').click();

    cy.contains('button', 'Створення...').should('be.disabled');
  });

  it('додає та видаляє кроки приготування', () => {
    cy.mount(<NewRecipePage />);

    cy.contains('1 крок').should('be.visible');
    cy.contains('2 крок').should('be.visible');

    cy.contains('button', 'Додати крок').click();
    cy.contains('3 крок').should('be.visible');

    cy.contains('3 крок').parent().find('button').click();
    cy.contains('3 крок').should('not.exist');
  });

  it('додає нову категорію інгредієнтів та видаляє існуючу', () => {
    cy.mount(<NewRecipePage />);

    cy.contains('Для соусу').should('be.visible');
    cy.contains('Для соусу').parent().find('button').click();
    cy.contains('Для соусу').should('not.exist');

    cy.get('#category-name').type('Декор');
    cy.contains('button', 'Додати категорію').click();
    cy.contains('h5', 'Декор').should('be.visible');
  });

  it('додає та видаляє конкретний інгредієнт', () => {
    cy.mount(<NewRecipePage />);

    cy.get('#1-recipe-name').type('Тестовий інгредієнт');
    cy.get('#1-recipe-amount').type('100');

    cy.contains('Для основної страви')
      .parent()
      .parent()
      .find('button')
      .contains('Додати')
      .click();

    cy.contains('p', 'Тестовий інгредієнт').should('be.visible');

    cy.contains('li', 'Тестовий інгредієнт')
      .find('img[alt="Видалити"]')
      .parent()
      .click();

    cy.contains('p', 'Тестовий інгредієнт').should('not.exist');
  });

  it('відображає превʼю при завантаженні фото для кроку', () => {
    cy.mount(<NewRecipePage />);

    cy.get('input[type="file"]')
      .eq(1)
      .selectFile(
        {
          contents: Cypress.Buffer.from('step-img'),
          fileName: 'step.jpg',
          mimeType: 'image/jpeg',
        },
        { force: true }
      );

    cy.contains('1 крок')
      .parent()
      .parent()
      .find('img[alt="Прев\'ю зображення"]')
      .should('be.visible');
  });

  it('обробляє помилку сервера при створенні', () => {
    cy.intercept('POST', '/api/recipes', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('createFail');

    cy.mount(<NewRecipePage />);

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('#recipe-name').type('Fail Recipe');
    cy.get('#cooking-time').type('10');
    cy.get('select').select(1);
    cy.get('input[type="file"]')
      .first()
      .selectFile(
        {
          contents: Cypress.Buffer.from('x'),
          fileName: 'x.jpg',
        },
        { force: true }
      );

    cy.contains('button', 'Створити рецепт').click();
    cy.wait('@createFail');

    cy.get('@alertStub').should(
      'have.been.calledWith',
      'Помилка при створенні рецепту. Перевірте дані.'
    );
  });
});
