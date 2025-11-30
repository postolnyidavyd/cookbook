import { PlaylistCard } from './PlaylistCard.jsx';
// Імпортуємо картинки, щоб перевірити src (Cypress бачить їх як шлях)
import filledHeart from '../../../assets/filledHeart.svg';
import hollowHeart from '../../../assets/hollowHeart.svg';

describe('<PlaylistCard />', () => {

  // Мок-дані для плейлиста
  const mockPlaylist = {
    id: '101',
    name: 'Найкращі сніданки',
    coverImage: '/uploads/playlist-cover.jpg',
    views: 1500,
    recipesCount: 12,
    owner: {
      name: 'Шеф Іван',
      avatar: '/uploads/avatar.jpg'
    }
  };

  it('відображає інформацію про плейлист', () => {
    cy.mount(<PlaylistCard playlist={mockPlaylist} />);

    // Перевіряємо тексти
    cy.contains('Найкращі сніданки').should('be.visible');
    cy.contains('Шеф Іван').should('be.visible');
    cy.contains('12 рецептів').should('be.visible');
    cy.contains('1500 переглядів').should('be.visible');

    // Перевіряємо картинку
    cy.get(`img[alt="Найкращі сніданки"]`)
      .should('have.attr', 'src')
      .and('include', 'playlist-cover.jpg');
  });

  it('показує пусте серце, якщо плейлист не лайкнутий', () => {
    cy.mount(<PlaylistCard playlist={mockPlaylist} />, {
      initialState: {
        auth: {
          isAuthenticated: true,
          user: {
            likedPlaylists: []
          }
        }
      }
    });

    cy.get('button').find('img').should('have.attr', 'src', hollowHeart);
  });

  it('показує зафарбоване серце, якщо плейлист лайкнутий', () => {
    cy.mount(<PlaylistCard playlist={mockPlaylist} />, {
      initialState: {
        auth: {
          isAuthenticated: true,
          user: {
            likedPlaylists: ['101']
          }
        }
      }
    });

    cy.get('button').find('img').should('have.attr', 'src', filledHeart);
  });

  it('відправляє мутацію likePlaylist при кліку', () => {
    cy.intercept('POST', '/api/playlists/101/like', {
      statusCode: 200,
      body: { success: true }
    }).as('likeRequest');

    //монтуємо компонент із залогіненим юзером щоб useAuthAction пропустив клік
    cy.mount(<PlaylistCard playlist={mockPlaylist} />, {
      initialState: {
        auth: {
          isAuthenticated: true,
          user: { likedPlaylists: [] }
        }
      }
    });


    cy.get('button').children().should('have.attr', 'alt', 'Уподобати')
    cy.get('button').click();

    cy.wait('@likeRequest').then((interception) => {
      // перевіряємо, що ми відправляємо like: true
      expect(interception.request.body).to.deep.equal({ like: true });
    });
  });

  it('має правильне посилання на сторінку деталей', () => {
    cy.mount(<PlaylistCard playlist={mockPlaylist} />);

    cy.get('a').should('have.attr', 'href', '/playlists/101');
  });

});