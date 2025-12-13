import EditUserModal from './EditUserModal';

describe('<EditUserModal />', () => {

  // Мок дані користувача
  const mockUser = {
    id: '1',
    name: 'Іван',
    surname: 'Петренко',
    email: 'ivan@test.com',
    avatar: '/uploads/avatar.jpg'
  };

  it('відображає попередньо заповнені дані користувача', () => {
    cy.mount(
      <EditUserModal
        isOpen={true}
        user={mockUser}
        onClose={cy.spy()}
      />
    );


    cy.get('input[name="name"]').should('have.value', 'Іван');
    cy.get('input[name="surname"]').should('have.value', 'Петренко');
    cy.get('input[name="email"]').should('have.value', 'ivan@test.com');

    cy.get('img[alt="Прев\'ю зображення"]').should('have.attr', 'src').and('include', 'avatar.jpg');
  });

  it('показує помилки валідації при пустих полях', () => {
    cy.mount(
      <EditUserModal
        isOpen={true}
        user={mockUser}
        onClose={cy.spy()}
      />
    );

    cy.get('input[name="name"]').clear();
    cy.get('input[name="surname"]').clear();
    cy.get('input[name="email"]').clear();

    cy.contains('button', 'Зберегти').click();

    cy.contains("Введіть ім'я").should('be.visible');
    cy.contains('Введіть прізвище').should('be.visible');
    cy.contains('Введіть електронну адресу').should('be.visible');
  });

  it('відправляє правильні дані на сервер (перевірка склеювання username)', () => {
    cy.intercept('PATCH', '/api/auth/me', (req) => {
      req.reply({
        statusCode: 200,
        body: { ...mockUser, name: 'Тарас', surname: 'Шевченко' }
      });
    }).as('updateRequest');

    const onCloseSpy = cy.spy().as('onClose');

    cy.mount(
      <EditUserModal
        isOpen={true}
        user={mockUser}
        onClose={onCloseSpy}
      />
    );

    cy.get('input[name="name"]').clear().type('Тарас');
    cy.get('input[name="surname"]').clear().type('Шевченко');


    cy.contains('button', 'Зберегти').click();

    cy.wait('@updateRequest');

    cy.get('@onClose').should('have.been.called');
  });

  it('показує помилку від сервера', () => {
    const errorMsg = 'Цей email вже зайнятий';

    cy.intercept('PATCH', '/api/auth/me', {
      statusCode: 409,
      body: { message: errorMsg }
    }).as('updateFail');

    cy.mount(
      <EditUserModal
        isOpen={true}
        user={mockUser}
        onClose={cy.spy()}
      />
    );

    cy.contains('button', 'Зберегти').click();
    cy.wait('@updateFail');

    cy.contains(errorMsg).should('be.visible');
  });

  it('дозволяє завантажити нове фото', () => {
    cy.mount(<EditUserModal isOpen={true} user={mockUser} onClose={cy.spy()} />);

    cy.get('input[type="file"]')
      .selectFile({
        contents: Cypress.Buffer.from('fake image content'),
        fileName: 'new-avatar.png',
        mimeType: 'image/png',
      }, { force: true })
      .trigger('change', { force: true });


    cy.get('img[alt="Прев\'ю зображення"]')
      .should('have.attr', 'src')
      .and('not.include', 'uploads/avatar.jpg')
      .and('include', 'blob:');
  });

});