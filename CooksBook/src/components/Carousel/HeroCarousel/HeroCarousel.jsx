import styles from './Carousel.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import CarouselItem from './CarouselItem/CarouselItem.jsx';
import { Container } from '../../../ui/styledBlocks/Container.jsx';
import { NavButton } from '../../../ui/buttons/NavButton.jsx';
import leftArrow from '../../../assets/arrowLeft.svg';
import rightArrow from '../../../assets/arrowRight.svg';
import carousel1 from '../../../assets/carousel1.png';
import carousel2 from '../../../assets/carousel2.png';
import carousel3 from '../../../assets/carousel3.png';
import Dots from './Dots/Dots.jsx';
const defaultSlides = [
  {
    title: 'Відкрийте світ смачних рецептів',
    buttonText: 'Переглянути рецепти',
    navigateTo: "/recipes",
    img: carousel1,
    content:
      'Щоденне натхнення для вашої кухні: від простих страв до кулінарних шедеврів. Знаходьте улюблені рецепти та діліться своїми відгуками легко!',
  },
  {
    title: 'Переглядайте плейлісти',
    buttonText: 'Переглянути плейлисти',
    navigateTo: "/playlists",
    img: carousel2,
    content:
      'Відкривайте колекції рецептів від спільности: святкові меню, дієтичні плани чи щоденні ідеї. Натхення від кухарів для вашої творчості!',
  },
  {
    title: 'Є що показати на кухні?',
    buttonText: 'Створити рецепт',
    navigateTo: "/profile/new-recipe",
    img: carousel3,
    content:
      'Ваші рецепти заслуговують на увагу! Діліться улюбленими стравами, знаходьте однодумців та збирайте колекцію відгуків. Від простого сніданку до святкового обіду — всі страви важливі!',
  },
];
const HeroCarousel = ({ slides = defaultSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselContainer = useRef(null);

  const slidesCount = slides.length;
  const maxIndex = slidesCount - 1;
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? maxIndex : prevIndex - 1
    );
  }, [maxIndex]);

  useEffect(() => {
    const timer = setTimeout(handleNext, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, handleNext]);

  return (
    <Container $margin="0 0 3.75rem 0">
      <Container>
        <div className={styles.carouselContainer}>
          <div
            className={styles.carousel}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            ref={carouselContainer}
          >
            {slides.map((slide, index) => (
              <CarouselItem
                key={index}
                title={slide.title}
                buttonText={slide.buttonText}
                img={slide.img}
                navigateTo={slide.navigateTo}
              >
                {slide.content}
              </CarouselItem>
            ))}
          </div>
        </div>
        <NavButton $top={'50%'} $left={'1rem'} onClick={handlePrev}>
          <img src={leftArrow} alt="Ліва стрілка" />
        </NavButton>
        <NavButton $top={'50%'} $right={'1rem'} onClick={handleNext}>
          <img src={rightArrow} alt="Права стрілка" />
        </NavButton>
      </Container>
      <Dots
        count={slidesCount}
        current={currentIndex}
        onSelect={setCurrentIndex}
      />
    </Container>
  );
};

export default HeroCarousel;
