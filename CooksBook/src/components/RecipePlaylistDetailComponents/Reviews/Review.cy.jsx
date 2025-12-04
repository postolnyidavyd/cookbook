import { Review } from './Review';

describe('<Review />', () => {
  const mockReview = {
    id: '1',
    rating: 5,
    text: 'Дуже смачний рецепт, всім раджу!',
    author: {
      id: 'u1',
      name: 'Олена',
      avatar: '/uploads/olena.jpg'
    }
  };

  it('відображає імʼя автора, текст відгуку та аватар', () => {
    cy.mount(<Review review={mockReview} />);

    cy.contains('Олена').should('be.visible');
    cy.contains('Дуже смачний рецепт, всім раджу!').should('be.visible');

    cy.get('img')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'olena.jpg');
  });
});