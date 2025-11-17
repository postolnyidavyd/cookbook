import styled from 'styled-components';

const SelectInput = ({ options, defaultOption, ...props }) => {
  return (
    <Select {...props}>
      <option value="">{defaultOption}</option>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
const Select = styled.select`
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem 0.75rem 1rem;
  font-size: 1rem;
  background-color: #faf4e1;
  & option {
    color: #111;
    background: #faf4e1;
    font-size: 1rem;
  }
  & option:hover {
    background-color: #b2bba2;
  }
  & option:checked {
    background: #faf4e1;
    color: #757575;
  }
`;
export default SelectInput;
