import Ingredients from './Ingredients';

describe('<Ingredients />', () => {
  const mockIngredients = [
    {
      title: 'Для тіста',
      items: [
        { name: 'Борошно', amount: '500', unit: 'г' },
        { name: 'Яйце', amount: '2', unit: 'шт' },
      ],
    },
    {
      title: 'Для начинки',
      items: [
        { name: 'Сир', amount: '200', unit: 'г' },
      ],
    },
  ];

  it('відображає групи інгредієнтів та елементи', () => {
    cy.mount(<Ingredients ingredients={mockIngredients} defaultServings={1} />);

    cy.contains('Інгредієнти').should('be.visible');
    cy.contains('Для тіста').should('be.visible');
    cy.contains('Для начинки').should('be.visible');

    cy.contains('Борошно').should('be.visible');
    cy.contains('500 г').should('be.visible');
    cy.contains('Яйце').should('be.visible');
    cy.contains('2 шт').should('be.visible');
    cy.contains('Сир').should('be.visible');
    cy.contains('200 г').should('be.visible');
  });

  it('змінює кількість порцій та перераховує інгредієнти', () => {
    cy.mount(<Ingredients ingredients={mockIngredients} defaultServings={1} />);

    cy.contains('span', '1 порція').should('be.visible');

    cy.get('img[alt="Додати порції"]').closest('button').click();

    cy.contains('span', '2 порцій').should('be.visible');
    cy.contains('1000 г').should('be.visible');
    cy.contains('4 шт').should('be.visible');
    cy.contains('400 г').should('be.visible');

    cy.get('img[alt="Відняти порції"]').closest('button').click();

    cy.contains('span', '1 порція').should('be.visible');
    cy.contains('500 г').should('be.visible');
  });

  it('не дозволяє зменшити кількість порцій менше 1', () => {
    cy.mount(<Ingredients ingredients={mockIngredients} defaultServings={1} />);

    cy.get('img[alt="Відняти порції"]').closest('button').click();
    cy.contains('span', '1 порція').should('be.visible');
  });

  it('скидає кількість порцій до стандартного значення', () => {
    cy.mount(<Ingredients ingredients={mockIngredients} defaultServings={2} />);

    cy.contains('span', '2 порцій').should('be.visible');
    cy.get('img[alt="Додати порції"]').closest('button').click();
    cy.contains('span', '3 порцій').should('be.visible');

    cy.get('img[alt="Скинути порції"]').closest('button').click();
    cy.contains('span', '2 порцій').should('be.visible');
  });

  it('форматує дробові значення', () => {
    const fractionIngredients = [
      {
        title: 'Основне',
        items: [{ name: 'Цукор', amount: '0.5', unit: 'склянки' }],
      },
    ];

    cy.mount(<Ingredients ingredients={fractionIngredients} defaultServings={1} />);

    cy.contains('1/2 склянки').should('be.visible');
  });

  it('перекреслює виконані інгредієнти при кліку', () => {
    cy.mount(<Ingredients ingredients={mockIngredients} defaultServings={1} />);

    cy.contains('Борошно').click();
    cy.contains('Борошно')
      .should('have.css', 'text-decoration')
      // .and('include', 'line-through');

    cy.contains('Борошно').click();
    cy.contains('Борошно')
      .should('have.css', 'text-decoration')
      .and('include', 'none');
  });
});