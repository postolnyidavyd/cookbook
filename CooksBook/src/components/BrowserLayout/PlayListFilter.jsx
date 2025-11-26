import SearchBar from '../../ui/inputs/SearchInput.jsx';
import Input from '../../ui/inputs/Input.jsx';
import SortBy from './SortBy.jsx';
import styled from 'styled-components';
import { FilterBar } from './FilterBar.jsx';
import SelectInput from '../../ui/inputs/SelectInput.jsx';
import { Wrapper } from '../../ui/Wrapper.jsx';
import { PLAYLIST_SORT_BY } from '../../shared/utils/selectInputsValues.js';

export const PlayListFilter = () => {
  return (
    <FilterBar>
      <PlayListFilterWrapper>
        <SearchBar />
        <Input placeholder="Введіть тег" />
      </PlayListFilterWrapper>

      <Wrapper>
        <SelectInput
          options={PLAYLIST_SORT_BY}
        />
      </Wrapper>
    </FilterBar>
  );
};
const PlayListFilterWrapper = styled.div`
  width: 50%;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1.5fr 1fr;
`;
