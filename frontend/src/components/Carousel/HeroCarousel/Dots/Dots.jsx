import styled, { css } from 'styled-components';

const Dots = ({ count, current, onSelect }) => {
  return (
    <DotsWrapper role="tablist" data-testid="dots">
      {Array.from({ length: count }).map((_, i) => (
        <Dot
          key={i}
          $active={i === current}
          onClick={() => onSelect(i)}
          role="tab"
          aria-selected={i === current}
        />
      ))}
    </DotsWrapper>
  );
};

const DotsWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  margin: 1rem 0; /* Відступ зверху від карусельки */
`;

const Dot = styled.button`
  width: 1.5rem;
  height: 0.625rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  padding: 0;
  transition:
    background-color 160ms ease,
    width 160ms ease;

  ${({ $active }) =>
    $active
      ? css`
          width: 2.5rem;
          background-color: #2d4a2f;
        `
      : css`
          background-color: #b2bba2;

          &:hover {
            background-color: #a7b098;
          }
        `}
`;

export default Dots;
