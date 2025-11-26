import BrowserLayout from '../components/BrowserLayout/BrowserLayout.jsx';
import { PLAYLISTS_MOCK } from '../shared/utils/mockData.js';
import { Container, PageContainer } from '../ui/Container.jsx';

const PlaylistsPage = () => {
  return (
    <PageContainer $padding="0 5rem">
      <BrowserLayout
        type="playlist"
        maxNumberOfCards={9}
        playlists={PLAYLISTS_MOCK}
        showPageNavigation={true}
        playlistVariant="grid"
      />
    </PageContainer>
  );
};

export default PlaylistsPage;
