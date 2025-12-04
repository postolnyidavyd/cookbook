import styles from './CarouselItem.module.css';
import { Container } from '../../../../ui/styledBlocks/Container.jsx';
import { Display } from '../../../../ui/texts/Display.jsx';
import { Paragraph } from '../../../../ui/texts/Paragraph.jsx';
import { FocusButton } from '../../../../ui/buttons/FocusButton.jsx';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Item = ({ title, img, buttonText, children, navigateTo, ...props }) => {
  return (
    <div className={styles.carouselItem}>
      <Container $height="100%" $padding="2rem 2rem">
        <Display>{title}</Display>
        <Paragraph>{children}</Paragraph>
        <FocusButton {...props}>
          <TextLink to={navigateTo}>{buttonText}</TextLink>
        </FocusButton>
      </Container>
      <img src={img} alt={title} />
    </div>
  );
};
export const TextLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
export default Item;
