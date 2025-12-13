import RegisterPage from './RegisterPage';
import { createMemoryRouter } from 'react-router-dom';

describe('<RegisterPage />', () => {
  const mockUser = {
    email: 'test@example.com',
    surname: 'Петренко',
    name: 'Іван',
    password: 'password123'
  };

  it('успішно відображає форму реєстрації', () => {
    cy.mount(<RegisterPage />);

    cy.contains('h1', 'Реєстрація').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="surname"]').should('be.visible');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('button', 'Зареєструватися').should('be.visible');
  });

  it('показує помилки валідації для порожніх полів', () => {
    cy.mount(<RegisterPage />);

    cy.contains('button', 'Зареєструватися').click();

    cy.contains('Введіть електронну адресу').should('be.visible');
    cy.contains('Введіть прізвище').should('be.visible');
    cy.contains("Введіть ім'я").should('be.visible');
    cy.contains('Введіть пароль').should('be.visible');
  });

  it('показує помилку для некоректного email', () => {
    cy.mount(<RegisterPage />);

    cy.get('input[name="email"]').type('invalid-email@test');
    cy.contains('button', 'Зареєструватися').click();

    cy.contains('Введіть коректну електронну адресу').should('be.visible');
  });

  it('показує помилку для короткого пароля', () => {
    cy.mount(<RegisterPage />);

    cy.get('input[name="password"]').type('12345');
    cy.contains('button', 'Зареєструватися').click();

    cy.contains('Довжина пароля має бути хоча би 6 символів').should('be.visible');
  });

  it('успішно реєструє користувача та перенаправляє на головну сторінку', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 201,
      body: { success: true }
    }).as('registerRequest');

    const router = createMemoryRouter([
      { path: '/register', element: <RegisterPage /> },
      { path: '/', element: <div data-testid="home-page">Головна</div> }
    ], {
      initialEntries: ['/register']
    });

    cy.mount(null, { router });

    cy.get('input[name="email"]').type(mockUser.email);
    cy.get('input[name="surname"]').type(mockUser.surname);
    cy.get('input[name="name"]').type(mockUser.name);
    cy.get('input[name="password"]').type(mockUser.password);

    cy.contains('button', 'Зареєструватися').click();

    cy.wait('@registerRequest').then((interception) => {
      const { email, password, username } = interception.request.body;
      expect(email).to.equal(mockUser.email);
      expect(password).to.equal(mockUser.password);
      expect(username).to.equal(`${mockUser.surname} ${mockUser.name} `);
    });

    cy.get('[data-testid="home-page"]').should('be.visible');
  });

  it('перенаправляє на попередню сторінку після успішної реєстрації', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 201,
      body: { success: true }
    }).as('registerRequest');

    const router = createMemoryRouter([
      { path: '/register', element: <RegisterPage /> },
      { path: '/protected', element: <div data-testid="protected-page">Захищена сторінка</div> }
    ], {
      initialEntries: [
        { pathname: '/register', state: { from: '/protected' } }
      ]
    });

    cy.mount(null, { router });

    cy.get('input[name="email"]').type(mockUser.email);
    cy.get('input[name="surname"]').type(mockUser.surname);
    cy.get('input[name="name"]').type(mockUser.name);
    cy.get('input[name="password"]').type(mockUser.password);

    cy.contains('button', 'Зареєструватися').click();

    cy.wait('@registerRequest');

    cy.get('[data-testid="protected-page"]').should('be.visible');
  });

  it('відображає помилку сервера та зберігає введені дані', () => {
    const errorMessage = 'Ця пошта вже використовується';

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 409,
      body: { message: errorMessage }
    }).as('registerFail');

    cy.mount(<RegisterPage />);

    cy.get('input[name="email"]').type(mockUser.email);
    cy.get('input[name="surname"]').type(mockUser.surname);
    cy.get('input[name="name"]').type(mockUser.name);
    cy.get('input[name="password"]').type(mockUser.password);

    cy.contains('button', 'Зареєструватися').click();

    cy.wait('@registerFail');

    cy.contains(errorMessage).should('be.visible');

    cy.get('input[name="email"]').should('have.value', mockUser.email);
    cy.get('input[name="surname"]').should('have.value', mockUser.surname);
    cy.get('input[name="name"]').should('have.value', mockUser.name);
  });

  it('відображає загальну помилку сервера при відсутності повідомлення', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 500,
      body: {}
    }).as('registerFailUnknown');

    cy.mount(<RegisterPage />);

    cy.get('input[name="email"]').type(mockUser.email);
    cy.get('input[name="surname"]').type(mockUser.surname);
    cy.get('input[name="name"]').type(mockUser.name);
    cy.get('input[name="password"]').type(mockUser.password);

    cy.contains('button', 'Зареєструватися').click();

    cy.wait('@registerFailUnknown');

    cy.contains('Невідома помилка спробуйте пізніше').should('be.visible');
  });
});