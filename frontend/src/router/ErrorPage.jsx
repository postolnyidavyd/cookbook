import { useRouteError } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar.jsx';
import { Display } from '../ui/texts/Display.jsx';
import { Paragraph } from '../ui/texts/Paragraph.jsx';

const ErrorPage = () => {
  const error = useRouteError();

  let title = 'Сталася помилка!';
  let message = 'Щось пішло не так';

  if (error.status === 404) {
    title = 'Не знайдено сторінку!';
    message = 'Не вдалося знайти ресурс або сторінку.';
  } else if (error.status === 500) {
    title = 'Помилка сервера!';
    message = JSON.parse(error.data).message;
  }
  return (
    <>
      <Navbar />
      <ErrorContainer>
        <Display>{title}</Display>
        <ErrorParagraph>{message}</ErrorParagraph>
      </ErrorContainer>
    </>
  );
};

const ErrorContainer = styled.div`
  text-align: center;
  margin-top: 5rem;
`;
const ErrorParagraph = styled(Paragraph)`
  margin-top: 2rem;
`;

export default ErrorPage;
