import styled from 'styled-components';
import hollowBookmark from '../../../assets/hollowBookmark.svg';
import hollowHeart from '../../../assets/hollowHeart.svg';
import filledBookmark from '../../../assets/filledBookmark.svg';
import filledHeart from '../../../assets/filledHeart.svg';
import star from '../../../assets/star.svg';
import clock from '../../../assets/clock.svg';
import {
  ActionButtons,
  Card,
  CardLink,
  IconButton,
  Image,
  ImageWrapper,
  CardContent,
  MetaInfo,
  MetaItemWrapper,
} from '../SharedComponents.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLikedRecipesIdsSet,
  selectSavedInPlaylistRecipesIdsSet,
} from '../../../store/selectors/authSelectors.js';
import useAuthAction from '../../../shared/hooks/useAuthAction.js';
import { useLikeRecipeMutation } from '../../../store/api/recipesApi.js';
import { setSaveRecipeModal } from '../../../store/uiSlice.js';

export const RecipeCard = ({ recipe }) => {

  const { id, title, image, time, difficulty, rating } = recipe;

  const withAuth = useAuthAction();
  const dispatch = useDispatch();
  const [likeRecipe] = useLikeRecipeMutation();
  const likedSet = useSelector(selectLikedRecipesIdsSet);
  const savedInPlaylist = useSelector(selectSavedInPlaylistRecipesIdsSet);

  const isLiked = likedSet.has(id);
  const isSaved = savedInPlaylist.has(id);

  const handleLikeButtonClick =withAuth(()=>{
    likeRecipe({id, like: !isLiked});
  })
  const handleSaveButtonClick  = withAuth(()=>{
    dispatch(setSaveRecipeModal({isOpen:true, recipeId:id}));
  })
  return (
    <Card>
      <CardLink to={`/recipes/${id}`}>
        <ImageWrapper>
          <Image src={image} alt={title} />
        </ImageWrapper>
        <CardContent>
          <Title>{title}</Title>
          <MetaInfo>
            <MetaItemWrapper>
              <img src={clock} alt="Годинник" />
              <p>{time}</p>
            </MetaItemWrapper>
            <MetaItemWrapper>
              <Difficulty $level={difficulty} /> <p>{difficulty}</p>
            </MetaItemWrapper>
            <MetaItemWrapper>
              <img src={star} alt="Зірка" /> <p>{rating}</p>
            </MetaItemWrapper>
          </MetaInfo>
        </CardContent>
      </CardLink>
      <ActionButtons>
        <IconButton type="button" onClick={handleLikeButtonClick}>
          <img src={isLiked ? filledHeart : hollowHeart} alt="Уподобати" />
        </IconButton>
        <IconButton type="button" onClick={handleSaveButtonClick}>
          <img src={isSaved ? filledBookmark : hollowBookmark} alt="Зберегти" />
        </IconButton>
      </ActionButtons>
    </Card>
  );
};

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 32px;
  word-wrap: break-word;
`;

export const Difficulty = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;

  background-color: ${({ $level }) =>
    $level === 'Складно'
      ? '#E13235'
      : $level === 'Легко'
        ? '#1FA928'
        : '#E3C73B'};
`;
