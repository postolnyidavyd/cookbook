import {
  Section,
  SectionTitle,
} from '../SharedComponents/SharedComponents.jsx';
import { FocusButton } from '../../../ui/buttons/FocusButton.jsx';

const ReviewForm = () => {
  return (
    <Section>
      <SectionTitle>Залиште відгук</SectionTitle>
      <ReviewFormLayout>
        <Rating rating={0} />
        <Description>Що вам сподобалося?</Description>
        <ReviewTextArea />
        <FocusButton>Надіслати відгук</FocusButton>
      </ReviewFormLayout>
    </Section>
  );
};