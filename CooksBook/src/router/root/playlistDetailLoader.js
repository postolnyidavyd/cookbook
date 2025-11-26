import { PLAYLIST_DETAIL_MOCK } from '../../shared/utils/mockData.js';
import store from '../../store/store.js';
import { recipesApi } from '../../store/api/recipesApi.js';

const playlistDetailLoader = async ({ params }) => {
  const { playlistId } = params;
  store.dispatch(recipesApi.endpoints.getPlaylistById.initiate(playlistId))
  return null;
};

export default playlistDetailLoader;