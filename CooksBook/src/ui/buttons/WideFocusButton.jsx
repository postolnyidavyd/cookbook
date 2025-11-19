import styled from 'styled-components';

export const WideFocusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  padding: 1rem 0.625rem;
  align-self: stretch;
  border-radius: 1rem;
  background: #2d4a2f;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: color 160ms ease;
  font-size: 1rem;
  &:hover {
    background-color: #1e331f;
  }
`;
