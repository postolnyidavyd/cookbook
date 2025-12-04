import PlaylistsRecipeBrowser from './PlaylistsRecipeBrowser';

describe('<PlaylistsRecipeBrowser />', () => {
  const mockRecipes = [
    {
      id: '1',
      title: 'Грецький салат',
      image: '/uploads/salad.jpg',
      time: 15,
      difficulty: 'Легко',
      rating: 4.5
    },
    {
      id: '2',
      title: 'Стейк',
      image: '/uploads/steak.jpg',
      time: 40,
      difficulty: 'Складно',
      rating: 5
    }
  ];

  const defaultFilters = {
    page: 1,
    limit: 12,
    input: '',
    ingredients: '',
    difficulty: '',
    time: '',
    sortBy: 'popularity',
  };

  it('відображає список рецептів та панель фільтрів', () => {
    cy.intercept('GET', '/api/recipes*', {
      statusCode: 200,
      body: { items: mockRecipes, total: 2, totalPages: 1 }
    }).as('getRecipes');

    cy.mount(<PlaylistsRecipeBrowser filters={defaultFilters} />);

    cy.wait('@getRecipes');

    cy.get('input[placeholder*="Пошук"]').should('be.visible');
    cy.contains('Грецький салат').should('be.visible');
    cy.contains('Стейк').should('be.visible');
  });

  it('відображає скелетони під час завантаження', () => {
    cy.intercept('GET', '/api/recipes*', {
      delay: 1000,
      body: { items: [] }
    }).as('getDelayed');

    cy.mount(<PlaylistsRecipeBrowser filters={defaultFilters} />);

    cy.get('[data-testid="skeleton"]').should('have.length', 12);
  });

  it('відображає пагінацію, коли сторінок більше однієї', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 20, totalPages: 5, page: 1 }
    }).as('getManyRecipes');

    cy.mount(<PlaylistsRecipeBrowser filters={defaultFilters} />);

    cy.wait('@getManyRecipes');

    cy.contains('button', '1').should('be.visible');
    cy.get('img[alt="Права стрілка"]').should('be.visible');
  });

  it('не відображає пагінацію, коли сторінка одна', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 2, totalPages: 1, page: 1 }
    });

    cy.mount(<PlaylistsRecipeBrowser filters={defaultFilters} />);

    cy.get('img[alt="Права стрілка"]').should('not.exist');
  });

  it('оновлює запит при зміні сторінки', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 20, totalPages: 5, page: 1 }
    }).as('initialRequest');

    cy.mount(<PlaylistsRecipeBrowser filters={defaultFilters} />);
    cy.wait('@initialRequest');

    cy.intercept('GET', '/api/recipes*page=2*').as('pageRequest');

    cy.get('img[alt="Права стрілка"]').closest('button').click();

    cy.wait('@pageRequest');
  });

  it('виконує пошук при введенні тексту', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 2 }
    }).as('initialRequest');
    cy.intercept({
      method: 'GET',
      pathname: '/api/recipes', // Шлях без параметрів
      query: {
        input: 'Суп', // cypress сам декодує url і знайде цей параметр
      }
    }, {
      body: { items: [], total: 0 }
    }).as('searchRequest');

    cy.mount(<PlaylistsRecipeBrowser filters={defaultFilters} />);
    cy.wait('@initialRequest');

    // cy.intercept('GET', '/api/recipes*input=Суп*').as('searchRequest');

    cy.get('input[placeholder*="Пошук"]').type('Суп');

    cy.wait('@searchRequest');
  });
});