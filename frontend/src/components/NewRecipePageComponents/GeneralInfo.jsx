import { Card } from '../../ui/styledBlocks/ContentCard.jsx';
import { CardTitle } from './Shared/CardTitle.jsx';
import { ImageInput, SelectInput } from '../../ui/inputs/index.js';
import { InputField } from './Shared/InputField.jsx';
import { FieldContainer } from './Shared/FieldContainer.jsx';
import { TextArea } from './Shared/TextArea.jsx';
import { DIFFICULTIES } from '../../shared/utils/selectInputsValues.js';
import styled from 'styled-components';
import NewRecipePage from '../../pages/NewRecipePage.jsx';

const GeneralInfo = ({
  name,
  description,
  time,
  difficulty,
  coverPreview,
  onChange,
  onImageAdd,
  onImageRemove,
}) => {
  return (
    <Card $padding="1.25rem" $width="fit-content">
      <CardTitle>Загальна інформація</CardTitle>

      <GeneralInfoGrid>
        <ImageInput
          img={coverPreview}
          onAdd={onImageAdd}
          onRemove={onImageRemove}
        />
        <GeneralInfoInputs>
          <InputField
            id="recipe-name"
            label="Назва рецепту"
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            width="100%"
          />
          <FieldContainer $width="100%">
            <label htmlFor="recipe-desc">Опис рецепту</label>
            <TextArea
              id="recipe-desc"
              value={description}
              onChange={(e) => onChange('description', e.target.value)}
              style={{ height: '6rem' }}
            />
          </FieldContainer>
          <InputField
            id="cooking-time"
            label="Час приготування"
            value={time}
            onChange={(e) => onChange('time', e.target.value)}
            width="60%"
          />
          <InputField
            input={SelectInput}
            id="recipe-difficulty"
            defaultOption="Оберіть складність"
            options={DIFFICULTIES}
            label="Складність приготування"
            value={difficulty}
            onChange={(e) => onChange('difficulty', e.target.value)}
            width="60%"
          />
        </GeneralInfoInputs>
      </GeneralInfoGrid>
    </Card>
  );
};

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

export default GeneralInfo;