import { IngredientCategory } from './IngredientCategory.jsx';
import { CardTitle } from '../Shared/CardTitle.jsx';
import { Input } from '../../../ui/inputs/index.js';
import { InputField } from '../Shared/InputField.jsx';
import { FormFocusButton } from '../Shared/FormFocusButton.jsx';
import { Card } from '../../../ui/styledBlocks/ContentCard.jsx';
import styled from 'styled-components';
import { Wrapper } from '../../../ui/texts/Wrapper.jsx';
import { FieldContainer } from '../Shared/FieldContainer.jsx';

const IngredientCategories = ({
  servings,
  onServingsChange,
  categoryName,
  onCategoryNameChange,
  onAddCategory,
  categories,
  handleRemoveCategory,
  handleAddIngredient,
  handleEditIngredient,
  handleDeleteIngredient,
}) => {
  return (
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
            onChange={onServingsChange}
          />
        </span>
      </FormWrapper>

      <FormWrapper $alignItems="end" $margin="0 0 1.25rem">
        <FieldContainer>
          <label htmlFor="category-name">Назва категорії</label>
          <Input
            id="category-name"
            value={categoryName}
            onChange={onCategoryNameChange}
          />
        </FieldContainer>
        <FormFocusButton type="button" onClick={onAddCategory}>
          Додати категорію
        </FormFocusButton>
      </FormWrapper>

      <CategoriesGrid>
        {categories.map((category) => (
          <IngredientCategory
            key={category.id}
            categ={category}
            onRemoveCategory={() => handleRemoveCategory(category.id)}
            onAddItem={(item) => handleAddIngredient(category.id, item)}
            onEditItem={(idx, patch) =>
              handleEditIngredient(category.id, idx, patch)
            }
            onDeleteItem={(idx) => handleDeleteIngredient(category.id, idx)}
          />
        ))}
      </CategoriesGrid>
    </Card>
  );
};
const FormWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: ${({ $alignItems }) => $alignItems || 'center'};
`;
const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;
export default IngredientCategories;
