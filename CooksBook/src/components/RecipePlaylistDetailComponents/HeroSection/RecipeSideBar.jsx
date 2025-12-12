import clockIcon from '../../../assets/clock.svg';
import whiteHeart from '../../../assets/heartWhite.svg';
import filledHeart from '../../../assets/filledHeart.svg';
import bookmark from '../../../assets/bookmarkBig.svg';
import filledBookmark from '../../../assets/filledBookmark.svg';
import share from '../../../assets/share.svg';
import { WideFocusButton } from '../../../ui/buttons/WideFocusButton.jsx';
import { Wrapper } from '../../../ui/texts/Wrapper.jsx';
import { MetaContainer, MetaParagraph, SideBarContainer } from './Shared.jsx';
import {
  AvatarImage,
  DifficultyBigger,
  MetaImage,
  Rating,
} from '../SharedComponents/SharedComponents.jsx';
import { setSaveRecipeModal } from '../../../store/uiSlice.js';
import useAuthAction from '../../../shared/hooks/useAuthAction.js';
import { useDispatch, useSelector } from 'react-redux';
import { useLikeRecipeMutation } from '../../../store/api/recipesApi.js';
import {
  selectLikedRecipesIdsSet,
  selectSavedInPlaylistRecipesIdsSet,
} from '../../../store/selectors/authSelectors.js';
import { useState } from 'react';
const RecipeSideBar = ({
  recipeId,
  rating,
  avatar,
  authorName,
  time,
  difficulty,
}) => {
  const [shareButtonState, setShareButtonState] = useState("Поділитися");
  const dispatch = useDispatch();
  const [likeRecipe] = useLikeRecipeMutation();
  const likedSet = useSelector(selectLikedRecipesIdsSet);
  const savedInPlaylist = useSelector(selectSavedInPlaylistRecipesIdsSet);

  const isLiked = likedSet.has(recipeId);
  const isSaved = savedInPlaylist.has(recipeId);

  const withAuth = useAuthAction();
  
  const handleLikeButtonClick = withAuth(() => {
    likeRecipe({ id: recipeId, like: !isLiked });
  });
  const handleSaveButtonClick = withAuth(() => {
    dispatch(setSaveRecipeModal({isOpen: true, recipeId}));
  });

  const handleShareButtonClick = async() => {
    try{
    setShareButtonState("Копіємо..."); 
    const text = window.location.href;
    await navigator.clipboard.writeText(text);
    setShareButtonState("Скопійовано!")
    setTimeout(() => {
      setShareButtonState("Поділитися");
    }, 2000);
    }catch{
      setShareButtonState("Помилка копіювання")
      setTimeout(() => {
        setShareButtonState("Поділитися");
      }, 2000);
    }

  };

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
        <WideFocusButton onClick={handleLikeButtonClick}>
          <MetaImage src={isLiked ? filledHeart : whiteHeart} />
          {isLiked ? "Вподобано" : "Вподобати рецепт"}
        </WideFocusButton>
        <WideFocusButton $minWidth="100%" onClick={handleSaveButtonClick}>
          <MetaImage src={isSaved ? filledBookmark : bookmark} alt={isSaved? "Збережено" : "Зберегти"}/>
          Додати до плейлиста
        </WideFocusButton>
        <WideFocusButton $minWidth="100%" onClick={handleShareButtonClick}>
          <MetaImage src={share} />
          {shareButtonState}
        </WideFocusButton>
      </MetaContainer>
    </SideBarContainer>
  );
};

export default RecipeSideBar;
