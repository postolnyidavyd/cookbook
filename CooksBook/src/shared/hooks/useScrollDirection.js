import { useState, useEffect, useRef } from 'react';

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up');
  const lastScrollY = useRef(0);
  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const lastScrollYValue = lastScrollY.current;
      const direction = currentScrollY > lastScrollYValue ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        Math.abs(currentScrollY - lastScrollYValue) > 15
      ) {
        setScrollDirection(direction);
      }
      lastScrollY.current = Math.max(currentScrollY, 0);
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
}
