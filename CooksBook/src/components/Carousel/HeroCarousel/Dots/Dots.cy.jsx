import Dots from './Dots';

describe('<Dots />', () => {
  it('рендерить правильну кількість точок', () => {
    cy.mount(<Dots count={5} current={0} onSelect={cy.spy()} />);
    cy.get('[data-testid="dots"]').children().should('have.length', 5);
  });

  it('відображає активну точку з правильними стилями', () => {
    cy.mount(<Dots count={3} current={1} onSelect={cy.spy()} />);
    // eq() - це індекс, тому для другої точки використовуємо 1
    cy.get('[role="tab"]')
      .eq(1)
      .should('have.css', 'background-color', 'rgb(45, 74, 47)')
      .invoke('css', 'width')
      .then((width) => parseInt(width))
      .should('equal', 40);
  });

  it('відображає неактивні точки з правильними стилями', () => {
    cy.mount(<Dots count={3} current={1} onSelect={cy.spy()} />);

    cy.get('[role="tab"]')
      .eq(0)
      .should('have.css', 'background-color', 'rgb(178, 187, 162)')
      .invoke('css', 'width')
      .then((width) => parseInt(width))
      .should('equal', 24);
  });

  it('викликає onSelect з правильним індексом при кліку', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    cy.mount(<Dots count={4} current={0} onSelect={onSelectSpy} />);

    cy.get('[role="tab"]').eq(2).click();
    cy.get('@onSelectSpy').should('have.been.calledWith', 2);
  });
});
