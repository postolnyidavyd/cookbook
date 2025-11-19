import SearchBar from '../../ui/SearchInput.jsx';
import Input from '../../ui/Input.jsx';
import SelectInput from '../../ui/SelectInput.jsx';
import SortBy from './SortBy.jsx';
import styled from 'styled-components';
import { FilterBar } from './FilterBar.jsx';
import { Wrapper } from '../../ui/Wrapper.jsx';

export const RecipeFilter = () => {
  return (
    <FilterBar>
      <RecipeElementFilterWrapper>
        <SearchBar />
        <Input placeholder="Введіть інгредієнт" />
        <SelectInput
          options={['Легко', 'Помірно', 'Складно']}
          defaultOption="Складність"
        />
        <SelectInput
          defaultOption="Час приготування"
          options={['До 30 хвилин', 'До 1 години', 'Година і більше']}
        />
      </RecipeElementFilterWrapper>
      <Wrapper>
        <SelectInput
          defaultOption="За популярністю"
          options={['За рейтингом', 'За кількістю відгуків']}
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
