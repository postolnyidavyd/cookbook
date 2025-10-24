import styled, { css } from 'styled-components';
import filledHeart from '../../assets/filledheart.svg';

export const PlaylistCard = ({ playlist, variant = 'carousel', onOpen }) => {
  const { title, cover, author, authorAvatar, recipeCount, isFavorite } = playlist;
  const isClickable = typeof onOpen === 'function';

  const handleOpen = (event) => {
    event.stopPropagation();
    onOpen?.(playlist);
  };

  return (
    <Card
      $variant={variant}
      $clickable={isClickable}
      onClick={isClickable ? () => onOpen(playlist) : undefined}
    >
      <CoverImage src={cover} alt={title} />
      <Overlay $variant={variant}>
        <FavoriteButton
          type="button"
          aria-label={
            isFavorite ? 'Видалити плейлист з обраних' : 'Додати плейлист до обраних'
          }
          aria-pressed={Boolean(isFavorite)}
          onClick={(event) => event.stopPropagation()}
          $variant={variant}
        >
          <HeartIcon src={filledHeart} alt="Уподобати" $active={isFavorite} />
        </FavoriteButton>
        <Content $variant={variant}>
          <Title $variant={variant}>{title}</Title>
          <AuthorInfo>
            {authorAvatar && <AuthorAvatar src={authorAvatar} alt={author} />}
            <AuthorName $variant={variant}>{author}</AuthorName>
          </AuthorInfo>
          <Footer>
            <RecipesCount $variant={variant}>{recipeCount} рецептів</RecipesCount>
            <ViewButton type="button" onClick={handleOpen} $variant={variant}>
              Переглянути
            </ViewButton>
          </Footer>
        </Content>
      </Overlay>
    </Card>
  );
};

const cardBackground = {
  carousel: '#122818',
  grid: '#d4d9ca',
};

const Card = styled.article`
  position: relative;
  display: flex;
  border-radius: 2rem;
  overflow: hidden;
  min-height: 22rem;
  background: ${({ $variant }) => cardBackground[$variant] || cardBackground.carousel};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CoverImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  padding: 2rem 1.75rem 1.75rem;
  ${({ $variant }) =>
    $variant === 'grid'
      ? css`
          background: linear-gradient(
            180deg,
            rgba(250, 244, 225, 0.75) 0%,
            rgba(212, 217, 202, 0.9) 100%
          );
        `
      : css`
          background: linear-gradient(
            180deg,
            rgba(244, 236, 208, 0.08) 0%,
            rgba(18, 40, 24, 0.82) 100%
          );
        `}
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease, opacity 0.3s ease;
  ${({ $variant }) =>
    $variant === 'grid'
      ? css`
          background: rgba(30, 51, 31, 0.1);
          backdrop-filter: blur(6px);
        `
      : css`
          background: rgba(244, 246, 239, 0.92);
        `}

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const HeartIcon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ $variant }) => ($variant === 'grid' ? '#1e331f' : '#fdfcf5')};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ $variant }) => ($variant === 'grid' ? '#1e331f' : '#fdfcf5')};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AuthorAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(244, 246, 239, 0.65);
`;

const AuthorName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $variant }) => ($variant === 'grid' ? '#3a4a3b' : 'rgba(244, 246, 239, 0.92)')};
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const RecipesCount = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ $variant }) => ($variant === 'grid' ? '#4b5c4c' : 'rgba(244, 246, 239, 0.85)')};
`;

const ViewButton = styled.button`
  padding: 0.55rem 1.6rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease, color 0.3s ease;
  ${({ $variant }) =>
    $variant === 'grid'
      ? css`
          background: rgba(30, 51, 31, 0.12);
          color: #1e331f;

          &:hover {
            background: rgba(30, 51, 31, 0.2);
            transform: translateY(-1px);
          }
        `
      : css`
          background: rgba(244, 246, 239, 0.95);
          color: #1e331f;

          &:hover {
            background: #ffffff;
            transform: translateY(-1px);
          }
        `}
`;
