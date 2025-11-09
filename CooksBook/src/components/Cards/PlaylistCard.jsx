import styled from 'styled-components';
import filledHeart from '../../assets/filledHeart.svg';
import hollowHeart from '../../assets/hollowHeart.svg';
import book from '../../assets/book.svg';
import eye from '../../assets/eye.svg';
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
} from './SharedComponents.jsx';

export const PlaylistCard = ({ playlist }) => {
  const {
    id,
    title,
    author,
    authorAvatar,
    recipeCount,
    views,
    cover,
    isLiked,
  } = playlist;
  return (
    <PlayListCard>
      <CardLink to={`/playlists/${id}`}>
        <Image src={cover} alt={title} />
        <Overlay>
          <CardContent $gap="2rem">
            <Title>{title}</Title>
            <MetaInfo>
              <MetaItemWrapper>
                <MetaAvatar src={authorAvatar} />
                <p>{author}</p>
              </MetaItemWrapper>
              <MetaItemWrapper>
                <MetaImg src={book} alt="Книга" /> <p>{recipeCount} рецептів</p>{' '}
              </MetaItemWrapper>
              <MetaItemWrapper>
                <MetaImg src={eye} alt="Око" /> <p>{views} переглядів</p>
              </MetaItemWrapper>
            </MetaInfo>
          </CardContent>
        </Overlay>
      </CardLink>
      <ActionButtons style={{ zIndex: '2' }}>
        <IconButton>
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
  font-size: 32px;
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
