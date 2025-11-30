import { Wrapper } from '../texts/Wrapper.jsx';
import Input from './Input.jsx';
import { useState } from 'react';
import styled from 'styled-components';
import openedEye from '../../assets/eye.svg';
import closedEye from '../../assets/eyeClosed.svg';
const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword((prevShow) => !prevShow);
  return (
    <InputWrapper >
      <Input type={showPassword ? 'text' : 'password'} {...props} />
      <ShowButton type="button">
        <IconImage
          onClick={handleClick}
          src={showPassword ? openedEye : closedEye}
          alt="Показати пароль"
        />
      </ShowButton>
    </InputWrapper>
  );
};
const InputWrapper = styled(Wrapper)`
  width: 100%;
  position: relative;
`;
const ShowButton = styled.button`
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0.25rem;
`;
const IconImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
export default PasswordInput;
