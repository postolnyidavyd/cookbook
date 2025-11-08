import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { PLAYLISTS_MOCK } from '../shared/utils/mockData.js';
import styled from 'styled-components';

const PlaylistsPage = () => {
  return (
    <Page>
      <Header>
        <Badge>Натхнення</Badge>
        <Title>Плейлисти</Title>
        <Description>
          Тематичні добірки рецептів від команди та спільноти: обирайте настрій та готуйте
          разом з нами.
        </Description>
        <HelperText>Відкрийте плейлист, щоб переглянути всі рецепти та рекомендації.</HelperText>
      </Header>
      <BrowserLayout
        type="playlist"
        maxNumberOfCards={9}
        playlists={PLAYLISTS_MOCK}
        showPageNavigation={true}
        playlistVariant="grid"
      />
    </Page>
  );
};

const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.section`
  padding: 3.5rem 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Badge = styled.span`
  align-self: flex-start;
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  background: rgba(30, 51, 31, 0.12);
  color: #1e331f;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: #1e331f;
`;

const Description = styled.p`
  max-width: 40rem;
  font-size: 1.15rem;
  color: #4d5d4e;
  line-height: 1.6;
`;

const HelperText = styled.span`
  font-size: 0.95rem;
  color: #5f6c5f;
`;

export default PlaylistsPage;
