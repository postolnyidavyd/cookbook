import styled, { css } from 'styled-components';

export const WideFocusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  padding: ${({ $padding }) => $padding || '1rem 0.625rem'};
  align-self: stretch;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
  ${({ $secondary }) =>
    $secondary
      ? css`
          background: #faf4e1;
          color: #000000;
          &:hover {
            background-color: #ebe5d5;
          }
        `
      : css`
          background: #2d4a2f;
          color: #ffffff;

          &:hover {
            background-color: #1e331f;
          }
        `}
`;
