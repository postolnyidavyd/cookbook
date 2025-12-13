import styled from 'styled-components';
import { Card } from './ContentCard.jsx';

export const BorderCard = styled(Card)`
  width: ${({ $width }) => $width || 'auto'};
  border: 1px solid #757575;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem;
`;
