import PlaylistSelectionView from './PlaylistSelectionView';

describe('<PlaylistSelectionView />', () => {
  const recipeId = 'recipe_123';

  // Мок-дані для плейлистів
  const mockPlaylists = [
    {
      id: '1',
      name: 'Сніданки',
      recipesCount: 5,
      hasRecipe: true,
    },
    {
      id: '2',
      name: 'Вечеря',
      recipesCount: 2,
      hasRecipe: false,
    },
    {
      id: '3',
      name: 'Святкове',
      recipesCount: 10,
      hasRecipe: false,
    },
  ];

  const initialState = {
    auth: { user: { id: 'user_1' } },
  };

  beforeEach(() => {
    cy.intercept('GET', '/api/playlists*', {
      body: { items: mockPlaylists },
    }).as('getPlaylists');

    cy.intercept('POST', '/api/recipes/*/save', {
      statusCode: 200,
      body: { success: true },
    }).as('saveRequest');
  });

  it('відображає список плейлистів і попередньо вибирає ті, де рецепт вже є', () => {
    cy.mount(
      <PlaylistSelectionView
        recipeId={recipeId}
        onClose={cy.spy()}
        onCreateNew={cy.spy()}
      />,
      { initialState }
    );

    cy.wait('@getPlaylists');

    cy.contains('Сніданки')
      .parent()
      .find('input[type="checkbox"]')
      .should('be.checked');

    cy.contains('Вечеря')
      .parent()
      .find('input[type="checkbox"]')
      .eq(1)
      .should('not.be.checked');

    cy.contains('button', 'Зберегти (1)').should('be.visible');
  });

  it('фільтрує плейлисти через пошук', () => {
    cy.mount(<PlaylistSelectionView recipeId={recipeId} onClose={cy.spy()} />, {
      initialState,
    });
    cy.wait('@getPlaylists');

    cy.get('input[placeholder="Знайти плейлист..."]').type('Веч');

    cy.contains('Вечеря').should('be.visible');

    cy.contains('Сніданки').should('not.exist');
  });

  it('показує Empty State, якщо нічого не знайдено', () => {
    cy.mount(<PlaylistSelectionView recipeId={recipeId} />, { initialState });
    cy.wait('@getPlaylists');

    cy.get('input[placeholder="Знайти плейлист..."]').type('Неіснуючий');

    cy.contains('Плейлистів не знайдено').should('be.visible');
  });

  it('додає та знімає вибір при кліку', () => {
    cy.mount(<PlaylistSelectionView recipeId={recipeId} />, { initialState });
    cy.wait('@getPlaylists');

    cy.contains('Вечеря').click();
    cy.contains('button', 'Зберегти (2)').should('be.visible');

    cy.contains('Сніданки').click();
    cy.contains('button', 'Зберегти (1)').should('be.visible');

    cy.contains('Сніданки').parent().find('input').eq(0).should('not.be.checked');
  });

  it('відправляє правильні ID при збереженні', () => {
    const onCloseSpy = cy.spy().as('onClose');

    cy.mount(
      <PlaylistSelectionView recipeId={recipeId} onClose={onCloseSpy} />,
      { initialState }
    );
    cy.wait('@getPlaylists');

    cy.contains('Вечеря').click();

    cy.contains('button', 'Зберегти').click();

    cy.wait('@saveRequest').then((interception) => {
      const { playlistIds } = interception.request.body;

      expect(playlistIds).to.have.length(2);
      expect(playlistIds).to.include('1');
      expect(playlistIds).to.include('2');
    });

    cy.get('@onClose').should('have.been.called');
  });

  it('викликає onCreateNew при кліку на "Створити плейлист"', () => {
    const onCreateSpy = cy.spy().as('onCreateNew');

    cy.mount(
      <PlaylistSelectionView recipeId={recipeId} onCreateNew={onCreateSpy} />,
      { initialState }
    );

    cy.contains('button', '+ Створити плейлист').click();
    cy.get('@onCreateNew').should('have.been.called');
  });
});
