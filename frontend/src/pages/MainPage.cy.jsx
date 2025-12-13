import MainPage from './MainPage';

describe('<MainPage />', () => {
  const mockRecipes = [
    {
      id: '1',
      title: 'Борщ',
      image: '/uploads/borsch.jpg',
      time: 60,
      difficulty: 'Середньо',
      rating: 5
    }
  ];

  const mockPlaylists = [
    {
      id: '1',
      name: 'Топ сніданків',
      coverImage: '/uploads/breakfast.jpg',
      views: 1000,
      recipesCount: 5,
      owner: { name: 'Admin', avatar: '/uploads/admin.jpg' }
    }
  ];

  it('успішно рендерить всі секції сторінки', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: [], total: 0 }
    }).as('getRecipes');

    cy.intercept('GET', '/api/playlists*', {
      body: { items: [], total: 0 }
    }).as('getPlaylists');

    cy.mount(<MainPage />);

    cy.get('h1').contains('Популярні плейлисти').should('be.visible');

    cy.get('button').contains('Переглянути рецепти').should('exist');
  });

  it('завантажує та відображає рецепти і плейлисти', () => {
    cy.intercept('GET', '/api/recipes*', {
      statusCode: 200,
      body: { items: mockRecipes, total: 1 }
    }).as('getRecipes');

    cy.intercept('GET', '/api/playlists*sortBy=viewsAmount*', {
      statusCode: 200,
      body: { items: mockPlaylists }
    }).as('getPlaylists');

    cy.mount(<MainPage />);

    cy.wait(['@getRecipes', '@getPlaylists']);

    cy.contains('Борщ').should('be.visible');
    cy.contains('Топ сніданків').should('be.visible');
  });

  it('відображає скелетони під час завантаження даних', () => {
    cy.intercept('GET', '/api/recipes*', {
      delay: 1000,
      body: { items: [] }
    });

    cy.intercept('GET', '/api/playlists*', {
      delay: 1000,
      body: { items: [] }
    });

    cy.mount(<MainPage />);

    cy.get('[data-testid="carousel-track"]').should('have.length.at.least', 1);
  });
});