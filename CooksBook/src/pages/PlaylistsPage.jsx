import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { PLAYLISTS_MOCK } from '../shared/utils/mockData.js';
import styled from 'styled-components';
import { Container } from '../ui/Container.jsx';

const PlaylistsPage = () => {
  return (
    <Container >
      <BrowserLayout
        type="playlist"
        maxNumberOfCards={9}
        playlists={PLAYLISTS_MOCK}
        showPageNavigation={true}
        playlistVariant="grid"
      />
    </Container>
  );
};


export default PlaylistsPage;
