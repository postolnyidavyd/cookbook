import styled from 'styled-components';

export const Container = styled.div`
  width: ${({ $width }) => ($width ? $width : '100%')};
  height: ${({ $height }) => ($height ? $height : 'auto')};
  position: relative;
  overflow: hidden;
  padding: ${({ $padding }) => $padding || '0'};
`;
