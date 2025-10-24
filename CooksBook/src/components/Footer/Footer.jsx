import { Wrapper } from '../../ui/Wrapper.jsx';
import footerStyles from './Footer.module.css';
import { TextButton } from '../../ui/buttons/TextButton.jsx';
import logoSvg from '../../assets/logo.svg';
import instagramIcon from '../../assets/Instagram.svg';
import facebookIcon from '../../assets/Facebook.svg';
import youtubeIcon from '../../assets/YouTube.svg';
const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <Wrapper $gap="1.25">
        <img src={logoSvg} alt="Лого" />
        <p>Щоденник кухаря</p>
      </Wrapper>
      <Wrapper>
        <TextButton $isMain={true}>Головна</TextButton>
        <TextButton $isMain={true}>Рецепти</TextButton>
        <TextButton $isMain={true}>Плейлисти</TextButton>
        <TextButton $isMain={true}>Кабінет</TextButton>
      </Wrapper>
      <Wrapper>
        <TextButton>
          <a href="https://www.instagram.com/">
            <img src={instagramIcon} alt="Інстаграм" />
          </a>
        </TextButton>
        <TextButton>
          <a href="https://www.instagram.com/">
            <img src={facebookIcon} alt="Фейсбук" />
          </a>
        </TextButton>
        <TextButton>
          <a href="https://www.instagram.com/">
            <img src={youtubeIcon} alt="Ютуб" />
          </a>
        </TextButton>
      </Wrapper>
      <Wrapper>
        <p>© Щоденник кухаря 2025</p>
      </Wrapper>
    </footer>
  );
};
export default Footer;
