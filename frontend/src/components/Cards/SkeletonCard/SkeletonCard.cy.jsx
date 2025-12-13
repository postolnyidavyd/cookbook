import { SkeletonCard } from './SkeletonCard.jsx';

describe('<SkeletonCard />', () => {
  it('рендерить скетелон карточки з пульсуючим ефектом', () => {
    cy.mount(<SkeletonCard data-testid="skeleton" />);

    cy.get('[data-testid="skeleton"]')
      .should('have.css', 'height', '400px')
      .and('have.css', 'animation-duration', '1.5s')
      .and('have.css', 'border-radius', '16px');
  });
});
