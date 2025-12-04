import styled from 'styled-components';
import { useCreateRecipeForm } from '../shared/hooks/useCreateRecipeForm.js';

import Steps from '../components/NewRecipePageComponents/Steps.jsx';
import IngredientCategories from '../components/NewRecipePageComponents/IngredientCategories/IngredientCategories.jsx';
import GeneralInfo from '../components/NewRecipePageComponents/GeneralInfo.jsx';
import { PageContainer } from '../ui/styledBlocks/Container.jsx';
import { WideFocusButton } from '../ui/buttons/WideFocusButton.jsx';

const NewRecipePage = () => {
  const { formData, setFormData, handlers, isCreating, handleSubmit } =
    useCreateRecipeForm();

  return (
    <ProfilePage $padding="0 2rem" as="form" onSubmit={handleSubmit}>
      <Title>Додавання рецепту</Title>

      <GeneralInfo
        name={formData.recipeName}
        description={formData.description}
        time={formData.cookingTime}
        difficulty={formData.difficulty}
        coverPreview={formData.coverPreview}
        onChange={setFormData.handleChange}
        onImageAdd={setFormData.handleCoverAdd}
        onImageRemove={setFormData.handleCoverRemove}
      />

      <IngredientCategories
        servings={formData.servings}
        onServingsChange={setFormData.handleServingsChange}
        categoryName={formData.categoryName}
        onCategoryNameChange={setFormData.handleCategoryNameChange}
        categories={formData.categories}
        onAddCategory={handlers.handleAddCategory}
        handleRemoveCategory={handlers.handleRemoveCategory}
        handleAddIngredient={handlers.handleAddIngredient}
        handleEditIngredient={handlers.handleEditIngredient}
        handleDeleteIngredient={handlers.handleDeleteIngredient}
      />

      <Steps
        steps={formData.steps}
        previews={formData.stepPreviews}
        onAdd={handlers.addStep}
        onRemove={handlers.removeStep}
        onChangeName={handlers.updateStepName}
        onChangeDesc={handlers.updateStepDesc}
        onChangeImage={handlers.changeStepImage}
      />

      <CreateRecipeButton type="submit" disabled={isCreating}>
        {isCreating ? 'Створення...' : 'Створити рецепт'}
      </CreateRecipeButton>
    </ProfilePage>
  );
};
const ProfilePage = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
`;

const CreateRecipeButton = styled(WideFocusButton)`
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
`;

export default NewRecipePage;
