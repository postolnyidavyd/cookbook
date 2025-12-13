describe('Створення та взаємодія з плейлистом', () => {
  beforeEach(() => {
    cy.autoIntercept();

    cy.login('test@gmail.com', 'postd@v34');
    cy.visit('/');
    cy.wait('@getMe');
    cy.wait('@getRecipes');
  });

  it('успішно створює новий плейлист та додає до нього рецепт', () => {
    const playlistName = `Плейлист ${Math.round(Math.random() * 1000)}`;

    cy.get('input[placeholder="Пошук рецепту..."]').type('Борщ');
    cy.wait('@getRecipes');

    cy.contains('Борщ', { matchCase: false }).click();
    cy.url().should('include', '/recipes/');

    cy.contains('button', 'Додати до плейлиста').click();

    cy.contains('button', '+ Створити плейлист').click();

    cy.get('input[name="name"]').type(playlistName);
    cy.get('textarea[name="description"]').type('Опис мого плейлиста');

    cy.get('input[type="file"]')
      .first()
      .selectFile('cypress/fixtures/playlistCover.jpg', { force: true });

    cy.contains('button', 'Створити').click();

    cy.wait('@postPlaylist').its('response.statusCode').should('eq', 201);

    cy.wait('@getPlaylists');
    cy.wait(500);
    cy.contains(playlistName).should('be.visible');

    cy.contains(playlistName).click({ force: true });

    cy.contains('button', 'Зберегти').click();

    cy.wait('@addRecipeToPlaylist')
      .its('response.statusCode')
      .should('eq', 200); // або 201

    cy.get('img[alt*="Збережено"]').should('exist');
  });

  it('успішно уподобує плейлист', () => {
    cy.wait('@getPlaylists');
    cy.wait(500);
    cy.contains('Для свят').click();
    
    cy.url().should('include', '/playlists/');
    
    cy.contains('button', 'Вподобати плейлист').click();
    cy.wait('@likePlaylist').its('response.statusCode').should('eq', 200);
    
    cy.contains('button', 'Вподобано').should('exist').click();
    cy.wait('@likePlaylist').its('response.statusCode').should('eq', 200);
    
    cy.contains('a', 'Кабінет').click();
    cy.url().should('include', '/profile');
    // cy.wait('@getMe'); // Чекаємо завантаження профілю
    
    // Перевіряємо, що у вкладці "Вподобані" цього плейлиста немає
    // (Припускаємо, що ми перемкнулись на таб "Вподобані плейлисти")
    // cy.contains('Вподобані плейлисти').click();
    cy.contains('Для свят').should('not.exist');
  });
});
