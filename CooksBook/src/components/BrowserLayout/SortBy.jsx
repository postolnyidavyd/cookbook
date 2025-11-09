// SortBy.jsx
import React from 'react';
import styled from 'styled-components';

export default function SortBy({ value = 'popular', onChange = () => {} }) {
  return (
    <Group role="radiogroup" aria-label="Сортування">
      <Item>
        <Radio
          id="sort-popular"
          type="radio"
          name="sortby"
          value="popular"
          checked={value === 'popular'}
          onChange={(e) => onChange(e.target.value)}
        />
        <Label htmlFor="sort-popular" data-active={value === 'popular'}>
          <Tick aria-hidden>✓</Tick> Популярні
        </Label>
      </Item>

      <Item>
        <Radio
          id="sort-rating"
          type="radio"
          name="sortby"
          value="rating"
          checked={value === 'rating'}
          onChange={(e) => onChange(e.target.value)}
        />
        <Label htmlFor="sort-rating" data-active={value === 'rating'}>
          Рейтинг
        </Label>
      </Item>
    </Group>
  );
}

/* ===== styles ===== */

const Group = styled.div`
  display: flex;
  gap: 8px;
`;

const Item = styled.div`
  position: relative;
`;

const Radio = styled.input`
  /* візуально ховаємо, але зберігаємо доступність */
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const Label = styled.label`
  cursor: pointer;
  user-select: none;
  height: 36px;
  padding: 0 14px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  /* неактивна «кремова» пілюля */
  background: #f1efd9;
  color: #111;

  /* активна — чорна з білим текстом */
  &[data-active='true'] {
    background: #0b0b0b;
    color: #fff;
    border-color: #0b0b0b;
  }

  /* focus-видимість при навігації з клавіатури */
  ${Radio}:focus-visible + & {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;

const Tick = styled.span`
  display: inline-block;
  width: 14px;
  text-align: center;
  line-height: 1;
  opacity: 0.9;
`;
