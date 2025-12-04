import styled, { keyframes } from 'styled-components';

const LoadingPage = () => {
  return (
    <FullScreenWrapper data-testid="loading-page">
      <Spinner $size="64px" />
    </FullScreenWrapper>
  );
};

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: ${(props) => props.$size || '48px'};
  height: ${(props) => props.$size || '48px'};
  border: 5px solid #e0e0e0;
  border-bottom-color: #1e331f;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
`;

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #faf4e1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
export default LoadingPage;
