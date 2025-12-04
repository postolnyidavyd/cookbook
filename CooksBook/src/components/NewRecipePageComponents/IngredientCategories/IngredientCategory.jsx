import { useState } from 'react';
import styled from 'styled-components';

import editIcon from '../../../assets/edit.svg';
import rubishIcon from '../../../assets/trash.svg';

import { DeleteButton } from '../../../ui/buttons/DeleteButton.jsx';
import { Input } from '../../../ui/inputs/index.js';
import { Wrapper } from '../../../ui/texts/Wrapper.jsx';
import { TextButton } from '../../../ui/buttons/TextButton.jsx';
import { BorderCard } from '../../../ui/styledBlocks/BorderCard.jsx';
import { Header } from '../Shared/Header.jsx';
import { FormFocusButton } from '../Shared/FormFocusButton.jsx';
import { InputField } from '../Shared/InputField.jsx';


export const IngredientCategory = ({
  categ,
  onRemoveCategory,
  onAddItem,
  onEditItem,
  onDeleteItem,
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');

  // інлайн редагування інгредієнтів
  const [editIdx, setEditIdx] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const add = () => {
    if (!name.trim()) return;
    onAddItem({ name, amount, unit });
    setName('');
    setAmount('');
    setUnit('');
  };

  const startEdit = (idx, item) => {
    setEditIdx(idx);
    setEditName(item.name);
    setEditAmount(item.amount ?? '');
    setEditUnit(item.unit ?? '');
  };

  const cancelEdit = () => {
    setEditIdx(null);
    setEditName('');
    setEditAmount('');
    setEditUnit('');
  };

  const saveEdit = () => {
    if (!editName.trim()) return;
    onEditItem(editIdx, {
      name: editName.trim(),
      amount: editAmount.trim(),
      unit: editUnit,
    });
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
                  {item.unit ? `${item.unit} ` : ''}
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

const IngredientsInputsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr 1fr;
  gap: 0.75rem;
  align-items: end;
`;

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