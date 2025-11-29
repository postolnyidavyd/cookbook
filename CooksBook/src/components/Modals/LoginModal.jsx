import Modal from './Modal.jsx';
import { Card } from '../../ui/ContentCard.jsx';
import {
  Input,
  PasswordInput,
  InputError,
  Field,
} from '../../ui/inputs/index.js';
import { WideFocusButton } from '../../ui/buttons/WideFocusButton.jsx';
import { StyledLink } from '../../ui/StyledLink.jsx';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModal } from '../../store/uiSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  validate,
  required,
  validEmail,
  minLengthHelper,
} from '../../shared/utils/validation.js';
import { useActionState } from 'react';
import { useLoginMutation } from '../../store/api/authApi.js';
import { Heading, Paragraph } from './SharedModalComponents.js';

const LoginModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const showLoginModal = useSelector((state) => state.ui.showLoginModal);
  const dispatch = useDispatch();

  const redirectLocation = location.state?.from || location;

  const submitAction = async (prevState, formData) => {
    const formValues = Object.fromEntries(formData.entries());
    const errors = validate(formValues, {
      email: [
        [required, 'Введіть електронну адресу'],
        [validEmail, 'Введіть коректну електронну адресу'],
      ],
      password: [
        [required, 'Введіть пароль'],
        [minLengthHelper(6), 'Довжина пароля має бути хоча би 6 символів'],
      ],
    });

    if (Object.keys(errors).length > 0) {
      return { values: formValues, errors };
    }
    try {
      await login(formValues).unwrap();

      dispatch(setLoginModal(false));

      if (location.state?.from) {
        navigate(location.state?.from);
      }
      return { values: {}, errors: null };
    } catch (err) {
      if (err.data?.message) {
        errors.server = err.data?.message;
      } else {
        errors.server = 'Невідома помилка спробуйте пізніше';
      }
      return { values: formValues, errors };
    }
  };
  const [{ values, errors }, formAction, isPending] = useActionState(
    submitAction,
    {
      values: {},
      errors: null,
    }
  );
  const handleClose = () => {
    dispatch(setLoginModal(false));
  };

  return (
    <Modal isOpen={showLoginModal} onClose={handleClose}>
      <Card $padding="3.25rem 3.5rem">
        <Heading>Ласкаво просимо назад!</Heading>
        <LoginForm action={formAction}>
          <Field>
            <Input
              id="login-email"
              type="email"
              placeholder="Електронна пошта"
              name="email"
              defaultValue={values.email || ''}
              autoComplete="email"
            />
            {errors?.email && <InputError>{errors.email}</InputError>}
          </Field>
          <Field>
            <PasswordInput
              id="login-password"
              name="password"
              placeholder="Пароль"
              defaultValue={values.password || ''}
              autoComplete="current-password"
            />
            {errors?.password && <InputError>{errors.password}</InputError>}
          </Field>
          {errors?.server && (
            <Field>
              <InputError>{errors?.server}</InputError>
            </Field>
          )}
          <WideFocusButton type="submit" disabled={isPending}>
            {isPending ? 'Входимо...' : 'Увійти'}
          </WideFocusButton>
        </LoginForm>
        <Paragraph>
          Ще немає акаунту?
          <StyledLink
            to="/register"
            state={{ from: redirectLocation }}
            onClick={() => dispatch(setLoginModal(false))}
          >
            Зареєструватися
          </StyledLink>
        </Paragraph>
      </Card>
    </Modal>
  );
};
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
`;
export default LoginModal;
