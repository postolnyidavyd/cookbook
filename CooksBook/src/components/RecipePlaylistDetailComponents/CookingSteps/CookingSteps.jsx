import {
  Section,
  SectionTitle,
} from '../SharedComponents/SharedComponents.jsx';
import styled from 'styled-components';

const CookingSteps = ({ steps }) => {
  return (
    <Section>
      <SectionTitle>Приготування</SectionTitle>

      <StepsList>
        {steps.map((step, index) => {
          const { title, text, image } = step;
          return (
            <StepItem key={step}>
              <StepContent>
                <GroupTitle>
                  {index + 1}.{title}
                </GroupTitle>

                {text && <StepText>{text}</StepText>}

                {image && (
                  <StepImageWrapper>
                    <StepImage src={image} alt={title} />
                  </StepImageWrapper>
                )}
              </StepContent>
            </StepItem>
          );
        })}
      </StepsList>
    </Section>
  );
};
const GroupTitle = styled.h3`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StepHeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
`;

const StepText = styled.p`
  font-size: 1.25rem;
`;

const StepImageWrapper = styled.div`
  margin-top: 1.25rem;
  overflow: hidden;
  padding: 0 10rem;
`;

const StepImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1.25rem;
  object-fit: cover;
`;
const StepsList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  list-style: none;
  counter-reset: step-counter;
  margin-top: 1.5rem;
`;

const StepItem = styled.li`
  display: flex;
  gap: 1rem;
  font-size: 1.05rem;
  line-height: 1.7;
`;
export default CookingSteps;
