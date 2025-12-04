import Item from './CarouselItem';

describe('<CarouselItem />', () => {

  const props = {
    title: 'Смачний Сніданок',
    buttonText: 'Детальніше',
    children: 'Найкращий спосіб почати день — це смачний омлет.',
    img: 'https://via.placeholder.com/150',
    navigateTo: '/recipes/123'
  };

  it('відображає заголовок, опис та кнопку', () => {
    cy.mount(<Item {...props} />);

    cy.contains(props.title).should('be.visible');
    cy.contains(props.children).should('be.visible');
    cy.contains(props.buttonText).should('be.visible');
  });

  it('відображає картинку з правильним src та alt', () => {
    cy.mount(<Item {...props} />);

    cy.get('img')
      .should('be.visible')
      .and('have.attr', 'src', props.img)
      .and('have.attr', 'alt', props.title);
  });

  it('має правильне посилання (Link)', () => {
    cy.mount(<Item {...props} />);

    cy.contains('a', props.buttonText)
      .should('have.attr', 'href', props.navigateTo);
  });

  it('прокидає додаткові пропси на кнопку', () => {
    cy.mount(<Item {...props} disabled={true} />);

    cy.contains('a', props.buttonText).closest('button').should('be.disabled');
  });

});