import styled, { css } from 'styled-components';
import { PageContainer } from '../ui/Container.jsx';
import { Card } from '../ui/ContentCard.jsx';
import cameraIcon from '../assets/camera.svg';
import editIcon from '../assets/edit.svg';
import rubishIcon from '../assets/trash.svg';
import { Input, SelectInput } from '../ui/inputs/index.js';
import { Wrapper } from '../ui/Wrapper.jsx';
import { FocusButton } from '../ui/buttons/FocusButton.jsx';
import { useEffect, useState } from 'react';
import { TextButton } from '../ui/buttons/TextButton.jsx';
import { WideFocusButton } from '../ui/buttons/WideFocusButton.jsx';
import { DIFFICULTIES } from '../shared/utils/selectInputsValues.js';
import { useNavigate } from 'react-router-dom';
import { useCreateRecipeMutation } from '../store/api/recipesApi.js';

const CATEGORIES = [
  {
    id: 1,
    name: 'Для основної страви',
    items: [],
  },
  { id: 2, name: 'Для соусу', items: [] },
];
const STEPS = [
  { name: '', description: '' },
  { name: '', description: '' },
];

const NewRecipePage = () => {
  const navigate = useNavigate();
  const [createRecipe, {isLoading}] = useCreateRecipeMutation();
  // -------- Загальна інформація
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
  const [servings, setServings] = useState(1);

  // Обкладинка з превʼю
  const [coverFile, setCoverFile] = useState(null);
  console.log(coverFile);
  const [coverPreview, setCoverPreview] = useState('');
  useEffect(() => {
    if (!coverFile) return;
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  // -------- Категорії/інгредієнти
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState(CATEGORIES);

  const handleAddCategory = () => {
    const n = categoryName.trim();
    if (!n) return;
    setCategories((prev) => [...prev, { id: Date.now(), name: n, items: [] }]);
    setCategoryName('');
  };

  const handleRemoveCategory = (categoryId) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  const handleAddIngredient = (categoryId, item) => {
    if (!item?.name?.trim()) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              items: [
                ...(c.items ?? []),
                {
                  name: item.name.trim(),
                  amount: (item.amount ?? '').trim(),
                  unit: (item.unit.trim() ?? '').trim(),
                },
              ],
            }
          : c
      )
    );
  };

  const handleEditIngredient = (categoryId, idx, patch) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;
        const copy = [...(c.items ?? [])];
        copy[idx] = { ...copy[idx], ...patch };
        return { ...c, items: copy };
      })
    );
  };

  const handleDeleteIngredient = (categoryId, idx) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;
        const copy = [...(c.items ?? [])];
        copy.splice(idx, 1);
        return { ...c, items: copy };
      })
    );
  };

  // -------- Кроки приготування
  const [steps, setSteps] = useState(STEPS);
  const [stepPreviews, setStepPreviews] = useState({}); // {index: objectUrl}

  const addStep = () =>
    setSteps((prev) => [...prev, { name: '', description: '' }]);
  const removeStep = (index) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
    setStepPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };
  const updateStepName = (index, value) =>
    setSteps((prev) =>
      prev.map((s, i) => (i === index ? { ...s, name: value } : s))
    );
  const updateStepDesc = (index, value) =>
    setSteps((prev) =>
      prev.map((s, i) => (i === index ? { ...s, description: value } : s))
    );

  const changeStepImage = (index, file) => {
    if (!file) return;
    setStepPreviews((prev) => {
      if (prev[index]) URL.revokeObjectURL(prev[index]);
      return { ...prev, [index]: URL.createObjectURL(file) };
    });
  };

  useEffect(() => {
    return () => {
      Object.values(stepPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [stepPreviews]);

  return (
    <ProfilePage $padding="0 2rem" as="form">
      <Title>Додавання рецепту</Title>

      <Card $padding="1.25rem" $width="fit-content">
        <CardTitle>Загальна інформація</CardTitle>

        <GeneralInfoGrid>
          <ImageInput
            img={coverPreview}
            onAdd={(e) => {
              const f = e.target.files?.[0];
              if (f) setCoverFile(f);
            }}
          />
          <GeneralInfoInputs>
            <InputField
              id="recipe-name"
              type="text"
              label="Назва рецепту"
              width="100%"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <InputField
              id="recipe-description"
              type="textarea"
              label="Опис рецепту"
              width="100%"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <InputField
              id="cooking-time"
              type="text"
              label="Час приготування"
              width="60%"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            />
            <InputField
              input={SelectInput}
              id="recipe-difficulty"
              defaultOption="Оберіть складність"
              options={DIFFICULTIES}
              label="Складність приготування"
              width="60%"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </GeneralInfoInputs>
        </GeneralInfoGrid>
      </Card>

      <Card $padding="1.25rem">
        <FormWrapper $margin="0 0 1.25rem">
          <CardTitle $noMargin>Інгредієнти</CardTitle>
          <span>
            <Input
              type="number"
              id="portion-amount"
              placeholder="Кількість порцій"
              min={1}
              value={servings}
              onChange={(e) =>
                setServings(Math.max(1, Number(e.target.value) || 1))
              }
            />
          </span>
        </FormWrapper>

        <FormWrapper $alignItems="end" $margin="0 0 1.25rem">
          <InputField
            label="Назва категорії"
            id="category-name"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <FormFocusButton type="button" onClick={handleAddCategory}>
            Додати категорію
          </FormFocusButton>
        </FormWrapper>

        <CategoriesGrid>
          {categories.map((categorie) => (
            <IngredientCategory
              key={categorie.id}
              categ={categorie}
              onRemoveCategory={() => handleRemoveCategory(categorie.id)}
              onAddItem={(item) => handleAddIngredient(categorie.id, item)}
              onEditItem={(idx, patch) =>
                handleEditIngredient(categorie.id, idx, patch)
              }
              onDeleteItem={(idx) => handleDeleteIngredient(categorie.id, idx)}
            />
          ))}
        </CategoriesGrid>
      </Card>

      <Card $padding="1.25rem">
        <CardTitle>Кроки приготування</CardTitle>
        <Steps
          steps={steps}
          previews={stepPreviews}
          onAddStep={addStep}
          onRemoveStep={removeStep}
          onChangeName={updateStepName}
          onChangeDesc={updateStepDesc}
          onChangeImage={changeStepImage}
        />
      </Card>

      <CreateRecipeButton>Створити рецепт</CreateRecipeButton>
    </ProfilePage>
  );
};

const ProfilePage = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
`;



const Steps = ({
  steps,
  onAddStep,
  onRemoveStep,
  onChangeName,
  onChangeDesc,
  onChangeImage,
  previews = {},
}) => {
  return (
    <CardsLayout>
      {steps.map((step, index) => (
        <BorderCard key={index} $width="100%">
          <Header>
            <h5>{index + 1} крок</h5>
            <DeleteButton type="button" onClick={() => onRemoveStep(index)}>
              Видалити
            </DeleteButton>
          </Header>
          <StepFields>
            <StepInfo>
              <InputField
                id={`${index}-step-name`}
                label="Назва кроку"
                type="text"
                value={step.name}
                onChange={(e) => onChangeName(index, e.target.value)}
              />
              <FieldContainer $width="75%">
                <label htmlFor={`${index}-step-description`}>Опис кроку</label>
                <TextArea
                  id={`${index}-step-description`}
                  value={step.description}
                  onChange={(e) => onChangeDesc(index, e.target.value)}
                />
              </FieldContainer>
            </StepInfo>
            <ImageInput
              img={previews[index]}
              onAdd={(e) => {
                const f = e.target.files?.[0];
                if (f) onChangeImage(index, f);
              }}
            />
          </StepFields>
        </BorderCard>
      ))}
      <AddStepButton type="button" onClick={onAddStep}>
        Додати крок
      </AddStepButton>
    </CardsLayout>
  );
};

const AddStepButton = styled(WideFocusButton)`
  background: #faf4e1;
  color: black;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  &:hover {
    background: #fff0bf;
    color: #1e1e1e;
  }
`;

const CreateRecipeButton = styled(WideFocusButton)`
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: #faf4e1;
  &:focus {
    outline: 2px solid rgba(45, 74, 47, 0.4);
    background: #fffdf6;
  }
`;

const StepInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
`;

const StepFields = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;



const IngredientCategory = ({
  categ,
  onRemoveCategory,
  onAddItem,
  onEditItem,
  onDeleteItem,
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit , setUnit] = useState('');
  // інлайн редагування інгредієнтів
  const [editIdx, setEditIdx] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editUnit,setEditUnit] = useState('');
  const add = () => {
    if (!name.trim()) return;
    onAddItem({ name, amount, unit});
    setName('');
    setAmount('');
    setUnit('');
  };

  const startEdit = (idx, item) => {
    setEditIdx(idx);
    setEditName(item.name);
    setEditAmount(item.amount ?? '');
    setEditUnit(item.unit?? '');
  };

  const cancelEdit = () => {
    setEditIdx(null);
    setEditName('');
    setEditAmount('');
    setEditUnit('');
  };

  const saveEdit = () => {
    if (!editName.trim()) return;
    onEditItem(editIdx, { name: editName.trim(), amount: editAmount.trim(), unit: editUnit });
    cancelEdit();
  };

  const onEditKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <BorderCard>
      <Header>
        <h5>{categ.name}</h5>
        <DeleteButton type="button" onClick={onRemoveCategory}>
          Видалити
        </DeleteButton>
      </Header>

      <IngredientsInputsGrid>
        <InputField
          id={`${categ.id}-recipe-name`}
          label="Інгредієнт"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          id={`${categ.id}-recipe-amount`}
          label="Кількість"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <InputField
          id={`${categ.id}-recipe-unit`}
          label="Од. вим. (г/мл)"
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <FormFocusButton type="button" onClick={add}>
          Додати
        </FormFocusButton>
      </IngredientsInputsGrid>

      <IngredientsList>
        {categ.items?.map((item, idx) => (
          <li key={`${item.name}-${idx}`}>
            {editIdx === idx ? (
              <>
                <InlineEdit>
                  <Input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={onEditKey}
                    placeholder="Інгредієнт"
                  />
                  <Input
                    type="text"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    onKeyDown={onEditKey}
                    placeholder="Кількість"
                  />
                  <Input
                    type="text"
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    onKeyDown={onEditKey}
                    placeholder="Од."
                  />
                </InlineEdit>
                <Wrapper $gap="1">
                  <TextButton type="button" onClick={saveEdit}>
                    Зберегти
                  </TextButton>
                  <TextButton type="button" onClick={cancelEdit}>
                    Скасувати
                  </TextButton>
                </Wrapper>
              </>
            ) : (
              <>
                <p>
                  {item.amount ? `${item.amount} ` : ''}
                  {item.unit ? `${item.unit} `: '' }
                  {item.name}
                </p>
                <Wrapper $gap="1">
                  <button type="button" onClick={() => startEdit(idx, item)}>
                    <img src={editIcon} alt="Редагувати" />
                  </button>
                  <button type="button" onClick={() => onDeleteItem(idx)}>
                    <img src={rubishIcon} alt="Видалити" />
                  </button>
                </Wrapper>
              </>
            )}
          </li>
        ))}
      </IngredientsList>
    </BorderCard>
  );
};
const InlineEdit = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 0.8fr;
    gap: 0.5rem;
    width: 100%;
