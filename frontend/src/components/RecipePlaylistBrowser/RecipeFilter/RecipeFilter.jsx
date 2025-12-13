import SearchBar from '../../../ui/inputs/SearchInput.jsx';
import Input from '../../../ui/inputs/Input.jsx';
import SelectInput from '../../../ui/inputs/SelectInput.jsx';
import styled from 'styled-components';
import { FilterBar } from '../Shared/FilterBar.jsx';
import { Wrapper } from '../../../ui/texts/Wrapper.jsx';
import {
  DIFFICULTIES,
  RECIPE_SORT_BY,
  TIME,
} from '../../../shared/utils/selectInputsValues.js';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../../shared/hooks/useDebounce.js';
const defaultValues = {
  input: '',
  ingredients: '',
  difficulty: '',
  time: '',
  sortBy: 'popularity',
};
export const RecipeFilter = ({
  values = defaultValues,
  onChange = () => {},
}) => {
  // ----- Інпут пошуку-----
  const [localSearchValue, setLocalSearchValue] = useState(values.input || '');
  // Щоб не робити запити на кожній зміні значення, а лише як пройшло 500 мілісекунд з останньої зміни
  const debouncedSearch = useDebounce(localSearchValue, 500);
  useEffect(() => {
    if (debouncedSearch !== values.input) {
      onChange('input', debouncedSearch);
    }
    //Забиваєм на onChange щоб не порушити логіку
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);
  //Зміна інпута при зміні url
  useEffect(() => {
    setLocalSearchValue(values.input || '');
  }, [values.input]);

  // ----- Інпут інгредієнтів -----
  const ingredientRef = useRef();

  const handleIngredientEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = ingredientRef.current.value.trim();
      if (!value) return;

      // Логіка додавання тегу
      const currentTags = values.ingredients
        ? values.ingredients.split(',')
        : [];
      if (!currentTags.includes(value)) {
        onChange('ingredients', [...currentTags, value].join(','));
      }

      ingredientRef.current.value = '';
    }
  };
  // ----- Селект інпути -----
  const handleSelect = (key) => {
    return (event) => onChange(key, event.target.value);
  };
  return (
    <FilterBar>
      <RecipeElementFilterWrapper>
        <SearchBar
          value={localSearchValue}
          onChange={(e) => setLocalSearchValue(e.target.value)}
          placeholder="Пошук рецепту..."
        />
        <Input
          placeholder="Введіть інгредієнт"
          onKeyDown={handleIngredientEnter}
          ref={ingredientRef}
        />
        <SelectInput
          options={DIFFICULTIES}
          value={values.difficulty}
          onChange={handleSelect('difficulty')}
        />
        <SelectInput
          options={TIME}
          value={values.time}
          onChange={handleSelect('time')}
        />
      </RecipeElementFilterWrapper>
      <Wrapper>
        <SelectInput
          options={RECIPE_SORT_BY}
          value={values.sortBy}
          onChange={handleSelect('sortBy')}
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
