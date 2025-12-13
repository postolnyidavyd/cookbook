import MainPageRecipes from './MainPageRecipes';

describe('<MainPageRecipes />', () => {
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

  it('відображає фільтри та список рецептів', () => {
    cy.intercept('GET', '/api/recipes*', {
      statusCode: 200,
      body: { items: mockRecipes, total: 2 }
    }).as('getRecipes');

    cy.mount(<MainPageRecipes />);

    cy.wait('@getRecipes');

    cy.get('input[placeholder*="Пошук"]').should('be.visible');
    cy.contains('Український Борщ').should('be.visible');
    cy.contains('Грецький Салат').should('be.visible');
  });

  it('відображає кнопку "Показати більше" тільки коли рецептів багато', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 10 }
    }).as('getManyRecipes');

    cy.mount(<MainPageRecipes />);
    cy.wait('@getManyRecipes');

    cy.contains('Показати більше').should('be.visible')
      .and('have.attr', 'href')
      .and('include', '/recipes');
  });

  it('не відображає кнопку "Показати більше", якщо рецептів мало', () => {
    cy.intercept('GET', '/api/recipes*', {
      body: { items: mockRecipes, total: 5 }
    });

    cy.mount(<MainPageRecipes />);

    cy.contains('Показати більше').should('not.exist');
  });

  it('відображає скелетони під час завантаження', () => {
    cy.intercept('GET', '/api/recipes*', {
      delay: 1000,
      body: { items: [] }
    }).as('getDelayed');

    cy.mount(<MainPageRecipes />);

    cy.contains('Український Борщ').should('not.exist');
  });

  it('оновлює результати при введенні пошукового запиту', () => {
    // мокаємо початковий запит
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

    cy.mount(<MainPageRecipes />);
    cy.wait('@initialRequest');

    cy.get('input[placeholder*="Пошук"]').type('Суп');

    //тепер має відправитись новий запит з параметром input=Суп
    cy.wait('@searchRequest');
  });
});