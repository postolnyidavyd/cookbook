import DataRenderer from './DataRenderer.jsx';

describe('<DataRenderer />', () => {
  // Обгортка для імітації CSS Grid, щоб grid-column: 1/-1 працював коректно
  const GridWrapper = ({ children }) => (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
      data-testid="grid-container"
    >
      {children}
    </div>
  );

  it('рендерить повідомлення про помилку', () => {
    const errorText = 'Сервер не відповідає';

    cy.mount(
      <GridWrapper>
        <DataRenderer isError={true} error={{ data: { message: errorText } }} />
      </GridWrapper>
    );

    cy.contains('Сталася помилка').should('be.visible');
    cy.contains(errorText).should('be.visible');
  });

  it('рендерить дефолтне повідомлення про помилку, якщо тексту немає', () => {
    cy.mount(
      <GridWrapper>
        <DataRenderer isError={true} error={null} />
      </GridWrapper>
    );

    cy.contains('Не вдалося завантажити дані').should('be.visible');
  });

  it('рендерить задану кількість скелетонів при завантаженні', () => {
    const count = 4;

    cy.mount(
      <GridWrapper>
        <DataRenderer isLoading={true} skeletonCount={count} />
      </GridWrapper>
    );

    // Перевіряємо, що відрендерилися рівно 4 скелетони
    cy.get('[data-testid="grid-container"]')
      .children()
      .should('have.length', count);
  });

  it('рейдерить скелетони при isFetching (оновленні даних)', () => {
    const count = 2;
    cy.mount(
      <GridWrapper>
        <DataRenderer isFetching={true} skeletonCount={count} />
      </GridWrapper>
    );

    cy.get('[data-testid="grid-container"]')
      .children()
      .should('have.length', count);
  });

  it('рендерить пустий стан, якщо масив даних порожній', () => {
    cy.mount(
      <GridWrapper>
        <DataRenderer data={[]} isLoading={false} isError={false} />
      </GridWrapper>
    );

    cy.contains('За вашим запитом нічого не знайдено').should('be.visible');
    cy.contains('Спробуйте змінити фільтри').should('be.visible');
  });

  it('рендерить елементи списку, якщо дані є', () => {
    const mockData = [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' },
      { id: 3, title: 'Item 3' },
    ];

    cy.mount(
      <GridWrapper>
        <DataRenderer
          data={mockData}
          renderItemFn={(item) => (
            <div key={item.id} data-testid="test-item">
              {item.title}
            </div>
          )}
        />
      </GridWrapper>
    );

    cy.get('[data-testid="test-item"]').should('have.length', 3);
    cy.contains('Item 1').should('be.visible');
    cy.contains('Item 3').should('be.visible');
  });
});
