import { PlayListFilter } from './PlayListFilter.jsx';

describe('<PlayListFilter />', () => {

  // Заглушка для початкових значень
  const defaultValues = {
    input: '',
    tags: '',
    sortBy: 'popularity'
  };

  it('відображає інпути та селект', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <PlayListFilter
        values={defaultValues}
        onChange={onChangeSpy}
      />
    );

    cy.get('input[placeholder="Пошук плейлисту..."]').should('be.visible');
    cy.get('input[placeholder="Введіть тег"]').should('be.visible');
    cy.get('select').should('be.visible');
  });

  it('викликає onChange для пошуку з затримкою debounce', () => {
    const onChangeSpy = cy.spy().as('onChange');

    //Заморожуємо час перед монтуванням
    cy.clock();

    cy.mount(
      <PlayListFilter
        values={defaultValues}
        onChange={onChangeSpy}
      />
    );

    //Вводимо текст
    cy.get('input[placeholder="Пошук плейлисту..."]').type('Rock Music');

    // Перевіряємо чи функція ще не викликалась (що працює debounce)
    cy.get('@onChange').should('not.have.been.called');

    // промотуємо час вперед на 500мс
    cy.tick(600);

    // тільки тепер функція мала викликатись
    cy.get('@onChange').should('have.been.calledWith', 'input', 'Rock Music');
  });

  it('додає новий тег при натисканні Enter', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <PlayListFilter
        values={{ ...defaultValues, tags: 'Pop' }} // Вже є один тег
        onChange={onChangeSpy}
      />
    );

    // вводимо тег і тиснемо enter
    cy.get('input[placeholder="Введіть тег"]').type('Jazz{enter}');

    // перевіряємо, що він додався через кому до старого
    cy.get('@onChange').should('have.been.calledWith', 'tags', 'Pop,Jazz');

    // перевіряємо, що інпут очистився
    cy.get('input[placeholder="Введіть тег"]').should('have.value', '');
  });

  it('не додає пустий тег або дублікат', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <PlayListFilter
        values={{ ...defaultValues, tags: 'Rock' }}
        onChange={onChangeSpy}
      />
    );

    // спроба додати пустий
    cy.get('input[placeholder="Введіть тег"]').type('   {enter}');
    cy.get('@onChange').should('not.have.been.called');

    // спроба додати дублікат
    cy.get('input[placeholder="Введіть тег"]').type('Rock{enter}');
    cy.get('@onChange').should('not.have.been.called');
  });

  it('змінює сортування при виборі селекта', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <PlayListFilter
        values={defaultValues}
        onChange={onChangeSpy}
      />
    );


    cy.get('select').select(1);

    cy.get('@onChange').should('have.been.calledWith', 'sortBy', Cypress.sinon.match.string);
  });

  it('синхронізує інпут пошуку, якщо змінилися пропси (values)', () => {
    // Цей тест перевіряє useEffect: setLocalSearchValue(values.input || '');

    cy.mount(
      <PlayListFilter
        values={{ ...defaultValues, input: 'External Change' }}
        onChange={cy.spy()}
      />
    );

    cy.get('input[placeholder="Пошук плейлисту..."]').should('have.value', 'External Change');
  });

});