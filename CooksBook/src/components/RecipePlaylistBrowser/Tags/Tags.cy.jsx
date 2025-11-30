import { Tags } from './Tags.jsx';

describe('<Tags />', () => {
  const filterKey = 'ingredients';

  it('не рендериться, якщо масив тегів порожній або null', () => {
    // порожній масив
    cy.mount(<Tags tags={[]} filterKey={filterKey} onChange={cy.spy()} />);
    cy.get('button').should('not.exist');

    // null
    cy.mount(<Tags tags={null} filterKey={filterKey} onChange={cy.spy()} />);
    cy.get('button').should('not.exist');
  });

  it('рендерить кнопку очищення та список переданих тегів', () => {
    const tags = ['Картопля', 'Морква', 'Цибуля'];

    cy.mount(
      <Tags
        tags={tags}
        filterKey={filterKey}
        onChange={cy.spy()}
      />
    );

    cy.contains('button', 'Очистити все').should('be.visible');

    tags.forEach(tag => {
      cy.contains('button', tag).should('be.visible');
    });
  });

  it('викликає onChange з пустим рядком при кліку на "Очистити все"', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <Tags
        tags={['Тег1', 'Тег2']}
        filterKey={filterKey}
        onChange={onChangeSpy}
      />
    );

    cy.contains('Очистити все').click();

    cy.get('@onChange').should('have.been.calledWith', filterKey, '');
  });

  it('видаляє конкретний тег і повертає оновлений рядок через кому', () => {
    const onChangeSpy = cy.spy().as('onChange');
    const initialTags = ['Яблуко', 'Груша', 'Банан'];

    cy.mount(
      <Tags
        tags={initialTags}
        filterKey={filterKey}
        onChange={onChangeSpy}
      />
    );

    cy.contains('button', 'Груша').click();

    // компонент має видалити "Грушу" і склеїти залишок через кому
    cy.get('@onChange').should('have.been.calledWith', filterKey, 'Яблуко,Банан');
  });

  it('коректно обробляє видалення, якщо залишився один тег', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <Tags
        tags={['Останній']}
        filterKey={filterKey}
        onChange={onChangeSpy}
      />
    );

    cy.contains('Останній').click();

    // має повернути пустий рядок
    cy.get('@onChange').should('have.been.calledWith', filterKey, '');
  });
});