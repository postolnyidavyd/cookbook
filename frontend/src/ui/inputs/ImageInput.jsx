import cameraIcon from '../../assets/camera.svg';
import styled, { css } from 'styled-components';

const ImageInput = ({ img, onAdd, onRemove, size, ...props }) => {
  const handleClick = (event) => {
    if (img && onRemove) {
      event.preventDefault();
      onRemove();
    }
  };
  return (
    <ImageCover onClick={handleClick} $size={size}>
      {img ? (
        <img src={img} alt="Прев'ю зображення" title="Натисніть щоб видалити" />
      ) : (
        <img src={cameraIcon} className="icon" alt="Додати рецепт" />
      )}
      <input type="file" accept="image/*" onChange={onAdd} {...props} />
    </ImageCover>
  );
};

const ImageCover = styled.label`
  display: grid;
  place-items: center;
  ${({ $size }) =>
  $size
    ? css`
          width: ${$size};
          height: ${$size};
        `
    : css`
          width: 11.25rem;
          height: 11.25rem;
        `}
  background: #faf4e1;
  cursor: pointer;
  overflow: hidden;
  border-radius: 1.25rem;
  transition: background-color 160ms ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  & img.icon {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    display: block;
  }
  input {
    display: none;
  }
  &:hover {
    background: #fffdf6;
  }
`;
export default ImageInput