import styled from 'styled-components';
import { selectUser } from '../store/selectors/authSelectors.js';
import { useSelector } from 'react-redux';
import { generateUrl } from '../shared/utils/generateUrl.js';

import { Container, PageContainer } from '../ui/Container.jsx';
import { BigAvatarImage } from '../components/RecipePlaylistDetailComponents/SharedComponents/SharedComponents.jsx';
import { Paragraph } from '../ui/texts/Paragraph.jsx';
import { FocusButton } from '../ui/buttons/FocusButton.jsx';
import { Wrapper } from '../ui/Wrapper.jsx';
import { MetaContainer } from '../components/RecipePlaylistDetailComponents/HeroSection/Shared.jsx';
import { TextLink } from '../components/CarouselItem/CarouselItem.jsx';

import RecipeCarouselSection from '../components/Carousel/RecipeCarouselSection.jsx';
import PlaylistCarouselSection from '../components/Carousel/PlaylistCarouselSection.jsx';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const surname = user.username.split(' ')[0];
  const name = user.username.split(' ')[1];
  return (
    <ProfilePageContainer $padding="0 2rem">
      <HeaderProfileContainer $width="fit-content" $padding="2rem 1.25rem">
        <MetaContainer $gap="1rem">
          <Wrapper>
            <BigAvatarImage src={generateUrl(user.avatar)} alt="Аватар" />
            <NameContainer>
              <Paragraph>{surname}</Paragraph>
              <Paragraph>{name}</Paragraph>
            </NameContainer>
          </Wrapper>
          <Paragraph>Пошта: {user.email}</Paragraph>
        </MetaContainer>
        <FocusButton>Змінити дані</FocusButton>
      </HeaderProfileContainer>
      <ProfileContainer $padding="1rem 1rem">
        <RecipeCarouselSection queryParams={{ authorId: user.id }}>
          <Title>Мої рецепти</Title>
          <FocusButton>
            <TextLink to="/profile/new-recipe">Додати рецепт</TextLink>
          </FocusButton>
        </RecipeCarouselSection>
      </ProfileContainer>
      <ProfileContainer $padding="1rem 1rem">
        <PlaylistCarouselSection queryParams={{ ownerId: user.id }}>
          <Title>Мої плейлисти</Title>
        </PlaylistCarouselSection>
      </ProfileContainer>
      <ProfileContainer $padding="1rem 1rem">
        <RecipeCarouselSection queryParams={{ likedBy: user.id }}>
          <Title>Вподобані рецепти</Title>
        </RecipeCarouselSection>
      </ProfileContainer>
      <ProfileContainer $padding="1rem 1rem">
        <PlaylistCarouselSection queryParams={{ likedBy: user.id }}>
          <Title>Вподобані плейлисти</Title>
        </PlaylistCarouselSection>
      </ProfileContainer>
    </ProfilePageContainer>
  );
};
const ProfilePageContainer = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
`;
const Title = styled.h4`
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
`;
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const ProfileContainer = styled(Container)`
  border-radius: 1.25rem;
  border: 1px solid #757575;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const HeaderProfileContainer = styled(ProfileContainer)`
  gap: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
`;
export default ProfilePage;
