import { RecipeFilter } from './RecipeFilter.jsx';

describe('<RecipeFilter />', () => {
  // Заглушка для початкових значень
  const defaultValues = {
    input: '',
    ingredients: '',
    difficulty: '',
    time: '',
    sortBy: 'popularity'
  };

  it('відображає всі інпути та селекти', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <RecipeFilter
        values={defaultValues}
        onChange={onChangeSpy}
      />
    );

    cy.get('input[placeholder="Пошук рецепту..."]').should('be.visible');
    cy.get('input[placeholder="Введіть інгредієнт"]').should('be.visible');

    cy.get('select').should('have.length', 3);
  });

  it('викликає onChange для пошуку з затримкою debounce', () => {
    const onChangeSpy = cy.spy().as('onChange');
    cy.clock();

    cy.mount(
      <RecipeFilter
        values={defaultValues}
        onChange={onChangeSpy}
      />
    );

    // Скидаємо початкові виклики (якщо вони були при маунті)
    onChangeSpy.resetHistory();

    // Вводимо текст
    cy.get('input[placeholder="Пошук рецепту..."]').type('Борщ');

    // Перевіряємо, що поки що нічого не сталося
    cy.get('@onChange').should('not.have.been.called');

    // Промотуємо час вперед
    cy.tick(600);

    // Перевіряємо виклик
    cy.get('@onChange').should('have.been.calledWith', 'input', 'Борщ');
  });

  it('додає новий інгредієнт при натисканні Enter', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <RecipeFilter
        values={{ ...defaultValues, ingredients: 'Картопля' }}
        onChange={onChangeSpy}
      />
    );

    cy.get('input[placeholder="Введіть інгредієнт"]').type('Морква{enter}');


    cy.get('@onChange').should('have.been.calledWith', 'ingredients', 'Картопля,Морква');


    cy.get('input[placeholder="Введіть інгредієнт"]').should('have.value', '');
  });

  it('не додає пустий інгредієнт або дублікат', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <RecipeFilter
        values={{ ...defaultValues, ingredients: 'Цибуля' }}
        onChange={onChangeSpy}
      />
    );

    onChangeSpy.resetHistory();

    // спроба додати пустий
    cy.get('input[placeholder="Введіть інгредієнт"]').type('   {enter}');
    cy.get('@onChange').should('not.have.been.called');

    // спроба додати дублікат
    cy.get('input[placeholder="Введіть інгредієнт"]').type('Цибуля{enter}');
    cy.get('@onChange').should('not.have.been.called');
  });

  it('змінює складність (difficulty) при виборі селекта', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <RecipeFilter
        values={defaultValues}
        onChange={onChangeSpy}
      />
    );


    cy.get('select').eq(0).select(1);

    cy.get('@onChange').should('have.been.calledWith', 'difficulty', Cypress.sinon.match.string);
  });

  it('змінює час (time) при виборі селекта', () => {
    const onChangeSpy = cy.spy().as('onChange');
    cy.mount(<RecipeFilter values={defaultValues} onChange={onChangeSpy} />);


    cy.get('select').eq(1).select(1);
    cy.get('@onChange').should('have.been.calledWith', 'time', Cypress.sinon.match.string);
  });

  it('змінює сортування (sortBy) при виборі селекта', () => {
    const onChangeSpy = cy.spy().as('onChange');
    cy.mount(<RecipeFilter values={defaultValues} onChange={onChangeSpy} />);

    cy.get('select').last().select(1);
    cy.get('@onChange').should('have.been.calledWith', 'sortBy', Cypress.sinon.match.string);
  });

  it('синхронізує інпут пошуку при зміні пропсів', () => {
    cy.mount(
      <RecipeFilter
        values={{ ...defaultValues, input: 'Зовнішня зміна' }}
        onChange={cy.spy()}
      />
    );

    cy.get('input[placeholder="Пошук рецепту..."]').should('have.value', 'Зовнішня зміна');
  });
});