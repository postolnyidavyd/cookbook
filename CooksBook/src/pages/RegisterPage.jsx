import { useActionState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// import { register } from '../store/authSlice.js';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  validate,
  required,
  validEmail,
  minLengthHelper,
} from '../shared/utils/validation.js';

import { Card } from '../ui/ContentCard.jsx';
import { WideFocusButton } from '../ui/buttons/WideFocusButton.jsx';
import { Input, PasswordInput, InputError, Field } from '../ui/inputs/index.js';

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitAction = (prevState, formData) => {
    const formValues = Object.fromEntries(formData.entries());

    const errors = validate(formValues, {
      email: [
        [required, 'Введіть електронну адресу'],
        [validEmail, 'Введіть коректну електронну адресу'],
      ],
      surname: [[required, 'Введіть прізвище']],
      name: [[required, "Введіть ім'я"]],
      password: [
        [required, 'Введіть пароль'],
        [minLengthHelper(6), 'Довжина пароля має бути хоча би 6 символів'],
      ],
    });

    if (Object.keys(errors).length > 0) {
      return { values: formValues, errors };
    }
    const { email, surname, name, password } = formValues;
    // dispatch(register({ userName: `${surname} ${name}`, email }));
    navigate(location.state?.from || '/');
  };

  const [{ values, errors }, formAction] = useActionState(submitAction, {
    values: {},
    errors: null,
  });

  return (
    <Page>
      <RegisterCard $width="32rem">
        <Title>Реєстрація</Title>
        <Form method="post" action={formAction}>
          <Field>
            <Label htmlFor="register-email">Електронна пошта</Label>
            <Input
              id="register-email"
              type="email"
              name="email"
              defaultValue={values.email || ''}
              autoComplete="email"
            />
            {errors?.email && <InputError>{errors.email}</InputError>}
          </Field>
          <FieldGroup>
            <Field>
              <Label htmlFor="register-surname">Прізвище</Label>
              <Input
                id="register-surname"
                type="text"
                name="surname"
                defaultValue={values.surname || ''}
                autoComplete="family-name"
              />
              {errors?.surname && <InputError>{errors.surname}</InputError>}
            </Field>
            <Field>
              <Label htmlFor="register-name">Ім&apos;я</Label>
              <Input
                id="register-name"
                type="text"
                name="name"
                defaultValue={values.name || ''}
                autoComplete="given-name"
              />
              {errors?.name && <InputError>{errors.name}</InputError>}
            </Field>
          </FieldGroup>
          <Field>
            <Label htmlFor="register-password">Пароль</Label>
            <PasswordInput
              id="register-password"
              name="password"
              defaultValue={values.password || ''}
              autoComplete="new-password"
            />
            {errors?.password && <InputError>{errors.password}</InputError>}
          </Field>
          <WideFocusButton type="submit">Зареєструватися</WideFocusButton>
          <HelperText>
            Маєте акаунт? <HelperLink type="button">Увійти</HelperLink>
          </HelperText>
        </Form>
      </RegisterCard>
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

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e331f;
`;
const RegisterCard = styled(Card)`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
