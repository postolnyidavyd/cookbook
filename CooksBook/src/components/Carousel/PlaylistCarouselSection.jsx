import { CardCarousel } from './CardCarousel.jsx';
import { useGetPlaylistsQuery } from '../../store/api/playlistApi.js';

const PlaylistCarouselSection = ({ queryParams, title, children }) => {
  const { data, isFetching, isError, error } =
    useGetPlaylistsQuery(queryParams);
  const items = data?.items || [];

  return (
    <CardCarousel
      type="playlist"
      data={items}
      isFetching={isFetching}
      isError={isError}
      error={error}
    >
      {title && <h2>{title}</h2>}
      {children}
    </CardCarousel>
  );
};

export default PlaylistCarouselSection;
