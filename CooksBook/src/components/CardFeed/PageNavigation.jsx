import { Wrapper } from '../../ui/Wrapper.jsx';
import leftArrow from '../../assets/arrowLeft.svg';
import rightArrow from '../../assets/arrowRight.svg';
import styled, { css } from 'styled-components';

function PageNavigation({ pageCount }) {
  return (
    <NavContainer>
      <Wrapper $gap="1" $margin="3.75rem auto">
        <PageNavigationButton>
          <img src={leftArrow} alt="Ліва стрілка" />
        </PageNavigationButton>
        {Array.from({ length: pageCount }).map((_, i) => (
          <PageNavigationButton key={i} $main={i === 0}>
            {i + 1}
          </PageNavigationButton>
        ))}
        <PageNavigationButton>
          <img src={rightArrow} alt="Права стрілка" />
        </PageNavigationButton>
      </Wrapper>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PageNavigationButton = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 0.625rem;
  font-size: 1.5rem;
  ${({ $main }) =>
    $main
      ? css`
          background-color: #2d4a2f;
          color: #ffffff;
          &:hover {
            background-color: #1e331f;
          }
        `
      : css`
          background-color: #d9d9d9;
          &:hover {
            background-color: #a7b098;
          }
        `}
`;
export default PageNavigation;
