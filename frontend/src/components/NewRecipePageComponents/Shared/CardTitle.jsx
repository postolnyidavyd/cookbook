import styled from 'styled-components';

export const CardTitle = styled.h2`
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: ${({ $noMargin }) => ($noMargin ? '' : '1.25rem')};
`;
