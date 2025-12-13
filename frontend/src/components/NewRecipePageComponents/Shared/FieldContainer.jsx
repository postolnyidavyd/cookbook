import styled from 'styled-components';

export const FieldContainer = styled.div`
  width: ${({ $width }) => $width || 'fit-content'};
  position: relative;
`;
