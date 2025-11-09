import { Wrapper } from '../../ui/Wrapper.jsx';
import SmallText from '../../ui/texts/SmallText.jsx';
import styled, { css } from 'styled-components';
import closeIcon from '../../assets/close.svg';
export const Tags = ({ tags }) => {
  return (
    <Wrapper $gap="0.75" style={{ margin: '1rem 0rem', flexWrap: 'wrap' }}>
      {tags && (
        <>
          <TagButton $main>
            <SmallText>Очистити все</SmallText>
          </TagButton>{' '}
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </>
      )}
    </Wrapper>
  );
};
const Tag = ({ children }) => {
  return (
    <TagButton>
      <SmallText>{children}</SmallText>
      <img src={closeIcon} alt="Закрити" />
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
