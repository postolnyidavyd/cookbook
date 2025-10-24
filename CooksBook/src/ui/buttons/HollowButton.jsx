import styled from 'styled-components';
import { TextButton } from './TextButton.jsx';

export const HollowButton = styled(TextButton)`
  font-size: 1rem;
  padding: 0.875rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ $isMain }) => ($isMain ? '#1E1E1E' : '#757575')};
  &:hover {
    border: 1px solid ${({ $isMain }) => ($isMain ? '#000000' : '#1E1E1E')};
  }
`;
