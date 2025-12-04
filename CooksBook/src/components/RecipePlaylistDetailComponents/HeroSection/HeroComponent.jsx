import { Container } from '../../../ui/styledBlocks/Container.jsx';
import { Display } from '../../../ui/texts/Display.jsx';
import styled from 'styled-components';
import { Description } from '../SharedComponents/SharedComponents.jsx';

const HeroComponent = ({ image, title, description, children }) => {
  return (
    <Container>
      <Display>{title}</Display>
      {description && <HeroDescription>{description}</HeroDescription>}
      <HeroContainer>
        <HeroImg src={image} alt={title} />
        {children}
      </HeroContainer>
    </Container>
  );
};
const HeroContainer = styled.section`
  margin-top: 4rem;
  width: 100%;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 2rem;
`;
const HeroImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 1.25rem;
    max-height: 38rem;
`;
const HeroDescription = styled.h3`
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
`;

export default HeroComponent;
