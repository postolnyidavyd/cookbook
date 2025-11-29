import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
    0% { background-color: #e0e0e0; }
    50% { background-color: #f5f5f5; }
    100% { background-color: #e0e0e0; }
`;

export const SkeletonCard = styled.div`
  width: 100%;
  height: 400px; 
  border-radius: 1rem;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;