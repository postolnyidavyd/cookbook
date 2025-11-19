import SearchBar from '../../ui/inputs/SearchInput.jsx';
import Input from '../../ui/inputs/Input.jsx';
import SelectInput from '../../ui/inputs/SelectInput.jsx';
import SortBy from './SortBy.jsx';
import styled from 'styled-components';
import { FilterBar } from './FilterBar.jsx';
import { Wrapper } from '../../ui/Wrapper.jsx';
import { DIFFICULTIES, RECIPE_SORT_BY, TIME } from '../../shared/utils/selectInputsValues.js';

export const RecipeFilter = () => {
  return (
    <FilterBar>
      <RecipeElementFilterWrapper>
        <SearchBar />
        <Input placeholder="Введіть інгредієнт" />
        <SelectInput
          options={DIFFICULTIES}
        />
        <SelectInput
          options={TIME}
        />
      </RecipeElementFilterWrapper>
      <Wrapper>
        <SelectInput
          options={RECIPE_SORT_BY}
        />
      </Wrapper>
    </FilterBar>
  );
};
const RecipeElementFilterWrapper = styled.div`
  flex: 1;
  display: grid;
  gap: 0.75rem;
  grid-template-columns:
    2.4fr
    1.7fr
    1.3fr
    1.4fr;
`;
