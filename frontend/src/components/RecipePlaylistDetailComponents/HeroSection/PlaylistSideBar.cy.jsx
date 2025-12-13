import PlaylistSideBar from './PlaylistSideBar';
import whiteHeart from '../../../assets/heartWhite.svg';
import filledHeart from '../../../assets/filledHeart.svg';

describe('<PlaylistSideBar />', () => {
  const defaultProps = {
    playlistId: '123',
    authorName: 'Шеф Іван',
    avatar: '/uploads/avatar.jpg',
    recipesCount: 15,
    views: 500,
    tags: ['Сніданок', 'Швидко']
  };

  const initialState = {
    auth: {
      isAuthenticated: true,
      user: { likedPlaylists: [] }
    }
  };

  it('відображає інформацію про автора та статистику', () => {
    cy.mount(<PlaylistSideBar {...defaultProps} />);

    cy.contains('Шеф Іван').should('be.visible');
    cy.contains('15 рецептів').should('be.visible');
    cy.contains('500 переглядів').should('be.visible');

    cy.get(`img[alt="Шеф Іван"]`)
      .should('have.attr', 'src', '/uploads/avatar.jpg');
  });

  it('відображає список тегів', () => {
    cy.mount(<PlaylistSideBar {...defaultProps} />);

    cy.contains('сніданок').should('be.visible');
    cy.contains('швидко').should('be.visible');
  });

  it('відправляє запит на лайк при кліку', () => {
    cy.intercept('POST', '/api/playlists/123/like', {
      statusCode: 200,
      body: { success: true }
    }).as('likeRequest');

    cy.mount(<PlaylistSideBar {...defaultProps} />, { initialState });

    cy.contains('button', 'Вподобати плейлист').click();

    cy.wait('@likeRequest').then((interception) => {
      expect(interception.request.body).to.deep.equal({ like: true });
    });
  });

  it('відображає активний стан лайка', () => {
    const likedState = {
      auth: {
        isAuthenticated: true,
        user: { likedPlaylists: ['123'] }
      }
    };

    cy.mount(<PlaylistSideBar {...defaultProps} />, { initialState: likedState });

    cy.contains('button', 'Вподобано').should('be.visible');
    cy.get(`img[src="${filledHeart}"]`).should('exist');
  });

  it('копіює посилання та змінює текст кнопки', () => {
    cy.clock();

    cy.mount(<PlaylistSideBar {...defaultProps} />);

    cy.stub(window.navigator.clipboard, 'writeText')
      .resolves()
      .as('copy');

    cy.contains('button', 'Поділитися').click();


    cy.window().then((win) => {
      cy.get('@copy').should('have.been.calledWith', win.location.href);
    });


    cy.contains('button', 'Скопійовано!').should('be.visible');

    cy.tick(2000);
    cy.contains('button', 'Поділитися').should('be.visible');
  });

});