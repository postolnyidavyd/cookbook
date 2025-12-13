import CreatePlaylistView from './CreatePlaylistView';

describe('<CreatePlaylistView />', () => {

  beforeEach(() => {
    cy.intercept('POST', '/api/playlists', {
      statusCode: 201,
      body: { id: 'new_id', name: 'New Playlist' }
    }).as('createRequest');
  });

  it('відображає помилки валідації, якщо поля пусті', () => {
    cy.mount(<CreatePlaylistView />);

    cy.contains('button', 'Створити').click();

    cy.contains("Введіть ім'я").should('be.visible');
    cy.contains('Введіть опис').should('be.visible');
    cy.contains('Додайте зображення').should('be.visible');
  });

  it('додає та видаляє теги', () => {
    cy.mount(<CreatePlaylistView />);

    cy.get('input[placeholder="тег"]').type('Сніданок');
    cy.contains('button', 'Додати').click();
    cy.contains('button', 'Сніданок').should('be.visible');

    cy.get('input[placeholder="тег"]').type('Швидко{enter}');
    cy.contains('button', 'Швидко').should('be.visible');

    cy.contains('button', 'Сніданок').click();
    cy.contains('button', 'Сніданок').should('not.exist');
    cy.contains('button', 'Швидко').should('be.visible');
  });

  it('дозволяє завантажити фото та показує превʼю', () => {
    cy.mount(<CreatePlaylistView />);

    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('fake image'),
      fileName: 'cover.png',
      mimeType: 'image/png',
    }, { force: true });

    cy.get('img[alt="Прев\'ю зображення"]')
      .should('have.attr', 'src')
      .and('include', 'blob:');

    cy.contains('button', 'Створити').click();
    cy.contains('Додайте зображення').should('not.exist');
  });

  it('відправляє дані та викликає onCreate при успіху', () => {
    const onCreateSpy = cy.spy().as('onCreate');

    cy.mount(<CreatePlaylistView onCreate={onCreateSpy} />);

    cy.get('input[name="name"]').type('Мій супер плейлист');
    cy.get('textarea[name="description"]').type('Опис для тесту');


    cy.get('input[placeholder="тег"]').type('Тест{enter}');


    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('img'),
      fileName: 'test.png',
      mimeType: 'image/png',
    }, { force: true });


    cy.contains('button', 'Створити').click();


    cy.wait('@createRequest').then((interception) => {
      expect(interception.request.headers['content-type']).to.include('multipart/form-data');
    });

    cy.get('@onCreate').should('have.been.called');
  });

  it('відображає помилку від сервера', () => {
    const errorMessage = 'Така назва вже існує';


    cy.intercept('POST', '/api/playlists', {
      statusCode: 400,
      body: { message: errorMessage }
    }).as('createFail');

    cy.mount(<CreatePlaylistView />);


    cy.get('input[name="name"]').type('Fail Playlist');
    cy.get('textarea[name="description"]').type('Desc');
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('x'), fileName: 'x.png'
    }, { force: true });

    cy.contains('button', 'Створити').click();

    cy.wait('@createFail');

    cy.contains(errorMessage).should('be.visible');
  });

  it('викликає onClose при натисканні Скасувати', () => {
    const onCloseSpy = cy.spy().as('onClose');
    cy.mount(<CreatePlaylistView onClose={onCloseSpy} />);

    cy.contains('button', 'Скасувати').click();
    cy.get('@onClose').should('have.been.called');
  });

  it('викликає onClose при кліку на стрілку назад', () => {
    const onCloseSpy = cy.spy().as('onClose');
    cy.mount(<CreatePlaylistView onClose={onCloseSpy} />);

    cy.get('img[alt="Назад"]').parent().click();
    cy.get('@onClose').should('have.been.called');
  });

});