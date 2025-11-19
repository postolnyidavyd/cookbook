import styled from 'styled-components';
import clockIcon from '../../../assets/clock.svg';
import whiteHeart from '../../../assets/heartWhite.svg';
import bookmark from '../../../assets/bookmarkBig.svg';
import share from '../../../assets/share.svg';
import { Container } from '../../../ui/Container.jsx';
import { Display } from '../../../ui/texts/Display.jsx';
import { WideFocusButton } from '../../../ui/buttons/WideFocusButton.jsx';
import { Wrapper } from '../../../ui/Wrapper.jsx';
import { MetaContainer, MetaParagraph, SideBarContainer } from './Shared.jsx';
import {
  AvatarImage,
  DifficultyBigger,
  MetaImage,
  Rating,
} from '../SharedComponents/SharedComponents.jsx';


const RecipeSideBar = ({ rating, avatar, authorName, time, difficulty }) => {
  return (
    <SideBarContainer>
      <MetaContainer>
        <Rating rating={rating} />
        <Wrapper $gap="1">
          <AvatarImage src={avatar} alt={authorName} />
          <MetaParagraph>{authorName}</MetaParagraph>
        </Wrapper>
        <Wrapper $gap="1">
          <MetaImage src={clockIcon} />
          <MetaParagraph>{time}</MetaParagraph>
        </Wrapper>
        <Wrapper $gap="1">
          <DifficultyBigger $level={difficulty} />
          <MetaParagraph>{difficulty}</MetaParagraph>
        </Wrapper>
      </MetaContainer>
      <MetaContainer $gap="0.625rem">
        <WideFocusButton>
          <MetaImage src={whiteHeart} />
          Зберегти рецепт
        </WideFocusButton>
        <WideFocusButton $minWidth="100%">
          <MetaImage src={bookmark} />
          Додати до плейлиста
        </WideFocusButton>
        <WideFocusButton $minWidth="100%">
          <MetaImage src={share} />
          Поділитися
        </WideFocusButton>
      </MetaContainer>
    </SideBarContainer>
  );
};

export default RecipeSideBar;
