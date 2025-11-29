import SearchBar from '../../ui/inputs/SearchInput.jsx';
import Input from '../../ui/inputs/Input.jsx';
import SortBy from './SortBy.jsx';
import styled from 'styled-components';
import { FilterBar } from './FilterBar.jsx';
import SelectInput from '../../ui/inputs/SelectInput.jsx';
import { Wrapper } from '../../ui/Wrapper.jsx';
import { PLAYLIST_SORT_BY } from '../../shared/utils/selectInputsValues.js';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../shared/hooks/useDebounce.js';

export const PlayListFilter = ({ values, onChange }) => {
  const [localSearchValue, setLocalSearchValue] = useState(values.input || '');

  const debouncedSearch = useDebounce(localSearchValue, 500);

  useEffect(() => {
    if (debouncedSearch !== values.search) {
      onChange('input', debouncedSearch);
    }
    //Забиваєм на onChange щоб не порушити логіку
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);
  useEffect(() => {
    setLocalSearchValue(values.input || '');
  }, [values.input]);

  const tagsRef = useRef();

  const handeTagsEnterDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = tagsRef.current.value.trim();
      if (!value) return;

      // Логіка додавання тегу
      const currentTags = values.tags ? values.tags.split(',') : [];
      if (!currentTags.includes(value)) {
        onChange('tags', [...currentTags, value].join(','));
      }

      tagsRef.current.value = '';
    }
  };

  const handleSelect = (key) => {
    return (event) => onChange(key, event.target.value);
  };
  return (
    <FilterBar>
      <PlayListFilterWrapper>
        <SearchBar
          value={localSearchValue}
          onChange={(e) => setLocalSearchValue(e.target.value)}
          placeholder="Пошук плейлисту..."
        />
        <Input
          placeholder="Введіть тег"
          onKeyDown={handeTagsEnterDown}
          ref={tagsRef}
        />
      </PlayListFilterWrapper>

      <Wrapper>
        <SelectInput options={PLAYLIST_SORT_BY} value={values.sortBy} onChange={handleSelect('sortBy')}/>
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
