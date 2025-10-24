import navbar from './Navbar.module.css';
import logoSvg from '../../assets/logo.svg';
import { Wrapper } from '../../ui/Wrapper.jsx';
import { TextButton } from '../../ui/buttons/TextButton.jsx';
import { HollowButton } from '../../ui/buttons/HollowButton.jsx';
import useScrollDirection from '../../shared/hooks/useScrollDirection.js';

const NAV_ITEMS = [
  { key: 'home', label: 'Головна' },
  { key: 'recipes', label: 'Рецепти' },
  { key: 'playlists', label: 'Плейлисти' },
  { key: 'cabinet', label: 'Кабінет' },
];

const Navbar = ({ activeNav = 'home', onNavigate }) => {
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
        {NAV_ITEMS.map((item) => (
          <TextButton
            key={item.key}
            $isMain={activeNav === item.key}
            type="button"
            onClick={() => onNavigate?.(item.key)}
          >
            {item.label}
          </TextButton>
        ))}
      </Wrapper>
      <Wrapper $gap="1.25">
        <HollowButton type="button" onClick={() => onNavigate?.('register')}>
          Зареєструватися
        </HollowButton>
        <HollowButton $isMain={true} type="button">
          Ввійти
        </HollowButton>
      </Wrapper>
    </nav>
  );
};
export default Navbar;