`;

const IngredientsList = styled.ul`
  width: 100%;
  & li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }
  & p {
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
  }
  & li button {
    border: none;
    background-color: transparent;
    text-decoration: none;
    cursor: pointer;
  }
  & li img {
    width: 1rem;
    height: 1rem;
  }
`;

const IngredientsInputsGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 0.8fr 1fr;
    gap: 0.75rem;
    align-items: end;
`;

const DeleteButton = styled.button`
  border: none;
  font-size: 1rem;
  background-color: transparent;
  text-decoration: none;
  color: #e13235;
  cursor: pointer;
  &:hover {
    color: #e15053;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  & h5 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
  }
`;

const BorderCard = styled(Card)`
  width: ${({ $width }) => $width || 'auto'};
  border: 1px solid #757575;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const FormWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: ${({ $alignItems }) => $alignItems || 'center'};
`;

const FormFocusButton = styled(FocusButton)`
  box-sizing: border-box;
  padding: 0.625rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: auto;
`;

const ImageInputContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const InputField = ({ width, label, id, input = Input, ...props }) => {
  const SelectedInput = input;
  return (
    <FieldContainer $width={width}>
      <label htmlFor={id}>{label}</label>
      <SelectedInput {...props} id={id} />
    </FieldContainer>
  );
};

