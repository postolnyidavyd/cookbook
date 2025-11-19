import styled from 'styled-components';

export const SideBarContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
export const MetaContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ $gap }) => $gap || '1.5rem'};
`;
export const MetaParagraph = styled.p`
  font-size: 1.5rem;
`;
