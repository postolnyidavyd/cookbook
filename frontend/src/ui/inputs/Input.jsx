import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
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
export default Input;
