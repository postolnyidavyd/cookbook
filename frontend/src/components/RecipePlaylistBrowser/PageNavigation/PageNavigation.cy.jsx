import PageNavigation from './PageNavigation';

describe('<PageNavigation />', () => {

  const getPrevBtn = () => cy.get('img[alt="Ліва стрілка"]').closest('button');
  const getNextBtn = () => cy.get('img[alt="Права стрілка"]').closest('button');

  it('рендерить правильну кількість кнопок сторінок', () => {

    cy.mount(
      <PageNavigation
        pageCount={5}
        activePage={1}
        onChange={cy.spy()}
      />
    );
    // 5 сторінок + 2 стрілки = 7 кнопок
    cy.get('button').should('have.length', 7);
    cy.contains('button', '1').should('be.visible');
    cy.contains('button', '5').should('be.visible');
  });

  it('блокує кнопку "Назад" на першій сторінці', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <PageNavigation
        pageCount={5}
        activePage={1}
        onChange={onChangeSpy}
      />
    );

    // Перевіряємо стан disabled
    getPrevBtn().should('be.disabled');
    getNextBtn().should('not.be.disabled');

    // Перевіряємо, що клік не викликає функцію
    getPrevBtn().click({ force: true });// force через disabled, бо в cypress не можна клікати по disabled елементам
    cy.get('@onChange').should('not.have.been.called');
  });

  it('блокує кнопку "Вперед" на останній сторінці', () => {
    cy.mount(
      <PageNavigation
        pageCount={5}
        activePage={5}
        onChange={cy.spy()}
      />
    );

    getNextBtn().should('be.disabled');
    getPrevBtn().should('not.be.disabled');
  });

  it('викликає onChange з правильними аргументами при кліку стрілок', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <PageNavigation
        pageCount={5}
        activePage={2}
        onChange={onChangeSpy}
      />
    );

    // Клік "Назад" -> має стати 1
    getPrevBtn().click();
    cy.get('@onChange').should('have.been.calledWith', 1);

    // Клік "Вперед" -> має стати 3
    getNextBtn().click();
    cy.get('@onChange').should('have.been.calledWith', 3);
  });

  it('переходить на конкретну сторінку при кліку на цифру', () => {
    const onChangeSpy = cy.spy().as('onChange');

    cy.mount(
      <PageNavigation
        pageCount={10}
        activePage={1}
        onChange={onChangeSpy}
      />
    );

    cy.contains('button', '5').click();

    cy.get('@onChange').should('have.been.calledWith', 5);
  });

  it('підсвічує активну сторінку та робить її неактивною для кліку', () => {
    const activePage = 3;

    cy.mount(
      <PageNavigation
        pageCount={5}
        activePage={activePage}
        onChange={cy.spy()}
      />
    );


    // eslint-disable-next-line cypress/no-assigning-return-values
    const activeBtn = cy.contains('button',  activePage);


    activeBtn.should('have.css', 'background-color', 'rgb(45, 74, 47)');
    activeBtn.should('have.css', 'color', 'rgb(255, 255, 255)');


    activeBtn.should('be.disabled');
  });

});