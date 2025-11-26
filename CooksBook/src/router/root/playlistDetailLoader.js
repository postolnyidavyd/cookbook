import { PLAYLIST_DETAIL_MOCK } from '../../shared/utils/mockData.js';

const playlistDetailLoader = async ({ params }) => {
  const { playlistId } = params;
  console.log(playlistId);
  return PLAYLIST_DETAIL_MOCK;
};

export default playlistDetailLoader;