import styled from 'styled-components';
import hollowBookmark from '../../assets/hollowbookmark.svg';
import hollowHeart from '../../assets/hollowicon.svg';
import filledBookmark from '../../assets/filledbookmark.svg';
import filledHeart from '../../assets/filledheart.svg';
import star from '../../assets/star.svg';
import clock from '../../assets/clock.svg';

export const RecipeCard = ({ recipe }) => {
  return (
    <Card>
      <ImageWrapper>
        <Image src={recipe.image} alt={recipe.title} />
        <ActionButtons>
          <IconButton>
            <img
              src={recipe.liked ? filledHeart : hollowHeart}
              alt="Уподобати"
            />
          </IconButton>
          <IconButton>
            <img
              src={recipe.saved ? filledBookmark : hollowBookmark}
              alt="Зберегти"
            />
          </IconButton>
        </ActionButtons>
      </ImageWrapper>
      <CardContent>
        <Title>{recipe.title}</Title>
        <MetaInfo>
          <MetaItemWrapper>
            <img src={clock} alt="Годинник" />
            <p>{recipe.time}</p>
          </MetaItemWrapper>
          <MetaItemWrapper>
            <Difficulty $level={recipe.difficulty} /> <p>{recipe.difficulty}</p>
          </MetaItemWrapper>
          <MetaItemWrapper>
            <img src={star} alt="Зірка" /> <p>{recipe.rating}</p>
          </MetaItemWrapper>
        </MetaInfo>
      </CardContent>
    </Card>
  );
};
const Difficulty = styled.div`
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
const MetaItemWrapper = styled.div`
  color: #757575;
  font-size: 0.875rem;
  width: auto;
  height: auto;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  gap: 0.25rem;
`;
const Card = styled.div`
  background-color: #d4d9ca; /* Світло-зелений */
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 200ms;
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66.67%; /* Співвідношення 3:2 */
  overflow: hidden;
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ActionButtons = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const IconButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  //align-items: center;
  justify-content: center;
`;
const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 32px;
  word-wrap: break-word;
`;
const MetaInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.9rem;
`;
const Time = styled.span`
  color: #666;
`;
