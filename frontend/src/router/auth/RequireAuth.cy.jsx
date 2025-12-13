import RequireAuth from './RequireAuth';
import { createMemoryRouter } from 'react-router-dom';

describe('<RequireAuth />', () => {
  it('перенаправляє на сторінку реєстрації, якщо користувач не авторизований', () => {
    const router = createMemoryRouter([
      {
        path: '/protected',
        element: <RequireAuth />,
      },
      {
        path: '/register',
        element: <div data-testid="register-page">Сторінка реєстрації</div>,
      },
    ], {
      initialEntries: ['/protected'],
    });

    cy.mount(null, {
      router,
      initialState: { auth: { isAuthenticated: false } }
    });

    cy.get('[data-testid="register-page"]').should('be.visible');
  });

  it('відображає дочірній контент, якщо користувач авторизований', () => {
    const router = createMemoryRouter([
      {
        path: '/protected',
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <div data-testid="protected-content">Захищений контент</div>,
          },
        ],
      },
    ], {
      initialEntries: ['/protected'],
    });

    cy.mount(null, {
      router,
      initialState: { auth: { isAuthenticated: true } }
    });

    cy.get('[data-testid="protected-content"]').should('be.visible');
  });
});