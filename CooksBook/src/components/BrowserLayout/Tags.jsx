import { Wrapper } from '../../ui/Wrapper.jsx';
import SmallText from '../../ui/texts/SmallText.jsx';
import styled, { css } from 'styled-components';
import closeIcon from '../../assets/close.svg';
export const Tags = ({ tags, filterKey, onChange }) => {
  if (!tags || tags.length === 0) return null;
  const handleClear = () => onChange(filterKey, '');
  const handleRemove = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);

    onChange(filterKey, updatedTags.join(','));
  };
  return (
    <Wrapper $gap="0.75" $margin="1rem 0rem" style={{ flexWrap: 'wrap' }}>
      {tags && (
        <>
          <TagButton $main onClick={handleClear}>
            <SmallText>Очистити все</SmallText>
          </TagButton>
          {tags.map((tag) => (
            <Tag key={tag} onRemove={() => handleRemove(tag)}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    </Wrapper>
  );
};
const Tag = ({ children, onRemove }) => {
  return (
    <TagButton onClick={onRemove} type="button">
      <SmallText>{children}</SmallText>
      <img src={closeIcon} alt="Видалити" />
    </TagButton>
  );
};
const TagButton = styled.button`
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  ${({ $main }) =>
    $main
      ? css`
          background-color: #2d4a2f;
          color: white;
          &:hover {
            background-color: #1e331f;
          }
        `
      : css`
          background-color: #b2bba2;
          &:hover {
            background-color: #a7b098;
          }
        `}
`;
