import styled from 'styled-components';
import { useState } from 'react';
import refresh from '../../assets/refresh.svg';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';
const Ingredients = ({ ingredients, defaultServings = 1 }) => {
  const [servings, setServings] = useState(defaultServings);

  const increase = () => setServings((prev) => prev + 1);
  const decrease = () => setServings((prev) => (prev > 1 ? prev - 1 : prev)); // не менше 1
  const reset = () => setServings(defaultServings);

  const servingsLabel = servings === 1 ? '1 порція' : `${servings} порцій`;

  return (
    <Section>
      <HeaderRow>
        <SectionTitle>Інгредієнти</SectionTitle>

        <ServingsControls>
          <CircleButton type="button" onClick={increase}>
            <Icon src={plus} alt="Додати порції" />
          </CircleButton>
          <ServingsBadge>{servingsLabel}</ServingsBadge>
          <CircleButton type="button" onClick={decrease}>
            <Icon src={minus} alt="Відняти порції" />
          </CircleButton>
          <CircleButton type="button" onClick={reset}>
            <Icon src={refresh} alt="Скинути порції" />
          </CircleButton>
        </ServingsControls>
      </HeaderRow>

      {ingredients.map((category) => (
        <IngredientGroup
          key={category.title}
          title={category.title}
          items={category.items}
          servings={servings}
        />
      ))}
    </Section>
  );
};
const IngredientGroup = ({ title, items, servings }) => {
  return (
    <GroupWrapper>
      <GroupTitle>{title}</GroupTitle>
      <List>
        {items.map((item, index) => (
          <IngredientItem key={index} label={item} />
        ))}
      </List>
    </GroupWrapper>
  );
};

const IngredientItem = ({ label }) => {
  const [checked, setChecked] = useState(false);

  return (
    <ItemRow>
      <Checkbox
        type="checkbox"
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
      />
      <IngredientText $checked={checked}>{label}</IngredientText>
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
`;

const GroupWrapper = styled.div`
  margin-top: 2.5rem;
`;

const GroupTitle = styled.h3`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
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
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
`;

const IngredientText = styled.span`
  font-size: 1rem;
  text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
  color: ${({ $checked }) => ($checked ? '#a0a0a0' : '#1e1e1e')};
`;
export default Ingredients;
