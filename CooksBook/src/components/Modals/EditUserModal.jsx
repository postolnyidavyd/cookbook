import Modal from './Modal.jsx';
import { Card } from '../../ui/ContentCard.jsx';
import { Heading } from './SharedModalComponents.js';
import { Field, Input, InputError } from '../../ui/inputs/index.js';
import { ImageInput } from '../../pages/NewRecipePage.jsx';
import { WideFocusButton } from '../../ui/buttons/WideFocusButton.jsx';
import styled from 'styled-components';
import {
  required,
  validate,
  validEmail,
} from '../../shared/utils/validation.js';
import { useActionState, useEffect, useState } from 'react';
import { generateUrl } from '../../shared/utils/generateUrl.js';
import { useUpdateMeMutation } from '../../store/api/authApi.js';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice.js';

const EditUserModal = ({ isOpen, onClose, user }) => {
  const [updateMe, {isLoading}] = useUpdateMeMutation();
  const dispatch = useDispatch();
  const { surname, name, email, avatar } = user || {};
  const initialAvatarUrl = generateUrl(avatar);

  const [imagePreview,setImagePreview] = useState(initialAvatarUrl);

  useEffect(() => {
    setImagePreview(initialAvatarUrl);
  }, [isOpen,initialAvatarUrl]);

  useEffect(() => {
    return ()=>{
      if(imagePreview && imagePreview.startsWith("blob:")){
        URL.revokeObjectURL(imagePreview);
      }
    }
  }, [imagePreview]);

  const submitAction = async ( prevState, formData ) => {
    const formValues = Object.fromEntries(formData.entries());
    const errors = validate(formValues, {
      email: [
        [required, 'Введіть електронну адресу'],
        [validEmail, 'Введіть коректну електронну адресу'],
      ],
      surname: [[required, 'Введіть прізвище']],
      name: [[required, "Введіть ім'я"]],
    });

    if (Object.keys(errors).length > 0) {
      return { values: formValues, errors };
    }

    try{
      formData.append('username', `${formValues.surname} ${formValues.name}`)
      const data = await updateMe(formData).unwrap();
      if(data){
        dispatch(setUser(data))
      }
      onClose();
    }catch (error){
      if (error.data?.message) {
        errors.server = error.data?.message;
      } else {
        errors.server = 'Невідома помилка спробуйте пізніше';
      }
      return { values: formValues, errors };
    }
    return { values: formValues, errors };
  };
  const [{ values, errors }, formAction] = useActionState(submitAction, {
    values: {
      email,
      name,
      surname,
    },
  });

  const handleAddImage = (event)=>{
    const file = event.target.files[0];
    if(file){
      setImagePreview(URL.createObjectURL(file));
    }
  }
  const handleRemoveImage = ()=>{
    setImagePreview(null);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <Card $padding="3.25rem 3.5rem" onMo>
        <Heading>Зміна даних користувача</Heading>
        <EditUserForm action={formAction}>
          <Field>
            <Label htmlFor="edit-name">Ім&#39;я</Label>
            <Input
              id="edit-name"
              name="name"
              type="text"
              autoComplete="given-name"
              defaultValue={values?.name || ''}
            />
            {errors?.name && <InputError>{errors.name}</InputError>}
          </Field>
          <Field>
            <Label htmlFor="edit-surname">Прізвище</Label>
            <Input
              id="edit-surname"
              name="surname"
              type="text"
              autoComplete="family-name"
              defaultValue={values?.surname || ''}
            />
            {errors?.surname && <InputError>{errors.surname}</InputError>}
          </Field>
          <Field>
            <Label htmlFor="edit-email">Пошта</Label>
            <Input
              id="edit-email"
              name="email"
              type="text"
              autoComplete="email"
              defaultValue={values?.email || ''}
            />
            {errors?.email && <InputError>{errors.email}</InputError>}
          </Field>
          <Field>
            <Label>Зображення</Label>
            <ImageInput size="8rem" id="edit-image" name="avatar" img={imagePreview} onAdd={handleAddImage} onRemove={handleRemoveImage}/>
          </Field>
          <Field>
            {errors?.server && <InputError>{errors.server}</InputError>}
            <WideFocusButton type="submit" disabled={isLoading}>{isLoading ? "Зберігаємо..." : "Зберегти"}</WideFocusButton>
          </Field>
        </EditUserForm>
      </Card>
    </Modal>
  );
};
const EditUserForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 400;
`;
export default EditUserModal;
