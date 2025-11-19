import styled from 'styled-components';

export const FocusButton = styled.button`
  min-width: ${({ $minWidth }) => ($minWidth ? $minWidth : '200px')};
  font-size: 1rem;
  padding: 1.25rem 0.75rem;
  cursor: pointer;
  transition: background-color 160ms ease;
  background-color: #2d4a2f;
  color: #ffffff;
  border: none;
  border-radius: 1rem;
  &:hover {
    background-color: #1e331f;
  }
`;
