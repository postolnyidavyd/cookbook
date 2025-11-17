import { MetaContainer, SideBarContainer } from './Shared.jsx';
import { Wrapper } from '../../../ui/Wrapper.jsx';
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
import bookmark from '../../../assets/bookmarkBig.svg';
import share from '../../../assets/share.svg';
const PlaylistSideBar = ({ authorName, avatar, recipeCount, views, tags }) => {
  return (
    <SideBarContainer>
      <MetaContainer>
        <Wrapper $gap="1">
          <AvatarImage src={avatar} alt={authorName} />
          <MetaParagraph>{authorName}</MetaParagraph>
        </Wrapper>
        <Wrapper $gap="1">
          <MetaImage src={book} alt="Книга" />
          <MetaParagraph>{recipeCount} рецептів</MetaParagraph>
        </Wrapper>
        <Wrapper $gap="1">
          <MetaImage src={eye} alt="Око" />
          <MetaParagraph>{views} переглядів</MetaParagraph>
        </Wrapper>
        <TagsList tags={tags} />
      </MetaContainer>
      <MetaContainer $gap="0.625rem">
        <WideFocusButton>
          <MetaImage src={whiteHeart} />
          Зберегти плейлист
        </WideFocusButton>
        <WideFocusButton $minWidth="100%">
          <MetaImage src={share} />
          Поділитися
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
