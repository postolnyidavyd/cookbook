import RecipeSideBar from './RecipeSideBar';
import filledHeart from '../../../assets/filledHeart.svg';
import filledBookmark from '../../../assets/filledBookmark.svg';
import { createTestStore } from '../../../../cypress/support/test-utils.js';

describe('<RecipeSideBar />', () => {
  const defaultProps = {
    recipeId: '123',
    rating: 4.5,
    avatar: '/uploads/chef.jpg',
    authorName: 'Шеф Іван',
    time: '45 хв',
    difficulty: 'Середньо',
  };

  const initialState = {
    auth: {
      isAuthenticated: true,
      user: {
        likedRecipes: [],
        savedInPlaylistRecipes: []
      }
    }
  };

  it('відображає інформацію про автора та рецепт', () => {
    cy.mount(<RecipeSideBar {...defaultProps} />);

    cy.contains('Шеф Іван').should('be.visible');
    cy.contains('45 хв').should('be.visible');
    cy.contains('Середньо').should('be.visible');
    cy.get('img[alt="Шеф Іван"]').should('have.attr', 'src', '/uploads/chef.jpg');
  });

  it('відправляє запит на лайк при кліку', () => {
    cy.intercept('POST', '/api/recipes/123/like', {
      statusCode: 200,
      body: { success: true }
    }).as('likeRequest');

    cy.mount(<RecipeSideBar {...defaultProps} />, { initialState });

    cy.contains('button', 'Вподобати рецепт').click();

    cy.wait('@likeRequest').then((interception) => {
      expect(interception.request.body).to.deep.equal({ like: true });
    });
  });

  it('відображає активний стан лайка', () => {
    const likedState = {
      auth: {
        isAuthenticated: true,
        user: { likedRecipes: ['123'], savedInPlaylistRecipes: [] }
      }
    };

    cy.mount(<RecipeSideBar {...defaultProps} />, { initialState: likedState });

    cy.contains('button', 'Вподобано').should('be.visible');
    cy.get(`img[src="${filledHeart}"]`).should('exist');
  });

  it('диспатчить відкриття модалки збереження', () => {
    const store = createTestStore(initialState);
    cy.spy(store, 'dispatch').as('dispatchSpy');

    cy.mount(<RecipeSideBar {...defaultProps} />, { reduxStore: store });

    cy.contains('button', 'Додати до плейлиста').click();

    cy.get('@dispatchSpy').should('have.been.calledWith',
      Cypress.sinon.match.hasNested('payload.isOpen', true)
    );
    cy.get('@dispatchSpy').should('have.been.calledWith',
      Cypress.sinon.match.hasNested('payload.recipeId', '123')
    );
  });

  it('відображає активний стан збереження', () => {
    const savedState = {
      auth: {
        isAuthenticated: true,
        user: { likedRecipes: [], savedInPlaylistRecipes: ['123'] }
      }
    };

    cy.mount(<RecipeSideBar {...defaultProps} />, { initialState: savedState });

    cy.get(`img[src="${filledBookmark}"]`).should('exist');
  });

  it('копіює посилання та змінює текст кнопки', () => {
    cy.clock();

    cy.mount(<RecipeSideBar {...defaultProps} />);

    cy.stub(window.navigator.clipboard, 'writeText')
      .resolves()
      .as('copy');

    cy.contains('button', 'Поділитися').click();


    cy.get('@copy').should('have.been.calledWith', window.location.href);

    cy.contains('button', 'Скопійовано!').should('be.visible');

    cy.tick(2000);
    cy.contains('button', 'Поділитися').should('be.visible');
  });
});