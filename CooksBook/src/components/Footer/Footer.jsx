import { Wrapper } from '../../ui/Wrapper.jsx';
import footerStyles from './Footer.module.css';
import { TextButton } from '../../ui/buttons/TextButton.jsx';
import logoSvg from '../../assets/sitelogo.svg';
import instagramIcon from '../../assets/instagram.svg';
import facebookIcon from '../../assets/facebook.svg';
import youtubeIcon from '../../assets/youtube.svg';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <Wrapper $gap="1.25">
        <img src={logoSvg} alt="Лого" />
        <p>Щоденник кухаря</p>
      </Wrapper>
      <Wrapper>
        <TextLink to="/">Головна</TextLink>
        <TextLink to="/recipes">Рецепти</TextLink>
        <TextLink to="/playlists">Плейлисти</TextLink>
        <TextLink to="/profile">Кабінет</TextLink>
      </Wrapper>
      <Wrapper $gap="0.5rem">
        <OutLink href="https://www.instagram.com/">
          <Icon src={instagramIcon} alt="Інстаграм" />
        </OutLink>
        <OutLink href="https://www.instagram.com/">
          <Icon src={facebookIcon} alt="Фейсбук" />
        </OutLink>
        <OutLink href="https://www.instagram.com/">
          <Icon src={youtubeIcon} alt="Ютуб" />
        </OutLink>
      </Wrapper>
      <Wrapper>
        <p>© Щоденник кухаря 2025</p>
      </Wrapper>
    </footer>
  );
};
const Icon = styled.img`
  width:1.5rem;
  height:1.5rem;
`
 const OutLink = styled.a`
  border: none;
  background-color: transparent;
  text-decoration: none;
  font-size: inherit;
  color: #1e1e1e;
  cursor: pointer;
  transition: color 160ms ease;

  &:hover {
    color: #000000;
  }
`;
const TextLink = styled(NavLink)`
  border: none;
  background-color: transparent;
  font-size: inherit;
  color: #1e1e1e;
  cursor: pointer;
  text-decoration: none;
  transition: color 160ms ease;

  &:hover {
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
export default Footer;
