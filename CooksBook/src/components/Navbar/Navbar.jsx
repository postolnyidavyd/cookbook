import navbar from './Navbar.module.css';
import logoSvg from '../../assets/logo.svg';
import { Wrapper } from '../../ui/Wrapper.jsx';
import { TextButton } from '../../ui/buttons/TextButton.jsx';
import { HollowButton } from '../../ui/buttons/HollowButton.jsx';
import useScrollDirection from '../../shared/hooks/useScrollDirection.js';

const Navbar = () => {
  const scrollDirection = useScrollDirection();
  let navbarClasses = `${navbar.navbar}`;
  if (scrollDirection === 'down') navbarClasses += ` ${navbar.hidden}`;

  return (
    <nav className={navbarClasses}>
      <Wrapper $gap="1.25">
        <img src={logoSvg} alt="лого" />
        <p>Щоденник кухаря</p>
      </Wrapper>
      <Wrapper>
        <TextButton $isMain={true}>Головна</TextButton>
        <TextButton>Рецепти</TextButton>
        <TextButton>Плейлисти</TextButton>
        <TextButton>Кабінет</TextButton>
      </Wrapper>
      <Wrapper $gap="1.25">
        <HollowButton>Зареєструватися</HollowButton>
        <HollowButton $isMain={true}>Ввійти</HollowButton>
      </Wrapper>
    </nav>
  );
};
export default Navbar;
