import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../../../ui/ContentCard.jsx';
import { Field, Input, InputError } from '../../../ui/inputs/index.js';
import { ImageInput } from '../../../pages/NewRecipePage.jsx';
import { FocusButton } from '../../../ui/buttons/FocusButton.jsx';
import { ControlElementRow } from '../SharedModalComponents.js';
import { WideFocusButton } from '../../../ui/buttons/WideFocusButton.jsx';
import { useCreatePlaylistMutation } from '../../../store/api/playlistApi.js';

import arrowIcon from '../../../assets/arrowLeft.svg';
import closeIcon from '../../../assets/close.svg';
import hashIcon from "../../../assets/hash.svg"
const CreatePlaylistView = ({ onCreate, onClose }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});

  const [createPlaylist, { isLoading }] = useCreatePlaylistMutation();

  //Очищення пам'яті від прев'ю при розмонтуванні або зміні фото
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleAddTag = (newTag) => {
    const tag = newTag.trim();
    if (tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };


  const validateForm = () => {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Введіть ім'я";
    if (!values.description.trim()) newErrors.description = 'Введіть опис';
    if (!image) newErrors.image = 'Додайте зображення';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', values.name.trim());
    formData.append('description', values.description.trim());
    if (image) formData.append('image', image);

    if (tags.length > 0) {
      formData.append('tags', JSON.stringify(tags));
    }

    try {
      await createPlaylist(formData).unwrap();
      onCreate?.();
    } catch (error) {
      console.error(error);

      setErrors((prev) => ({
        ...prev,
        server: error?.data?.message ||error?.message || 'Не вдалося створити плейлист, спробуйте пізніше' ,
      }));
    }
  };

  return (
    <Card $padding="3.25rem 3.5rem" $width="34.5rem">
      <Heading onClick={onClose}>
        <img src={arrowIcon} alt="Назад" />
        <h3>Новий плейлист</h3>
      </Heading>

      <Field>
        <label>Назва</label>
        <Input
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <InputError>{errors.name}</InputError>}
      </Field>

      <Field>
        <Label>Опис</Label>
        <Textarea
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        {errors.description && <InputError>{errors.description}</InputError>}
      </Field>

      <Field>
        <LabelText>Фото</LabelText>
        <ImageInput
          size="8rem"
          img={imagePreview}
          onAdd={handleAddImage}
          onRemove={handleRemoveImage}
        />
        {errors.image && <InputError>{errors.image}</InputError>}
      </Field>

      <Tags tags={tags} onAdd={handleAddTag} onRemove={handleRemoveTag} />


      {errors.server && (
        <InputError style={{ textAlign: 'center' }}>{errors.server}</InputError>
      )}

      <ControlElementRow>
        <WideFocusButton
          $secondary
          $padding="1.25rem 0.625rem"
          onClick={onClose}
          disabled={isLoading}
        >
          Скасувати
        </WideFocusButton>
        <WideFocusButton
          $padding="1.25rem 0.625rem"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Створення...' : 'Створити'}
        </WideFocusButton>
      </ControlElementRow>
    </Card>
  );
};


const Tags = ({ tags, onAdd, onRemove }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  return (
    <Field>
      <TagsControl>
        <Field>
          <Label>Теги</Label>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="тег"
          />
        </Field>
        <AddButton type="button" onClick={handleAddClick}>
          Додати
        </AddButton>
      </TagsControl>

      {tags.length > 0 && (
        <TagList>
          {tags.map((tag) => (
            <TagButton key={tag} onClick={() => onRemove(tag)} type="button">
              <img src={hashIcon} alt="Видалити" />
              {tag}
            </TagButton>
          ))}
        </TagList>
      )}
    </Field>
  );
};


const TagButton = styled.button`
    display: inline-flex;
    padding: 0.25rem 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    border-radius: 1rem;
    border: 1px solid #000000;
    background-color: transparent;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: #d32f2f;
        color: #d32f2f;
    }

    & img {
        width: 1rem;
        height: 1rem;
        object-fit: contain;
    }
`;

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const AddButton = styled(FocusButton)`
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    align-self: flex-end;
    width: 100%;
    height: 3rem; /* Вирівнювання по висоті з Input */
`;

const TagsControl = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0.625rem;
`;

const LabelText = styled.span`
    font-size: 1rem;
    font-weight: 400;
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: 400;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 5rem;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    font-size: 1rem;
    background-color: #faf4e1;
    resize: none;
    font-family: inherit;
    &:focus {
        outline: 2px solid rgba(45, 74, 47, 0.4);
        background: #fffdf6;
    }
`;

const Heading = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 3.25rem;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;

    &:hover {
        opacity: 0.7;
    }

    & h3 {
        font-size: 36px;
        font-weight: 600;
        margin: 0;
    }
    & img {
        width: 2rem;
        height: 2rem;
    }
`;

export default CreatePlaylistView;