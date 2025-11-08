import styled from 'styled-components';
import Input from '../ui/Input.jsx';

const RegisterPage = () => {
  return (
    <Page>
      <Card>
        <Title>Реєстрація</Title>
        <Form>
          <Field>
            <Label>Електронна пошта</Label>
            <StyledInput type="email" placeholder="example@email.com" />
          </Field>
          <FieldGroup>
            <Field>
              <Label>Прізвище</Label>
              <StyledInput type="text" placeholder="Вкажіть прізвище" />
            </Field>
            <Field>
              <Label>Ім&apos;я</Label>
              <StyledInput type="text" placeholder="Вкажіть ім&apos;я" />
            </Field>
          </FieldGroup>
          <Field>
            <Label>Пароль</Label>
            <StyledInput type="password" placeholder="Вигадайте надійний пароль" />
          </Field>
          <SubmitButton type="button">Зареєструватися</SubmitButton>
          <HelperText>
            Маєте акаунт? <HelperLink type="button">Увійти</HelperLink>
          </HelperText>
        </Form>
      </Card>
    </Page>
  );
};

const Page = styled.main`
  min-height: calc(100vh - 10rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
`;

const Card = styled.section`
  width: min(32rem, 100%);
  background: #d4d9ca;
  border-radius: 1.75rem;
  padding: 3rem;
  box-shadow: 0 30px 80px rgba(30, 51, 31, 0.15);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  color: #1e331f;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e331f;
`;

const StyledInput = styled(Input)`
  background: #f4f0db;
  border: 1px solid rgba(30, 51, 31, 0.15);
  border-radius: 0.75rem;
  font-size: 1rem;
  &:focus {
    outline: 2px solid rgba(45, 74, 47, 0.4);
    background: #fffdf6;
  }
`;

const SubmitButton = styled.button`
  padding: 0.95rem 1.6rem;
  border-radius: 0.9rem;
  border: none;
  background: #2d4a2f;
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #1e331f;
  }
`;

const HelperText = styled.p`
  font-size: 0.95rem;
  color: #4e5d4f;
  text-align: center;
`;

const HelperLink = styled.button`
  background: none;
  border: none;
  color: #1e331f;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
`;

export default RegisterPage;
