import navbar from './Navbar.module.css';
import logoSvg from '../../assets/sitelogo.svg';
import { Wrapper } from '../../ui/texts/Wrapper.jsx';
import { TextButton } from '../../ui/buttons/TextButton.jsx';
import { HollowButton } from '../../ui/buttons/HollowButton.jsx';
import {
  AvatarImage,
  BigAvatarImage,
} from '../RecipePlaylistDetailComponents/SharedComponents/SharedComponents.jsx';
import useScrollDirection from '../../shared/hooks/useScrollDirection.js';

import styled, { css } from 'styled-components';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal } from '../../store/uiSlice.js';
import {
  selectAvatar,
  selectIsAuthenticated,
} from '../../store/selectors/authSelectors.js';
import { useLogoutUserMutation } from '../../store/api/authApi.js';
import { StyledLink } from '../../ui/StyledLink.jsx';

const NAV_ITEMS = [
  { key: '', label: 'Головна' },
  { key: 'recipes', label: 'Рецепти' },
  { key: 'playlists', label: 'Плейлисти' },
  { key: 'profile', label: 'Кабінет' },
];

const Navbar = () => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuthenticated);
  const avatar = useSelector(selectAvatar);
  const dispatch = useDispatch();
  const [logout, {isLoading}] = useLogoutUserMutation();
  const scrollDirection = useScrollDirection();

  const handleLogin = () => dispatch(toggleLoginModal());
  const handleLogout = () => logout();


  let navbarClasses = `${navbar.navbar}`;
  if (scrollDirection === 'down') navbarClasses += ` ${navbar.hidden}`;

  const redirectLocation = location.state?.from || location;
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
        <Wrapper $gap="1.25">
          <HollowButton
            type="button"
            $isMain={true}
            onClick={handleLogout}
            title="Вийти у вікно"
            disabled={isLoading}
          >
            Вийти
          </HollowButton>
          <LogoLink to="/profile">
            <BigAvatarImage src={avatar} alt="Аватар" />
          </LogoLink>
        </Wrapper>
      ) : (
        <Wrapper $gap="1.25">
          <HollowButton type="button">
            <TextLink
              to="/register"
              state={{ from: redirectLocation }}
            >
              Зареєструватися
            </TextLink>
          </HollowButton>
          <HollowButton $isMain={true} type="button" onClick={handleLogin}>
            Ввійти
          </HollowButton>
        </Wrapper>
      )}
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
  & img {
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
