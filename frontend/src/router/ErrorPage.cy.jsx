import ErrorPage from './ErrorPage';
import { createMemoryRouter } from 'react-router-dom';

describe('<ErrorPage />', () => {
  // Перед кожним тестом мокаємо запити getMe бо рендерится Navbar
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/me', { body: { user: null } });
  });

  // 404
  it('відображає повідомлення про 404 помилку', () => {
    const Throw404 = () => {
      throw new Response('Not Found', { status: 404 });
    };

    const router = createMemoryRouter([
      {
        path: '/',
        element: <Throw404 />,
        errorElement: <ErrorPage />,
      },
    ]);

    cy.mount(null, { router });

    cy.contains('Не знайдено сторінку!').should('be.visible');
    cy.contains('Не вдалося знайти ресурс або сторінку.').should('be.visible');
  });

  // 500
  it('відображає повідомлення про 500 помилку з даними сервера', () => {
    const errorMessage = 'Сервер перегрівся';

    const Throw500 = () => {
      throw {
        status: 500,
        statusText: 'Internal Server Error',
        data: JSON.stringify({ message: errorMessage }),
      };
    };
    const router = createMemoryRouter([
      {
        path: '/',
        element: <Throw500 />,
        errorElement: <ErrorPage />,
      },
    ]);

    cy.mount(null, { router });

    cy.contains('Помилка сервера!').should('be.visible');
    cy.contains('Сервер перегрівся').should('be.visible');
  });

  // Невідома помилка
  it('відображає дефолтне повідомлення для інших помилок', () => {
    const ThrowError = () => {
      throw new Error('Випадковий баг');
    };

    const router = createMemoryRouter([
      {
        path: '/',
        element: <ThrowError />,
        errorElement: <ErrorPage />,
      },
    ]);

    cy.mount(null, { router });

    cy.contains('Сталася помилка!').should('be.visible');
    cy.contains('Щось пішло не так').should('be.visible');
  });

  it('рендерить Navbar навіть при помилці', () => {
    const Throw404 = () => {
      throw new Response('', { status: 404 });
    };

    const router = createMemoryRouter([
      {
        path: '/',
        element: <Throw404 />,
        errorElement: <ErrorPage />,
      },
    ]);

    cy.mount(null, { router });

    cy.get('nav').should('exist');
  });
});
