import styled from 'styled-components';

export const Wrapper = styled.div`
  width: auto;
  height: auto;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  ${({ $gap }) => `gap: ${$gap || 2}rem;`}
`;
