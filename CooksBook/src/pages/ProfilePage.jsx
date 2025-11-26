import styled from 'styled-components';
import { selectUser } from '../store/selectors/authSelectors.js';
import { useSelector } from 'react-redux';

import { Container, PageContainer } from '../ui/Container.jsx';
import { BigAvatarImage } from '../components/RecipePlaylistDetailComponents/SharedComponents/SharedComponents.jsx';
import { PlaylistCarousel } from '../components/Carousel/PlaylistCarousel.jsx';
import { Paragraph } from '../ui/texts/Paragraph.jsx';
import { FocusButton } from '../ui/buttons/FocusButton.jsx';
import { Wrapper } from '../ui/Wrapper.jsx';
import { MetaContainer } from '../components/RecipePlaylistDetailComponents/HeroSection/Shared.jsx';
import { PLAYLISTS_MOCK, RECIPES_MOCK } from '../shared/utils/mockData.js';
import { TextLink } from '../components/CarouselItem/CarouselItem.jsx';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const surname = user.userName.split(' ')[0];
  const name = user.userName.split(' ')[1];
  return (
    <ProfilePageContainer $padding="0 2rem">
      <HeaderProfileContainer $width="fit-content" $padding="2rem 1.25rem">
        <MetaContainer $gap="1rem">
          <Wrapper>
            <BigAvatarImage src={user.avatar} alt="Аватар" />
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
        <PlaylistCarousel visibleCount="3" type="recipe" items={RECIPES_MOCK}>
          <Title>Мої рецепти</Title>
          <FocusButton>
            <TextLink to="/profile/new-recipe">Додати рецепт</TextLink>
          </FocusButton>
        </PlaylistCarousel>
      </ProfileContainer>
      <ProfileContainer $padding="1rem 1rem">
        <PlaylistCarousel visibleCount="45" items={PLAYLISTS_MOCK}>
          <Title>Мої плейлисти</Title>
        </PlaylistCarousel>
      </ProfileContainer>
      <ProfileContainer $padding="1rem 1rem">
        <PlaylistCarousel type="recipe" items={RECIPES_MOCK}>
          <Title>Вподобані рецепти</Title>
        </PlaylistCarousel>
      </ProfileContainer>
      <ProfileContainer $padding="1rem 1rem">
        <PlaylistCarousel items={PLAYLISTS_MOCK}>
          <Title>Вподобані плейлисти</Title>
        </PlaylistCarousel>
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
