import { Card } from '../../ui/styledBlocks/ContentCard.jsx';
import { BorderCard } from '../../ui/styledBlocks/BorderCard.jsx';
import { Header } from './Shared/Header.jsx';
import { DeleteButton } from '../../ui/buttons/DeleteButton.jsx';
import { InputField } from './Shared/InputField.jsx';
import { FieldContainer } from './Shared/FieldContainer.jsx';
import { ImageInput, Input } from '../../ui/inputs/index.js';
import styled from 'styled-components';
import { WideFocusButton } from '../../ui/buttons/WideFocusButton.jsx';
import { TextArea } from '../../ui/inputs/TextArea.jsx';
import { CardTitle } from './Shared/CardTitle.jsx';

const Steps = ({
  steps,
  previews,
  onAdd,
  onRemove,
  onChangeName,
  onChangeDesc,
  onChangeImage,
}) => {
  return (
    <Card $padding="1.25rem">
      <CardTitle>Кроки приготування</CardTitle>
      <CardsLayout>
        {steps.map((step, index) => (
          <BorderCard key={index} $width="100%">
            <Header>
              <h5>{index + 1} крок</h5>
              <DeleteButton type="button" onClick={() => onRemove(index)}>
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
                  <label htmlFor={`${index}-step-description`}>
                    Опис кроку
                  </label>
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
        <AddStepButton type="button" onClick={onAdd}>
          Додати крок
        </AddStepButton>
      </CardsLayout>
    </Card>
  );
};

const CardsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const StepFields = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  justify-content: space-between;
  align-items: flex-start;
`;

const StepInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
`;
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
export default Steps;
