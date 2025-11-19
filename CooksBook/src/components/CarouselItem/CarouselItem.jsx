import styles from './CarouselItem.module.css';
import { Container } from '../../ui/Container.jsx';
import { Display } from '../../ui/texts/Display.jsx';
import { Paragraph } from '../../ui/texts/Paragraph.jsx';
import { FocusButton } from '../../ui/buttons/FocusButton.jsx';

const Item = ({ title, img, buttonText, children, ...props }) => {
  return (
    <div className={styles.carouselItem}>
      <Container $height="100%" $padding="2rem 2rem">
        <Display>{title}</Display>
        <Paragraph>{children}</Paragraph>
        <FocusButton {...props}>{buttonText}</FocusButton>
      </Container>
      <img src={img} alt={title} />
    </div>
  );
};
export default Item;
