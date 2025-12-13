import styled from 'styled-components';
import filledHeart from '../../../assets/filledHeart.svg';
import hollowHeart from '../../../assets/hollowHeart.svg';
import book from '../../../assets/book.svg';
import eye from '../../../assets/eye.svg';
import {
  ActionButtons,
  Card,
  CardContent,
  CardLink,
  IconButton,
  Image,
  ImageWrapper,
  MetaInfo,
  MetaItemWrapper,
} from '../SharedComponents.jsx';
import { useSelector } from 'react-redux';
import { selectLikedPlaylistsIdsSet } from '../../../store/selectors/authSelectors.js';
import { generateUrl } from '../../../shared/utils/generateUrl.js';
import useAuthAction from '../../../shared/hooks/useAuthAction.js';
import { useLikePlaylistMutation } from '../../../store/api/playlistApi.js';

export const PlaylistCard = ({ playlist }) => {
  const { id, name, coverImage, views, owner, recipesCount } = playlist;
  const { name: ownerName, avatar } = owner;
  const likedPlaylistsSet = useSelector(selectLikedPlaylistsIdsSet);
  const isLiked = likedPlaylistsSet.has(id);

  const withAuth = useAuthAction();
  const [likePlaylist] = useLikePlaylistMutation();

  const handleLikeButtonClick = withAuth(() => {
    likePlaylist({ id, like: !isLiked });
  });
  return (
    <PlayListCard>
      <CardLink to={`/playlists/${id}`}>
        <Image src={generateUrl(coverImage)} alt={name} />
        <Overlay>
          <CardContent $gap="2rem">
            <Title>{name}</Title>
            <MetaInfo>
              <MetaItemWrapper>
                <MetaAvatar src={generateUrl(avatar)} />
                <p>{ownerName}</p>
              </MetaItemWrapper>
              <MetaItemWrapper>
                <MetaImg src={book} alt="Книга" />
                <p>{recipesCount} рецептів</p>
              </MetaItemWrapper>
              <MetaItemWrapper>
                <MetaImg src={eye} alt="Око" />
                <p>{views} переглядів</p>
              </MetaItemWrapper>
            </MetaInfo>
          </CardContent>
        </Overlay>
      </CardLink>
      <ActionButtons style={{ zIndex: '2' }}>
        <IconButton onClick={handleLikeButtonClick}>
          <img src={isLiked ? filledHeart : hollowHeart} alt="Уподобати" />
        </IconButton>
      </ActionButtons>
    </PlayListCard>
  );
};
const PlayListCard = styled(Card)`
  aspect-ratio: 6 / 6;
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: linear-gradient(
    0deg,
    #b2bba2 3.32%,
    rgba(198, 207, 181, 0.75) 58.28%
  );
`;
const Title = styled.h3`
  color: #000;
  font-size: 1.5rem;
  font-weight: 600;
`;
const MetaImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
const MetaAvatar = styled(MetaImg)`
  border-radius: 50%;
  object-fit: cover;
`;
