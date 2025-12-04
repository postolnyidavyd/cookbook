import CookingSteps from './CookingSteps';

describe('<CookingSteps />', () => {
  const mockSteps = [
    {
      title: 'Нарізка овочів',
      text: 'Дрібно наріжте цибулю та моркву.',
      imageUrl: '/uploads/step1.jpg'
    },
    {
      title: 'Обсмажування',
      text: 'Обсмажте овочі на середньому вогні до золотистого кольору.',
      imageUrl: null
    },
    {
      title: 'Подача',
      text: 'Прикрасьте зеленню перед подачею.',
      imageUrl: '/uploads/step3.jpg'
    }
  ];

  it('відображає заголовок секції та список кроків', () => {
    cy.mount(<CookingSteps steps={mockSteps} />);

    cy.contains('Приготування').should('be.visible');
    cy.get('ol').children().should('have.length', 3);
  });

  it('відображає правильну нумерацію та текстовий контент', () => {
    cy.mount(<CookingSteps steps={mockSteps} />);

    cy.contains('1.Нарізка овочів').should('be.visible');
    cy.contains('Дрібно наріжте цибулю та моркву.').should('be.visible');

    cy.contains('2.Обсмажування').should('be.visible');
    cy.contains('Обсмажте овочі на середньому вогні до золотистого кольору.').should('be.visible');
  });

  it('відображає зображення тільки для кроків, які його мають', () => {
    cy.mount(<CookingSteps steps={mockSteps} />);

    cy.get('img[alt="Нарізка овочів"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'step1.jpg');

    cy.get('img[alt="Обсмажування"]').should('not.exist');

    cy.get('img[alt="Подача"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'step3.jpg');
  });

  it('коректно рендериться з порожнім списком кроків', () => {
    cy.mount(<CookingSteps steps={[]} />);

    cy.contains('Приготування').should('be.visible');
    cy.get('ol').children().should('have.length', 0);
  });
});