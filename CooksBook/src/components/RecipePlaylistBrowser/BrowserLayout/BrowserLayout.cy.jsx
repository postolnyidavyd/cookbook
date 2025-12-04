import BrowserLayout from './BrowserLayout.jsx';

describe('<RecipePlaylistBrowser />', () => {
  it('рендерить всі передані слоти та дітей', () => {
    cy.mount(
      <BrowserLayout
        filterSlot={<div data-testid="filter">Фільтри</div>}
        tagsSlot={<div data-testid="tags">Теги</div>}
        endSlot={<div data-testid="end">Кнопка "Більше"</div>}
      >
        <div data-testid="card-1">Картка 1</div>
        <div data-testid="card-2">Картка 2</div>
      </BrowserLayout>
    );

    cy.get('[data-testid="filter"]')
      .should('be.visible')
      .and('have.text', 'Фільтри');
    cy.get('[data-testid="tags"]')
      .should('be.visible')
      .and('have.text', 'Теги');
    cy.get('[data-testid="end"]')
      .should('be.visible')
      .and('have.text', 'Кнопка "Більше"');

    cy.get('[data-testid="card-1"]').should('be.visible');
    cy.get('[data-testid="card-2"]').should('be.visible');
  });

  it('відображає дітей всередині CSS Grid сітки', () => {
    cy.mount(
      <BrowserLayout>
        <div data-testid="test-card">Card</div>
      </BrowserLayout>
    );

    cy.get('[data-testid="test-card"]')
      .parent()
      .should('have.css', 'display', 'grid');
  });

});
