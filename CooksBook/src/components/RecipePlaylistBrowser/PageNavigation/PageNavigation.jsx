import { Wrapper } from '../../../ui/texts/Wrapper.jsx';
import leftArrow from '../../../assets/arrowLeft.svg';
import rightArrow from '../../../assets/arrowRight.svg';
import styled, { css } from 'styled-components';

function PageNavigation({ pageCount, activePage, onChange }) {
  const handleNext = () => onChange(activePage + 1);
  const handlePrev = () => onChange(activePage - 1);
  const handleChoosePage = (page) => onChange(page);
  return (
    <NavContainer>
      <Wrapper $gap="1" $margin="3.75rem auto">
        <PageNavigationButton disabled={activePage === 1} onClick={handlePrev}>
          <img src={leftArrow} alt="Ліва стрілка" />
        </PageNavigationButton>
        {Array.from({ length: pageCount }).map((_, i) => (
          <PageNavigationButton
            key={i}
            $main={i + 1 === activePage}
            disabled={i + 1 === activePage}
            onClick={() => handleChoosePage(i + 1)}
          >
            {i + 1}
          </PageNavigationButton>
        ))}
        <PageNavigationButton
          disabled={activePage === pageCount}
          onClick={handleNext}
        >
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 0.625rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

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
  &:disabled {
    cursor: not-allowed;
  }
`;
export default PageNavigation;
