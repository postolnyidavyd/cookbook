Cypress.Commands.add('autoIntercept', () => {
  // ----- Перехоплення запитів щодо авторизації\користувача -----

  //Очікування отримання інформація про авторизованого користувача
  cy.intercept('GET', '**/api/auth/me').as('getMe');
  //Очікування отримання аксес токену за допомого рефреш токену
  cy.intercept('POST', '**/api/auth/refresh').as('refreshToken');
  // Очікування реєстрації користувача
  cy.intercept('POST', '**/api/auth/register').as('registerUser');
  // Очікування входу користувача
  cy.intercept('POST', '**/api/auth/login').as('loginUser');
  //Очікування оновлення інформації про користувача
  cy.intercept('PATCH', '**/api/auth/me').as('updateMe');
  //Очікування виходу користувача
  cy.intercept('POST', '**/api/auth/logout').as('logoutUser');

  // ----- Перехоплення запитів щодо рецептів -----

  //Очікування отримування рецептів/рецепта
  cy.intercept('GET', '**/api/recipes*').as('getRecipes');
  //Очікування створення рецепта
  cy.intercept('POST', '**/api/recipes').as('postRecipe');
  //Очікування лайку рецепту
  cy.intercept('POST', '**/like').as('toggleLike');
  //Очікування додавання відгуку
  cy.intercept('POST', '**/reviews').as('postReview');
  //Очікування додавання рецепту до плейлиста
  cy.intercept("Post", '**/api/recipes/**/save').as('addRecipeToPlaylist');
  // ----- Перехоплення запитів щодо плейлистів -----

  //Очікування отримування плейлистів/плейлиста
  cy.intercept('GET', '**/api/playlists*').as('getPlaylists');

  //Очікування створення плейлиста або інших дій з плейлистами
  cy.intercept('POST', '**/api/playlists').as('postPlaylist');
  //Очікування лайку плейлиста
  cy.intercept("POST", '**/api/playlists/**/like').as('likePlaylist');
  // ----- Перехоплення запитів щодо завантаження  -----
  //Очікування завантаження файлів
  cy.intercept('POST', '**/api/upload*').as('uploadFile');
});
