import PlaylistCarouselSection from './PlaylistCarouselSection';

describe('<PlaylistCarouselSection />', () => {
  const mockPlaylists = [
    {
      id: '1',
      name: 'Сніданки',
      coverImage: 'img1.jpg',
      views: 100,
      recipesCount: 5,
      owner: { name: 'Chef', avatar: 'avatar.jpg' },
    },
    {
      id: '2',
      name: 'Обіди',
      coverImage: 'img2.jpg',
      views: 200,
      recipesCount: 10,
      owner: { name: 'Chef', avatar: 'avatar.jpg' },
    },
  ];

  it('робить запит з queryParams і відображає дані', () => {
    // Мокаємо API з очікуваними параметрами
    cy.intercept('GET', '/api/playlists*limit=5*', {
      statusCode: 200,
      body: { items: mockPlaylists },
    }).as('getPlaylists');

    cy.mount(
      <PlaylistCarouselSection
        title="Мої плейлисти"
        queryParams={{ limit: 5 }}
      />
    );

    cy.wait('@getPlaylists');

    cy.contains('h2', 'Мої плейлисти').should('be.visible');
    cy.contains('Сніданки').should('be.visible');
    cy.contains('Обіди').should('be.visible');
  });

  it('відображає скелетони під час завантаження', () => {
    cy.intercept('GET', '/api/playlists*', {
      delay: 1000,
      body: { items: [] },
    }).as('getPlaylistsDelayed');

    cy.mount(<PlaylistCarouselSection />);

    cy.get('[data-testid="carousel-track"]').should('exist');

    cy.contains('Сніданки').should('not.exist');
  });
  it('відображає помилку, якщо API впало', () => {
    cy.intercept('GET', '/api/playlists*', {
      statusCode: 500,
      body: { message: 'Сервер втомився' },
    });

    cy.mount(<PlaylistCarouselSection />);

    cy.contains('Сервер втомився').should('be.visible');
  });

  it('рендерить children (наприклад, кнопку)', () => {
    cy.intercept('GET', '/api/playlists*', { body: { items: [] } });

    cy.mount(
      <PlaylistCarouselSection title="Test">
        <button>Додати новий</button>
      </PlaylistCarouselSection>
    );

    cy.contains('button', 'Додати новий').should('be.visible');
  });
});
