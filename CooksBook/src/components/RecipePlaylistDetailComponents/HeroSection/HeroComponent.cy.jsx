import HeroComponent from './HeroComponent';

describe('<HeroComponent />', () => {
  const defaultProps = {
    title: 'Смачна паста',
    description: 'Найкращий рецепт італійської пасти',
    image: '/uploads/pasta.jpg'
  };

  it('відображає заголовок, опис та зображення', () => {
    cy.mount(<HeroComponent {...defaultProps} />);

    cy.contains(defaultProps.title).should('be.visible');
    cy.contains(defaultProps.description).should('be.visible');

    cy.get('img')
      .should('be.visible')
      .and('have.attr', 'src', defaultProps.image)
      .and('have.attr', 'alt', defaultProps.title);
  });

  it('рендерить дочірні елементи (children)', () => {
    cy.mount(
      <HeroComponent {...defaultProps}>
        <div data-testid="sidebar">Сайдбар</div>
      </HeroComponent>
    );

    cy.get('[data-testid="sidebar"]')
      .should('be.visible')
      .and('have.text', 'Сайдбар');
  });

  it('не відображає опис, якщо він не переданий', () => {
    cy.mount(
      <HeroComponent
        title="Тільки заголовок"
        image="/img.jpg"
      />
    );

    cy.contains('Тільки заголовок').should('be.visible');

    cy.get('h3').should('not.exist');
  });
});