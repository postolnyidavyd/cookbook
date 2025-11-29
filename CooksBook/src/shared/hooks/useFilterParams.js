import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

export const useFilterParams = (defaultParams = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  //useMemo для запобігання лишніх рендерів
  const queryParams = useMemo(() => {
    const params = { ...defaultParams };

    // Перебираємо всі параметри з URL і перезаписуємо дефолтні
    for (const [key, value] of searchParams.entries()) {
      if (value) params[key] = value;
    }
    return params;
  }, [searchParams, defaultParams]);

  const handleParamChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams, {
      preventScrollReset: true,
      replace: true,
    });
  };

  //Для отримання масиву з рядка (для тегів\інгредієнтів)
  const getListParam = (key) => {
    return searchParams.has(key) ? searchParams.get(key).split(',') : [];
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams.get("page")]);

  return {
    queryParams,       // об'єкт query функії
    searchParams,      // Сирий об'єкт (для навігації зі збереженням пошукових параметрів)
    handleParamChange, // Функція для onChange
    getListParam,      // Функція для тегів
  };
};