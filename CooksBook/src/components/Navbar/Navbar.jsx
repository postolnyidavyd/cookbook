import navbar from './Navbar.module.css';
import logoSvg from '../../assets/sitelogo.svg';
import { Wrapper } from '../../ui/Wrapper.jsx';
import { TextButton } from '../../ui/buttons/TextButton.jsx';
import { HollowButton } from '../../ui/buttons/HollowButton.jsx';
import useScrollDirection from '../../shared/hooks/useScrollDirection.js';
import styled, { css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { key: '', label: 'Головна' },
  { key: 'recipes', label: 'Рецепти' },
  { key: 'playlists', label: 'Плейлисти' },
  { key: 'profile', label: 'Кабінет' },
];

const Navbar = () => {
  const scrollDirection = useScrollDirection();
  let navbarClasses = `${navbar.navbar}`;
  if (scrollDirection === 'down') navbarClasses += ` ${navbar.hidden}`;

  return (
    <nav className={navbarClasses}>
      <LogoLink to="/">
        <img src={logoSvg} alt="лого" />
        <p>Щоденник кухаря</p>
      </LogoLink>
      <Wrapper>
        {NAV_ITEMS.map((item) => (
          <TextLink
            key={item.key}
            to={`/${item.key}`}
            className={({ isActive }) => (isActive ? 'active' : '')}
            end={item.key === ''}
          >
            {item.label}
          </TextLink>
        ))}
      </Wrapper>
      <Wrapper $gap="1.25">
        <HollowButton type="button">Зареєструватися</HollowButton>
        <HollowButton $isMain={true} type="button">
          Ввійти
        </HollowButton>
      </Wrapper>
    </nav>
  );
};
export const LogoLink = styled(Link)`
  width: auto;
  height: auto;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  gap: 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: color 160ms ease;
  &:hover {
    color: #1e1e1e;
  }
`;
export const TextLink = styled(NavLink)`
  border: none;
  background-color: transparent;
  font-size: inherit;
  color: #757575;
  cursor: pointer;
  text-decoration: none;
  transition: color 160ms ease;

  &:hover {
    color: #1e1e1e;
  }

  &.active {
    color: #1e1e1e;
  }
  &.active:hover {
    color: #000000;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      cursor: default;
    `}
`;
export default Navbar;
