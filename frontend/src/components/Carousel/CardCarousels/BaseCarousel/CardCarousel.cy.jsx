import { CardCarousel } from './CardCarousel';

describe('<CardCarousel />', () => {
  // мок дані
  const mockItems = [
    {
      id: '1',
      name: 'Item 1',
      title: 'Item 1',
      coverImage: 'img1.jpg',
      image: 'img1.jpg',
      views: 100,
      recipesCount: 5,
      time: 30,
      difficulty: 'Easy',
      rating: 5,
      owner: { name: 'User 1', avatar: 'avatar1.jpg' },
    },
    {
      id: '2',
      name: 'Item 2',
      title: 'Item 2',
      coverImage: 'img2.jpg',
      image: 'img2.jpg',
      views: 200,
      recipesCount: 10,
      time: 45,
      difficulty: 'Medium',
      rating: 4,
      owner: { name: 'User 2', avatar: 'avatar2.jpg' },
    },
    {
      id: '3',
      name: 'Item 3',
      title: 'Item 3',
      coverImage: 'img3.jpg',
      image: 'img3.jpg',
      views: 300,
      recipesCount: 15,
      time: 60,
      difficulty: 'Hard',
      rating: 3,
      owner: { name: 'User 3', avatar: 'avatar3.jpg' },
    },
    {
      id: '4',
      name: 'Item 4',
      title: 'Item 4',
      coverImage: 'img4.jpg',
      image: 'img4.jpg',
      views: 400,
      recipesCount: 20,
      time: 15,
      difficulty: 'Easy',
      rating: 5,
      owner: { name: 'User 4', avatar: 'avatar4.jpg' },
    },
  ];

  const getPrevBtn = () => cy.get('img[alt="Попередній"]').closest('button');
  const getNextBtn = () => cy.get('img[alt="Наступний"]').closest('button');

  it('відображає заголовок (children) та контейнер', () => {
    cy.mount(
      <CardCarousel data={[]} isFetching={false}>
        <h1>Мій заголовок</h1>
      </CardCarousel>
    );

    cy.contains('h1', 'Мій заголовок').should('be.visible');
  });

  it('показує скелетони під час завантаження (isFetching)', () => {
    cy.mount(<CardCarousel data={[]} isFetching={true} />);

    cy.get('[data-testid="carousel-track"]')
      .children()
      .first()
      .children()
      .should('have.length', 3);

    cy.get('button').should('not.exist');
  });

  it('показує повідомлення про помилку (isError)', () => {
    const errorMsg = 'Сервер впаде';
    cy.mount(
      <CardCarousel
        data={[]}
        isError={true}
        error={{ data: { message: errorMsg } }}
      />
    );

    cy.contains(errorMsg).should('be.visible');
  });

  it('показує "Немає елементів", якщо масив пустий', () => {
    cy.mount(<CardCarousel data={[]} isFetching={false} />);

    cy.contains('Немає елементів').should('be.visible');
  });

  it('рендерить картки та навігацію, якщо є дані', () => {
    cy.mount(
      <CardCarousel data={mockItems} isFetching={false} type="playlist" />
    );

    cy.contains('Item 1').should('be.visible');
    cy.contains('Item 3').should('be.visible');

    // "Назад" має бути заблокована на старті
    getPrevBtn().should('be.disabled');
    // "Вперед" має бути активна
    getNextBtn().should('not.be.disabled');
  });

  it('прокручує слайди при кліку на кнопки', () => {
    cy.mount(<CardCarousel data={mockItems} isFetching={false} />);
    //щоб можна було звертатися за допомогою @track
    cy.get('[data-testid="carousel-track"]').as('track');

    // перевірка 0%
    cy.get('@track')
      .invoke('attr', 'style')
      .should('match', /translateX\(-?0%\)/);

    getNextBtn().click();

    // перевірка зміщення
    cy.get('@track')
      .invoke('attr', 'style')
      .should('include', 'translateX(-33.333');

    getPrevBtn().click();

    cy.get('@track')
      .invoke('attr', 'style')
      .should('match', /translateX\(-?0%\)/);
  });

  it('не показує навігацію, якщо елементів мало', () => {
    const fewItems = [mockItems[0], mockItems[1]];

    cy.mount(<CardCarousel data={fewItems} />);

    cy.contains('Item 1').should('be.visible');

    cy.get('img[alt="Наступний"]').should('not.exist');
  });
});
