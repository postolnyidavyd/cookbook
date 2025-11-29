import styled from 'styled-components';

export const Card = styled.section`
  box-sizing: border-box;
  width: ${({ $width }) => $width || 'auto'};
  padding: ${({ $padding }) => $padding || '0'};
  margin: ${({ $margin }) => $margin || '0'};
  background: #d4d9ca;
  border-radius: 1.25rem;
  box-shadow: ${({ $shadow }) =>
    $shadow || '0 30px 80px rgba(30, 51, 31, 0.15)'};
`;
