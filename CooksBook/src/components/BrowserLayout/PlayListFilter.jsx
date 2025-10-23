import SearchBar from '../../ui/SearchInput.jsx';
import Input from '../../ui/Input.jsx';
import SortBy from './SortBy.jsx';
import styled from "styled-components";
import {FilterBar} from "./FilterBar.jsx";

export const PlayListFilter = () => {
  return (
    <FilterBar>
      <PlayListFilterWrapper>
        <SearchBar />
        <Input placeholder="Введіть тег" />
      </PlayListFilterWrapper>
      <SortBy />
    </FilterBar>
  );
};
const PlayListFilterWrapper = styled.div`
  width: 50%;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1.5fr 1fr;
`;