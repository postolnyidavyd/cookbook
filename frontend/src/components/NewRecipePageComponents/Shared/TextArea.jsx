import styled from 'styled-components';

export const TextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: #faf4e1;
  &:focus {
    outline: 2px solid rgba(45, 74, 47, 0.4);
    background: #fffdf6;
  }
`;
