import { Input } from '../../../ui/inputs/index.js';
import { FieldContainer } from './FieldContainer.jsx';

export const InputField = ({ width, label, id, input = Input, ...props }) => {
  const SelectedInput = input;
  return (
    <FieldContainer $width={width}>
      <label htmlFor={id}>{label}</label>
      <SelectedInput {...props} id={id} />
    </FieldContainer>
  );
};
