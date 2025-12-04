import PlaylistsPage from './PlaylistsPage';
import { createMemoryRouter } from 'react-router-dom';

describe('<PlaylistsPage />', () => {
  const mockPlaylists = [
    {
      id: '1',
      name: 'Ранкова кава',
      coverImage: '/uploads/morning.jpg',
      recipesCount: 5,
      views: 120,
      owner: { name: 'Admin', avatar: '/uploads/admin.jpg' }
    },
    {
      id: '2',
      name: 'Вечірка',
      coverImage: '/uploads/party.jpg',
      recipesCount: 10,
      views: 300,
      owner: { name: 'Chef', avatar: '/uploads/chef.jpg' }
    }
  ];

  const mountPage = (initialUrl = '/playlists') => {
    const router = createMemoryRouter(
      [{ path: '/playlists', element: <PlaylistsPage /> }],
      { initialEntries: [initialUrl] }
    );
    cy.mount(null, { router });
  };

  it('відображає список плейлистів та фільтри за замовчуванням', () => {
    cy.intercept('GET', '/api/playlists*', {
      body: { items: mockPlaylists, total: 2, totalPages: 1 }
    }).as('getPlaylists');

    mountPage();

    cy.wait('@getPlaylists').then((interception) => {
      const { query } = interception.request;
      expect(query.page).to.equal('1');
      expect(query.limit).to.equal('12');
      expect(query.sortBy).to.equal('popularity');
    });

    cy.contains('Ранкова кава').should('be.visible');
    cy.contains('Вечірка').should('be.visible');
    cy.get('input[placeholder*="Пошук"]').should('be.visible');
  });

  it('відображає скелетони під час завантаження', () => {
    cy.intercept('GET', '/api/playlists*', {
      delay: 1000,
      body: { items: [] }
    }).as('getDelayed');

    mountPage();

    cy.get('[data-testid="skeleton"]').should('have.length', 12);
    cy.contains('Ранкова кава').should('not.exist');
  });

  it('відображає повідомлення про помилку', () => {
    cy.intercept('GET', '/api/playlists*', {
      statusCode: 500,
      body: { message: 'Сервер не відповідає' }
    }).as('getError');

    mountPage();

    cy.wait('@getError');
    cy.contains('Сталася помилка').should('be.visible');
    cy.contains('Сервер не відповідає').should('be.visible');
  });

  it('відображає пустий стан, якщо плейлистів немає', () => {
    cy.intercept('GET', '/api/playlists*', {
      body: { items: [], total: 0 }
    }).as('getEmpty');

    mountPage();
    cy.wait('@getEmpty');

    cy.contains('За вашим запитом нічого не знайдено').should('be.visible');
  });

  it('відображає пагінацію, якщо сторінок > 1', () => {
    cy.intercept('GET', '/api/playlists*', {
      body: { items: mockPlaylists, total: 20, totalPages: 2, page: 1 }
    }).as('getPages');

    mountPage();
    cy.wait('@getPages');

    cy.contains('button', '1').should('be.visible');
    cy.get('img[alt="Права стрілка"]').should('be.visible');
  });

  it('не відображає пагінацію, якщо сторінка одна', () => {
    cy.intercept('GET', '/api/playlists*', {
      body: { items: mockPlaylists, total: 2, totalPages: 1, page: 1 }
    });

    mountPage();
    cy.get('img[alt="Права стрілка"]').should('not.exist');
  });

  it('змінює сторінку при кліку на пагінацію', () => {
    cy.intercept('GET', '/api/playlists*', {
      body: { items: mockPlaylists, total: 24, totalPages: 2, page: 1 }
    }).as('initialRequest');

    mountPage();
    cy.wait('@initialRequest');

    cy.intercept('GET', '/api/playlists*page=2*').as('page2Request');

    cy.get('img[alt="Права стрілка"]').closest('button').click();

    cy.wait('@page2Request');
  });

  it('виконує пошук і оновлює список', () => {
    cy.intercept('GET', '/api/playlists*', { body: { items: [], total: 0 } }).as('init');

    cy.intercept('GET', '/api/playlists*input=Summer*', {
      body: { items: [], total: 0 }
    }).as('searchRequest');

    mountPage();
    cy.wait('@init');

    cy.get('input[placeholder*="Пошук"]').type('Summer');

    cy.wait('@searchRequest');
  });

  it('додає теги до фільтрації', () => {
    cy.intercept('GET', '/api/playlists*', { body: { items: [], total: 0 } }).as('init');
    cy.intercept('GET', '/api/playlists*tags=Rock*', { body: { items: [], total: 0 } }).as('tagRequest');

    mountPage();
    cy.wait('@init');

    cy.get('input[placeholder*="Введіть тег"]').type('Rock{enter}');

    cy.wait('@tagRequest');

    cy.contains('button', 'Rock').should('be.visible');
  });

  it('ініціалізує стан із URL параметрів', () => {
    const url = '/playlists?input=Music&page=3';

    cy.intercept('GET', '/api/playlists*', (req) => {
      expect(req.query.input).to.equal('Music');
      expect(req.query.page).to.equal('3');
      req.reply({ body: { items: [], total: 0 } });
    }).as('urlInitRequest');

    mountPage(url);

    cy.wait('@urlInitRequest');

    cy.get('input[placeholder*="Пошук"]').should('have.value', 'Music');
  });
});