const FieldContainer = styled.div`
  width: ${({ $width }) => $width || 'fit-content'};
  position: relative;
`;

const GeneralInfoInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.75rem;
`;

const GeneralInfoGrid = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ImageInput = ({ img, onAdd, onRemove, size }) => {
  const handleClick = (event) => {
    if (img && onRemove) {
      event.preventDefault();
      onRemove();
    }
  };
  return (
    <ImageCover onClick={handleClick} $size={size}>
      {img ? (
        <img src={img} alt="Прев'ю зображення" title="Натисніть щоб видалити" />
      ) : (
        <img src={cameraIcon} className="icon" alt="Додати рецепт" />
      )}
      <input type="file" accept="image/*" onChange={onAdd} />
    </ImageCover>
  );
};

const ImageCover = styled.label`
  display: grid;
  place-items: center;
  ${({ $size }) =>
    $size
      ? css`
          width: ${$size};
          height: ${$size};
        `
      : css`
          width: 11.25rem;
          height: 11.25rem;
        `}
  background: #faf4e1;
  cursor: pointer;
  overflow: hidden;
  border-radius: 1.25rem;
  transition: background-color 160ms ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  & img.icon {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    display: block;
  }
  input {
    display: none;
  }
  &:hover {
    background: #fffdf6;
  }
`;

const Icon = styled.img``;

const CardTitle = styled.h2`
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: ${({ $noMargin }) => ($noMargin ? '' : '1.25rem')};
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
`;

export default NewRecipePage;
