import RecipesPage from './RecipesPage';
import { createMemoryRouter } from 'react-router-dom';

describe('<RecipesPage />', () => {
  const mockRecipes = [
    {
      id: '1',
      title: 'Український Борщ',
      image: '/uploads/borsch.jpg',
      time: 60,
      difficulty: 'Середньо',
      rating: 5
    },
    {
      id: '2',
      title: 'Грецький Салат',
      image: '/uploads/salad.jpg',
      time: 15,
      difficulty: 'Легко',
      rating: 4.8
    }
  ];

  const mountPage = (initialUrl = '/') => {
    const router = createMemoryRouter(
      [{ path: '/', element: <RecipesPage /> }],
      { initialEntries: [initialUrl] }
    );
    cy.mount(null, { router });
  };

  it('відображає список рецептів та фільтри за замовчуванням', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 2, totalPages: 1, page: 1 }
    }).as('getRecipes');

    mountPage();

    cy.wait('@getRecipes').then((interception) => {
      const { query } = interception.request;
      expect(query.page).to.equal('1');
      expect(query.limit).to.equal('12');
      expect(query.sortBy).to.equal('popularity');
    });

    cy.get('input[placeholder*="Пошук"]').should('be.visible');
    cy.contains('Український Борщ').should('be.visible');
    cy.contains('Грецький Салат').should('be.visible');
  });

  it('відображає скелетони під час завантаження', () => {
    cy.intercept('GET', '/api/recipes*', {
      delay: 1000,
      body: { items: [] }
    }).as('getDelayed');

    mountPage();

    cy.get('[data-testid="skeleton"]').should('have.length', 12);
    cy.contains('Український Борщ').should('not.exist');
  });

  it('відображає повідомлення про помилку', () => {
    cy.intercept('GET', '/api/recipes*', {
      statusCode: 500,
      body: { message: 'Сервер не відповідає' }
    }).as('getError');

    mountPage();

    cy.wait('@getError');
    cy.contains('Сталася помилка').should('be.visible');
    cy.contains('Сервер не відповідає').should('be.visible');
  });

  it('відображає пустий стан, якщо рецептів немає', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: [], total: 0, totalPages: 1 }
    }).as('getEmpty');

    mountPage();
    cy.wait('@getEmpty');

    cy.contains('За вашим запитом нічого не знайдено').should('be.visible');
  });

  it('відображає пагінацію, якщо сторінок > 1', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 20, totalPages: 2, page: 1 }
    }).as('getPages');

    mountPage();
    cy.wait('@getPages');

    cy.contains('button', '1').should('be.visible');
    cy.get('img[alt="Права стрілка"]').should('be.visible');
  });

  it('не відображає пагінацію, якщо сторінка одна', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 2, totalPages: 1, page: 1 }
    });

    mountPage();
    cy.get('img[alt="Права стрілка"]').should('not.exist');
  });

  it('змінює сторінку при кліку на пагінацію', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 24, totalPages: 2, page: 1 }
    }).as('initialRequest');

    mountPage();
    cy.wait('@initialRequest');

    cy.intercept('GET', '/api/recipes*page=2*').as('page2Request');

    cy.get('img[alt="Права стрілка"]').closest('button').click();

    cy.wait('@page2Request');
  });

  it('виконує пошук і оновлює список', () => {
    cy.intercept('GET', '/api/recipes*', { body: { items: [], total: 0 } }).as('init');

    cy.intercept('GET', '/api/recipes*input=Soup*', {
      body: { items: [], total: 0 }
    }).as('searchRequest');

    mountPage();
    cy.wait('@init');

    cy.get('input[placeholder*="Пошук"]').type('Soup');

    cy.wait('@searchRequest');
  });

  it('додає інгредієнти до фільтрації', () => {
    cy.intercept('GET', '/api/recipes*', { body: { items: [], total: 0 } }).as('init');
    cy.intercept('GET', '/api/recipes*ingredients=Meat*', { body: { items: [], total: 0 } }).as('tagRequest');

    mountPage();
    cy.wait('@init');

    cy.get('input[placeholder*="Введіть інгредієнт"]').type('Meat{enter}');

    cy.wait('@tagRequest');

    cy.contains('button', 'Meat').should('be.visible');
  });

  it('ініціалізує стан із URL параметрів', () => {
    const url = '/?input=Music&page=3';

    cy.intercept('GET', '/api/recipes*', (req) => {
      expect(req.query.input).to.equal('Music');
      expect(req.query.page).to.equal('3');
      req.reply({ body: { items: [], total: 0 } });
    }).as('urlInitRequest');

    mountPage(url);

    cy.wait('@urlInitRequest');

    cy.get('input[placeholder*="Пошук"]').should('have.value', 'Music');
  });
});