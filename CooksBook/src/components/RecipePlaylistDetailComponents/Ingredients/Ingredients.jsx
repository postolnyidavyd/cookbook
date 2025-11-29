import styled from 'styled-components';
import { useState } from 'react';
import refresh from '../../../assets/refresh.svg';
import plus from '../../../assets/plus.svg';
import minus from '../../../assets/minus.svg';

const Ingredients = ({ ingredients = [], defaultServings = 1 }) => {
  // Гарантуємо, що це число
  const parsedDefaultServings = Number(defaultServings) || 1;
  const [servings, setServings] = useState(parsedDefaultServings);

  const increase = () => setServings((prev) => prev + 1);
  const decrease = () => setServings((prev) => (prev > 1 ? prev - 1 : prev));
  const reset = () => setServings(parsedDefaultServings);

  const servingsLabel = servings === 1 ? '1 порція' : `${servings} порцій`;

  return (
    <Section>
      <HeaderRow>
        <SectionTitle>Інгредієнти</SectionTitle>

        <ServingsControls>
          <CircleButton type="button" onClick={decrease}>
            <Icon src={minus} alt="Відняти порції" />
          </CircleButton>

          <ServingsBadge>{servingsLabel}</ServingsBadge>

          <CircleButton type="button" onClick={increase}>
            <Icon src={plus} alt="Додати порції" />
          </CircleButton>

          <CircleButton
            type="button"
            onClick={reset}
            title="Скинути до стандартного"
          >
            <Icon src={refresh} alt="Скинути порції" />
          </CircleButton>
        </ServingsControls>
      </HeaderRow>

      {ingredients.map((category, index) => (
        <IngredientGroup
          key={category.title || index}
          title={category.title}
          items={category.items}
          currentServings={servings}
          defaultServings={parsedDefaultServings}
        />
      ))}
    </Section>
  );
};

const IngredientGroup = ({
  title,
  items,
  currentServings,
  defaultServings,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <GroupWrapper>
      {title && <GroupTitle>{title}</GroupTitle>}
      <List>
        {items.map((item, index) => (
          <IngredientItem
            key={index}
            item={item}
            currentServings={currentServings}
            defaultServings={defaultServings}
          />
        ))}
      </List>
    </GroupWrapper>
  );
};

const amountToEdited = new Map([
  [0.125, '1/8'],
  [0.14, '1/7'],
  [0.16, '1/6'],
  [0.17, '1/6'],
  [0.2, '1/5'],
  [0.25, '1/4'],
  [0.33, '1/3'],
  [0.5, '1/2'],
  [0.67, '2/3'],
  [0.75, '3/4'],
]);
const formatAmount = (amount) => {
  if (amountToEdited.has(amount)) {
    return amountToEdited.get(amount);
  }
  return amount;
};

const IngredientItem = ({ item, currentServings, defaultServings }) => {
  const [checked, setChecked] = useState(false);

  const calculateAmount = () => {
    if (!item.amount) return null;

    const baseAmount = Number(item.amount);
    // знаходим скільки на 1 порцію та множим на к-сть
    const newAmount = (baseAmount / defaultServings) * currentServings;

    return parseFloat(newAmount.toFixed(2));
  };

  const amountDisplay = formatAmount(calculateAmount());
  return (
    <ItemRow>
      <Checkbox
        type="checkbox"
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
      />
      <IngredientText $checked={checked}>
        {amountDisplay && (
          <>
            <BoldAmount>
              {amountDisplay} {item.unit}{' '}
            </BoldAmount>
          </>
        )}
        {item.name}
      </IngredientText>
    </ItemRow>
  );
};

const Section = styled.section`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const ServingsControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CircleButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 0.625rem;
  border: none;
  background-color: #c6cfb5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  &:hover {
    background-color: #a7b098;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const ServingsBadge = styled.span`
  padding: 0.4rem 0.9rem;
  border-radius: 0.75rem;
  background-color: #c6cfb5;
  font-weight: 600;
  min-width: 80px;
  text-align: center;
`;

const GroupWrapper = styled.div`
  margin-top: 2.5rem;
`;

const GroupTitle = styled.h3`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ItemRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #2d4a2f;
  cursor: pointer;
`;

const IngredientText = styled.span`
  font-size: 1.125rem;
  text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
  color: ${({ $checked }) => ($checked ? '#a0a0a0' : '#1e1e1e')};
  transition:
    color 0.2s ease,
    text-decoration 0.2s ease;
`;
const BoldAmount = styled.span`
  font-weight: 700;
  margin-left: 0.5rem;
`;
export default Ingredients;
