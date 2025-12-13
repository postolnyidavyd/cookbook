import LoginModal from './LoginModal';

describe('<LoginModal />', () => {
  const openState = {
    ui: { showLoginModal: true },
    auth: { isAuthenticated: false }
  };

  it('не відображається, якщо showLoginModal: false', () => {
    cy.mount(<LoginModal />, {
      initialState: { ui: { showLoginModal: false } }
    });

    cy.contains('Ласкаво просимо назад!').should('not.be.visible');
  });

  it('відображає форму входу, коли відкрито', () => {
    cy.mount(<LoginModal />, { initialState: openState });

    cy.contains('Ласкаво просимо назад!').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('button', 'Увійти').should('be.visible');
  });

  it('показує помилки валідації', () => {
    cy.mount(<LoginModal />, { initialState: openState });

    cy.contains('button', 'Увійти').click();

    cy.contains('Введіть електронну адресу').should('be.visible');
    cy.contains('Введіть пароль').should('be.visible');

    cy.get('input[name="email"]').type('bad-email@test');
    cy.contains('button', 'Увійти').click();
    cy.contains('Введіть коректну електронну адресу').should('be.visible');

    cy.get('input[name="password"]').type('123');
    cy.contains('button', 'Увійти').click();
    cy.contains('Довжина пароля має бути хоча би 6 символів').should('be.visible');
  });

  it('успішно логінить користувача', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        accessToken: 'fake_token',
        user: { id: '1', name: 'Chef' }
      }
    }).as('loginRequest');

    cy.mount(<LoginModal />, { initialState: openState });

    cy.get('input[name="email"]').type('chef@test.com');
    cy.get('input[name="password"]').type('password123');

    cy.contains('button', 'Увійти').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.request.body).to.deep.include({
        email: 'chef@test.com',
        password: 'password123'
      });
    });
  });

  it('показує помилку від сервера', () => {
    const errorMessage = 'Невірний логін або пароль';

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { message: errorMessage }
    }).as('loginFail');

    cy.mount(<LoginModal />, { initialState: openState });

    cy.get('input[name="email"]').type('chef@test.com');
    cy.get('input[name="password"]').type('wrongpass');
    cy.contains('button', 'Увійти').click();

    cy.wait('@loginFail');

    cy.contains(errorMessage).should('be.visible');
    cy.get('input[name="email"]').should('have.value', 'chef@test.com');
  });

  it('має посилання на реєстрацію', () => {
    cy.mount(<LoginModal />, { initialState: openState });

    cy.contains('a', 'Зареєструватися').should('have.attr', 'href', '/register');
  });
});