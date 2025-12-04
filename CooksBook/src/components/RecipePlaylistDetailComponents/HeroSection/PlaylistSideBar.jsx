import { MetaContainer, SideBarContainer } from './Shared.jsx';
import { Wrapper } from '../../../ui/texts/Wrapper.jsx';
import {
  AvatarImage,
  MetaImage,
} from '../SharedComponents/SharedComponents.jsx';
import { MetaParagraph } from './Shared.jsx';
import book from '../../../assets/book.svg';
import eye from '../../../assets/eye.svg';
import hash from '../../../assets/hash.svg';
import styled from 'styled-components';
import { WideFocusButton } from '../../../ui/buttons/WideFocusButton.jsx';
import whiteHeart from '../../../assets/heartWhite.svg';
import share from '../../../assets/share.svg';
import { useState } from 'react';
import { useLikePlaylistMutation } from '../../../store/api/playlistApi.js';
import { useSelector } from 'react-redux';
import { selectLikedPlaylistsIdsSet } from '../../../store/selectors/authSelectors.js';
import useAuthAction from '../../../shared/hooks/useAuthAction.js';
import filledHeart from '../../../assets/filledHeart.svg';
const PlaylistSideBar = ({
  playlistId,
  authorName,
  avatar,
  recipesCount,
  views,
  tags,
}) => {
  const [shareButtonState, setShareButtonState] = useState('Поділитися');
  const [likePlaylist] = useLikePlaylistMutation();
  const likedSet = useSelector(selectLikedPlaylistsIdsSet);
  const isLiked = likedSet.has(playlistId);
  const withAuth = useAuthAction();

  const handleLikeButtonCLick = withAuth(() => {
    likePlaylist({ id: playlistId, like: !isLiked });
  });
  const handleShareButtonClick = async () => {
    try {
      setShareButtonState('Копіюємо...');
      const text = window.location.href;
      await navigator.clipboard.writeText(text);
      setShareButtonState('Скопійовано!');
      setTimeout(() => {
        setShareButtonState('Поділитися');
      }, 2000);
    } catch {
      setShareButtonState('Помилка копіювання');
      setTimeout(() => {
        setShareButtonState('Поділитися');
      }, 2000);
    }
  };
  return (
    <SideBarContainer>
      <MetaContainer>
        <Wrapper $gap="1">
          <AvatarImage src={avatar} alt={authorName} />
          <MetaParagraph>{authorName}</MetaParagraph>
        </Wrapper>
        <Wrapper $gap="1">
          <MetaImage src={book} alt="Книга" />
          <MetaParagraph>{recipesCount} рецептів</MetaParagraph>
        </Wrapper>
        <Wrapper $gap="1">
          <MetaImage src={eye} alt="Око" />
          <MetaParagraph>{views} переглядів</MetaParagraph>
        </Wrapper>
        <TagsList tags={tags} />
      </MetaContainer>
      <MetaContainer $gap="0.625rem">
        <WideFocusButton onClick={handleLikeButtonCLick}>
          <MetaImage src={isLiked ? filledHeart : whiteHeart} />
          {isLiked ? "Вподобано" : "Вподобати плейлист"}
        </WideFocusButton>
        <WideFocusButton $minWidth="100%" onClick={handleShareButtonClick}>
          <MetaImage src={share} />
          {shareButtonState}
        </WideFocusButton>
      </MetaContainer>
    </SideBarContainer>
  );
};

export const TagsList = ({ tags }) => {
  return (
    <TagsWrapper>
      {tags.map((tag) => (
        <Tag key={tag}>
          <img src={hash} alt="" /> {tag.toLowerCase()}
        </Tag>
      ))}
    </TagsWrapper>
  );
};

const TagsWrapper = styled.div`
  gap: 0.625rem 0.625rem;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.2rem 0.7rem;
  border-radius: 100rem;
  background: #b2bba2;
  color: #1e1e1e;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
`;
export default PlaylistSideBar;
