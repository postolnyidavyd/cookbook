import navbar from './Navbar.module.css';
import logoSvg from '../../assets/sitelogo.svg';
import { Wrapper } from '../../ui/Wrapper.jsx';
import { TextButton } from '../../ui/buttons/TextButton.jsx';
import { HollowButton } from '../../ui/buttons/HollowButton.jsx';
import useScrollDirection from '../../shared/hooks/useScrollDirection.js';
import styled, { css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal } from '../../store/uiSlice.js';
import { logout } from '../../store/authSlice.js';
import { AvatarImage, BigAvatarImage } from '../RecipePlaylistDetailComponents/SharedComponents/SharedComponents.jsx';

const NAV_ITEMS = [
  { key: '', label: 'Головна' },
  { key: 'recipes', label: 'Рецепти' },
  { key: 'playlists', label: 'Плейлисти' },
  { key: 'profile', label: 'Кабінет' },
];

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const avatar = useSelector(state=> state.auth.user.avatar);
  const dispatch = useDispatch();
  const scrollDirection = useScrollDirection();

  let navbarClasses = `${navbar.navbar}`;
  if (scrollDirection === 'down') navbarClasses += ` ${navbar.hidden}`;

  const handleLogin = () => dispatch(toggleLoginModal());
  const handleLogout = ()=> dispatch(logout());
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
      {isAuth ? (
        <Wrapper $gap='1.25'>
          <HollowButton type="button" $isMain={true} onClick={handleLogout} title="Вийти у вікно">
            Вийти
          </HollowButton>
          <LogoLink to="/profile"><BigAvatarImage src={avatar} alt="Аватар"/></LogoLink>

        </Wrapper>
      ) : (
        <Wrapper $gap="1.25">
          <HollowButton type="button">Зареєструватися</HollowButton>
          <HollowButton $isMain={true} type="button" onClick={handleLogin}>
            Ввійти
          </HollowButton>
        </Wrapper>
      )}
      {/*<Wrapper $gap="1.25">*/}
      {/*  <HollowButton type="button">Зареєструватися</HollowButton>*/}
      {/*  <HollowButton $isMain={true} type="button" onClick={handleLogin}>*/}
      {/*    Ввійти*/}
      {/*  </HollowButton>*/}
      {/*</Wrapper>*/}
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
  & img{
    width: 3rem;
    height: 3rem;
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
