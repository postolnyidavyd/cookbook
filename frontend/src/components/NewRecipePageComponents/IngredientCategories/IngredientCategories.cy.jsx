import { useState } from 'react';
import IngredientCategories from './IngredientCategories';

describe('<IngredientCategories />', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      servings: 1,
      onServingsChange: cy.spy().as('onServingsChange'),
      categoryName: '',
      onCategoryNameChange: cy.spy().as('onCategoryNameChange'),
      onAddCategory: cy.spy().as('onAddCategory'),
      categories: [],
      handleRemoveCategory: cy.spy().as('handleRemoveCategory'),
      handleAddIngredient: cy.spy().as('handleAddIngredient'),
      handleEditIngredient: cy.spy().as('handleEditIngredient'),
      handleDeleteIngredient: cy.spy().as('handleDeleteIngredient'),
    };
  });

  it('відображає основні елементи форми', () => {
    cy.mount(<IngredientCategories {...defaultProps} />);

    cy.contains('Інгредієнти').should('be.visible');
    cy.get('#portion-amount').should('be.visible');
    cy.get('#category-name').should('be.visible');
    cy.contains('button', 'Додати категорію').should('be.visible');
  });

  it('відображає передані значення в інпутах', () => {
    cy.mount(
      <IngredientCategories
        {...defaultProps}
        servings={4}
        categoryName="Соуси"
      />
    );

    cy.get('#portion-amount').should('have.value', '4');
    cy.get('#category-name').should('have.value', 'Соуси');
  });

  it('викликає onServingsChange при зміні кількості порцій', () => {
    const Wrapper = () => {
      const [servings, setServings] = useState(1);
      return (
        <IngredientCategories
          {...defaultProps}
          servings={servings}
          onServingsChange={(e) => {
            setServings(e.target.value);
            defaultProps.onServingsChange(e);
          }}
        />
      );
    };

    cy.mount(<Wrapper />);

    cy.get('#portion-amount').clear().type('5');
    cy.get('@onServingsChange').should('have.been.called');
    cy.get('#portion-amount').should('have.value', '5');
  });

  it('викликає onCategoryNameChange при введенні назви категорії', () => {
    const Wrapper = () => {
      const [name, setName] = useState('');
      return (
        <IngredientCategories
          {...defaultProps}
          categoryName={name}
          onCategoryNameChange={(e) => {
            setName(e.target.value);
            defaultProps.onCategoryNameChange(e);
          }}
        />
      );
    };

    cy.mount(<Wrapper />);

    cy.get('#category-name').type('Салати');
    cy.get('@onCategoryNameChange').should('have.been.called');
    cy.get('#category-name').should('have.value', 'Салати');
  });

  it('викликає onAddCategory при кліку на кнопку', () => {
    cy.mount(<IngredientCategories {...defaultProps} categoryName="Нова категорія" />);

    cy.contains('button', 'Додати категорію').click();
    cy.get('@onAddCategory').should('have.been.called');
  });

  it('рендерить список категорій', () => {
    const categories = [
      { id: 1, name: 'М\'ясо', items: [] },
      { id: 2, name: 'Овочі', items: [] },
    ];

    cy.mount(<IngredientCategories {...defaultProps} categories={categories} />);

    cy.contains('М\'ясо').should('be.visible');
    cy.contains('Овочі').should('be.visible');
  });
});