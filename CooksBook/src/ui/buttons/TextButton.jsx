import styled from 'styled-components';

export const TextButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: inherit;
  color: ${({ $isMain }) => ($isMain ? '#1E1E1E' : '#757575')};
  cursor: pointer;
  transition: color 160ms ease;

  &:hover {
    color: ${({ $isMain }) => ($isMain ? '#000000' : '#1E1E1E')};
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
