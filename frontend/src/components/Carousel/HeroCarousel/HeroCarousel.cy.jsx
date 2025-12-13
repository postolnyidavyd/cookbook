import HeroCarousel from './HeroCarousel';

describe('<HeroCarousel />', () => {
  const getNextBtn = () => cy.get('img[alt="Права стрілка"]').closest('button');
  const getPrevBtn = () => cy.get('img[alt="Ліва стрілка"]').closest('button');

  it('відображає перший слайд за замовчуванням', () => {
    cy.mount(<HeroCarousel />);

    cy.contains('Відкрийте світ смачних рецептів').should('be.visible');

    cy.contains('Переглянути рецепти').should('be.visible');
  });

  it('перемикає слайди кнопками Вперед/Назад', () => {
    cy.mount(<HeroCarousel />);

    getNextBtn().click();
    cy.contains('Переглядайте плейлісти').should('be.visible');

    cy.contains('Відкрийте світ смачних рецептів').should('not.be.visible');

    getPrevBtn().click();
    cy.contains('Відкрийте світ смачних рецептів').should('be.visible');
  });

  it('працює циклічна навігація (Loop)', () => {
    cy.mount(<HeroCarousel />);

    getPrevBtn().click();
    cy.contains('Є що показати на кухні?').should('be.visible');

    getNextBtn().click();
    cy.contains('Відкрийте світ смачних рецептів').should('be.visible');
  });

  it('скидає таймер при ручному перемиканні', () => {
    cy.clock();
    cy.mount(<HeroCarousel />);

    // чекаємо 3 секунди
    cy.tick(3000);

    // юзер клікає сам
    getNextBtn().click();

    //Перевіряєм чи скинувся таймер з 3 секунд
    cy.tick(2000);
    // Ми все ще маємо бути на 2му слайді
    cy.contains('Переглядайте плейлісти').should('be.visible');

    // Чекаємо ще 3 сек (в сумі 5 секунд після кліку)
    cy.tick(3000);
    cy.contains('Є що показати на кухні?').should('be.visible');
  });

  it('рендерить кастомні слайди', () => {
    const customSlides = [
      {
        title: 'Тестовий Заголовок 1',
        buttonText: 'Кнопка 1',
        navigateTo: '/test1',
        img: 'test1.png',
        content: 'Опис 1',
      },
      {
        title: 'Тестовий Заголовок 2',
        buttonText: 'Кнопка 2',
        navigateTo: '/test2',
        img: 'test2.png',
        content: 'Опис 2',
      },
    ];

    cy.mount(<HeroCarousel slides={customSlides} />);

    cy.contains('Тестовий Заголовок 1').should('be.visible');
    cy.contains('Кнопка 1')
      .should('be.visible')
      .and('have.attr', 'href', '/test1');

    getNextBtn().click();
    cy.contains('Тестовий Заголовок 2').should('be.visible');
  });

  it('перемикається через Dots', () => {
    cy.mount(<HeroCarousel />);

    cy.get('[data-testid="dots"]').children().last().click();
    cy.contains('Є що показати на кухні?').should('be.visible');

    cy.get('[data-testid="dots"]').children().first().click();
    cy.contains('Відкрийте світ смачних рецептів').should('be.visible');
  });
});
