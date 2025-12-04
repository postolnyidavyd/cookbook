import ImageInput from './ImageInput';

describe('<ImageInput />', () => {
  it('відображає початковий стан з іконкою камери', () => {
    cy.mount(<ImageInput onAdd={cy.spy()} />);

    cy.get('img[alt="Додати рецепт"]').should('be.visible');
    cy.get('img[alt="Прев\'ю зображення"]').should('not.exist');
    cy.get('input[type="file"]').should('exist');
  });

  it('викликає onAdd при виборі файлу', () => {
    const onAddSpy = cy.spy().as('onAdd');
    cy.mount(<ImageInput onAdd={onAddSpy} />);

    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('file content'),
      fileName: 'test.png',
      mimeType: 'image/png',
    }, { force: true });

    cy.get('@onAdd').should('have.been.calledOnce');
  });

  it('відображає превʼю, якщо воно передане', () => {
    const testImg = 'https://via.placeholder.com/150';
    cy.mount(<ImageInput img={testImg} />);

    cy.get('img[alt="Прев\'ю зображення"]')
      .should('be.visible')
      .and('have.attr', 'src', testImg)
      .and('have.attr', 'title', 'Натисніть щоб видалити');

    cy.get('img[alt="Додати рецепт"]').should('not.exist');
  });

  it('викликає onRemove при кліку на існуюче зображення', () => {
    const onRemoveSpy = cy.spy().as('onRemove');
    const onAddSpy = cy.spy().as('onAdd');

    cy.mount(
      <ImageInput
        img="blob:url"
        onRemove={onRemoveSpy}
        onAdd={onAddSpy}
      />
    );

    cy.get('label').click();

    cy.get('@onRemove').should('have.been.calledOnce');
    cy.get('@onAdd').should('not.have.been.called');
  });

  it('застосовує кастомний розмір через пропси', () => {
    cy.mount(<ImageInput size="200px" />);

    cy.get('label')
      .should('have.css', 'width', '200px')
      .and('have.css', 'height', '200px');
  });

  it('передає додаткові пропси в інпут', () => {
    cy.mount(<ImageInput name="custom-name" id="custom-id" />);

    cy.get('input[type="file"]')
      .should('have.attr', 'name', 'custom-name')
      .and('have.attr', 'id', 'custom-id');
  });
});