import styled from 'styled-components';
import { SkeletonCard } from '../Cards/SkeletonCard.jsx';

const DataRenderer = ({
  isLoading,
  isFetching,
  isError,
  error,
  data = [],
  renderItemFn,
  skeletonCount,
}) => {
  if (isError) {
    return (
      <State>
        <h2>Сталася помилка</h2>
        <p>{error?.data?.message || 'Не вдалося завантажити дані'}</p>
      </State>
    );
  }
  if (isLoading || isFetching) {
    return Array.from({ length: skeletonCount }).map((_item, index) => (
      <SkeletonCard key={index} />
    ));
  }
  if (!data || data.length === 0) {
    return (
      <State>
        <h2>За вашим запитом нічого не знайдено</h2>
        <p>Спробуйте змінити фільтри</p>
      </State>
    );
  }
  return data.map((item) => renderItemFn(item));
};
const State = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: #757575;

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #1e1e1e;
  }
`;
export default DataRenderer;

