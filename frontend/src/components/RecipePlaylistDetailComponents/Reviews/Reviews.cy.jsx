import Reviews from './Reviews';

describe('<Reviews />', () => {
  const mockReviews = [
    {
      id: '1',
      rating: 5,
      text: 'Чудовий рецепт, дуже смачно!',
      author: {
        name: 'Марія',
        avatar: '/uploads/user1.jpg'
      }
    },
    {
      id: '2',
      rating: 4,
      text: 'Трохи змінив інгредієнти, але вийшло добре.',
      author: {
        name: 'Олег',
        avatar: '/uploads/user2.jpg'
      }
    }
  ];

  it('відображає заголовок та статистику', () => {
    cy.mount(<Reviews reviews={mockReviews} rating={4.5} />);

    cy.contains('Відгуки').should('be.visible');

    cy.contains('Кількість відгуків').should('be.visible');
    cy.contains('2').should('be.visible');

    cy.contains('Середній рейтинг').should('be.visible');
    cy.contains('4.5').should('be.visible');
  });

  it('рендерить список окремих відгуків', () => {
    cy.mount(<Reviews reviews={mockReviews} rating={4.5} />);

    cy.get('ol').children().should('have.length', 2);

    cy.contains('Марія').should('be.visible');
    cy.contains('Чудовий рецепт, дуже смачно!').should('be.visible');

    cy.contains('Олег').should('be.visible');
    cy.contains('Трохи змінив інгредієнти, але вийшло добре.').should('be.visible');
  });

  it('коректно відображає порожній список', () => {
    cy.mount(<Reviews reviews={[]} rating={0} />);

    cy.contains('Кількість відгуків').next().should('have.text', '0');
    cy.contains('Середній рейтинг').next().should('contain.text', '0');

    cy.get('ol').children().should('have.length', 0);
  });
});