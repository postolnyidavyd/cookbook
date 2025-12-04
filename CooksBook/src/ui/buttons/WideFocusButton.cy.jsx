import { WideFocusButton } from './WideFocusButton.jsx';

describe('<WideFocusButton/>', () => {
  it("має рендеритись з правильними стилями за замовчуванням", () => {
    cy.mount(<WideFocusButton>Click Me</WideFocusButton>);
    cy.get('button').should('have.css', 'background-color', 'rgb(45, 74, 47)'); // темно-зелений
    cy.get('button').should('have.css', 'color', 'rgb(255, 255, 255)'); // білий
    cy.get('button').should('have.css', 'padding', '16px 10px'); // 1rem 0.625rem
  })
  it("має рендеритись з правильними стилями при використанні $secondary", () => {
    cy.mount(<WideFocusButton $secondary>Click Me</WideFocusButton>);
    cy.get('button').should('have.css', 'background-color', 'rgb(250, 244, 225)');
    cy.get('button').should('have.css', 'color', 'rgb(0, 0, 0)'); // чорний
  })
});