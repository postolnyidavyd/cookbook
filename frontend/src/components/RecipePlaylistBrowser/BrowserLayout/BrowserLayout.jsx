import { Container } from '../../../ui/styledBlocks/Container.jsx';

import styled from 'styled-components';

const BrowserLayout = ({
  filterSlot,
  tagsSlot,
  endSlot,
  padding,
  children,
}) => {
  return (
    <Container $padding={padding}>
      {filterSlot}
      {tagsSlot}
      <CardGrid>{children}</CardGrid>
      {endSlot}
    </Container>
  );
};
const CardGrid = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  //grid-template-rows: 27.5rem;
  gap: 1.5rem;
`;

export default BrowserLayout;
