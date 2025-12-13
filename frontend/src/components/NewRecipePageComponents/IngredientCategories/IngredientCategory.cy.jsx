import { IngredientCategory } from './IngredientCategory';

describe('<IngredientCategory />', () => {
  const mockCategory = {
    id: 1,
    name: 'Для соусу',
    items: [
      { name: 'Майонез', amount: '100', unit: 'г' },
      { name: 'Гірчиця', amount: '10', unit: 'г' }
    ]
  };

  it('відображає назву категорії та поля введення', () => {
    cy.mount(
      <IngredientCategory
        categ={mockCategory}
        onRemoveCategory={cy.spy()}
        onAddItem={cy.spy()}
        onEditItem={cy.spy()}
        onDeleteItem={cy.spy()}
      />
    );

    cy.contains('h5', 'Для соусу').should('be.visible');
    cy.contains('button', 'Видалити').should('be.visible');
    cy.contains('button', 'Додати').should('be.visible');
    cy.contains('Майонез').should('be.visible');
    cy.contains('100 г').should('be.visible');
  });

  it('додає новий інгредієнт', () => {
    const onAddItemSpy = cy.spy().as('onAddItem');

    cy.mount(
      <IngredientCategory
        categ={{ ...mockCategory, items: [] }}
        onAddItem={onAddItemSpy}
        onRemoveCategory={cy.spy()}
        onEditItem={cy.spy()}
        onDeleteItem={cy.spy()}
      />
    );

    cy.get('#1-recipe-name').type('Сіль');
    cy.get('#1-recipe-amount').type('5');
    cy.get('#1-recipe-unit').type('г');

    cy.contains('button', 'Додати').click();

    cy.get('@onAddItem').should('have.been.calledWith', {
      name: 'Сіль',
      amount: '5',
      unit: 'г'
    });

    cy.get('#1-recipe-name').should('have.value', '');
  });

  it('видаляє категорію', () => {
    const onRemoveCategorySpy = cy.spy().as('onRemoveCategory');

    cy.mount(
      <IngredientCategory
        categ={mockCategory}
        onRemoveCategory={onRemoveCategorySpy}
        onAddItem={cy.spy()}
        onEditItem={cy.spy()}
        onDeleteItem={cy.spy()}
      />
    );

    cy.contains('button', 'Видалити').click();
    cy.get('@onRemoveCategory').should('have.been.called');
  });

  it('видаляє інгредієнт', () => {
    const onDeleteItemSpy = cy.spy().as('onDeleteItem');

    cy.mount(
      <IngredientCategory
        categ={mockCategory}
        onDeleteItem={onDeleteItemSpy}
        onRemoveCategory={cy.spy()}
        onAddItem={cy.spy()}
        onEditItem={cy.spy()}
      />
    );

    cy.contains('li', 'Гірчиця')
      .find('img[alt="Видалити"]')
      .parent()
      .click();

    cy.get('@onDeleteItem').should('have.been.calledWith', 1);
  });

  it('редагує інгредієнт', () => {
    const onEditItemSpy = cy.spy().as('onEditItem');

    cy.mount(
      <IngredientCategory
        categ={mockCategory}
        onEditItem={onEditItemSpy}
        onRemoveCategory={cy.spy()}
        onAddItem={cy.spy()}
        onDeleteItem={cy.spy()}
      />
    );

    cy.contains('li', 'Майонез')
      .find('img[alt="Редагувати"]')
      .parent()
      .click();

    cy.get('input[value="Майонез"]').should('be.visible');
    cy.get('input[value="100"]').should('be.visible');

    cy.get('input[value="Майонез"]').clear().type('Сметана');
    cy.get('input[value="100"]').clear().type('200');

    cy.contains('button', 'Зберегти').click();

    cy.get('@onEditItem').should('have.been.calledWith', 0, {
      name: 'Сметана',
      amount: '200',
      unit: 'г'
    });

    cy.get('input[value="Сметана"]').should('not.exist');
  });
});