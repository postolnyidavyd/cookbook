import RecipeCarouselSection from './RecipeCarouselSection';

describe('<RecipeCarouselSection />', () => {
  const mockRecipes = [
    {
      id: '1',
      title: 'Борщ',
      image: 'borsch.jpg',
      time: 60,
      difficulty: 'Середньо',
      rating: 5,
    },
    {
      id: '2',
      title: 'Вареники',
      image: 'varenyky.jpg',
      time: 40,
      difficulty: 'Легко',
      rating: 4.8,
    },
  ];

  it('робить запит і відображає рецепти', () => {
    cy.intercept('GET', '/api/recipes*limit=5*', {
      statusCode: 200,
      body: { items: mockRecipes },
    }).as('getRecipes');

    cy.mount(
      <RecipeCarouselSection title="Свіжі рецепти" queryParams={{ limit: 5 }} />
    );

    cy.wait('@getRecipes');

    cy.contains('h2', 'Свіжі рецепти').should('be.visible');
    cy.contains('Борщ').should('be.visible');
    cy.contains('Вареники').should('be.visible');
    cy.contains('Середньо').should('be.visible');
  });

  it('відображає скелетони під час завантаження', () => {
    cy.intercept('GET', '/api/recipes*', {
      delay: 1000,
      body: { items: [] },
    }).as('getRecipesDelayed');

    cy.mount(<RecipeCarouselSection />);

    cy.get('[data-testid="carousel-track"]').should('exist');
    cy.contains('Борщ').should('not.exist');
  });

  it('відображає помилку при збої API', () => {
    cy.intercept('GET', '/api/recipes*', {
      statusCode: 500,
      body: { message: 'Помилка завантаження' },
    });

    cy.mount(<RecipeCarouselSection />);

    cy.contains('Помилка завантаження').should('be.visible');
  });

  it('рендерить children та передає alignChildren', () => {
    cy.intercept('GET', '/api/recipes*', { body: { items: [] } });

    cy.mount(
      <RecipeCarouselSection title="Тест" alignChildren="center">
        <button>Всі рецепти</button>
      </RecipeCarouselSection>
    );

    cy.contains('button', 'Всі рецепти').should('be.visible');

    cy.contains('h2', 'Тест')
      .parent()
      .should('have.css', 'justify-content', 'center');
  });
});