import styled from 'styled-components';
import searchIcon from '../assets/search.svg';
const SearchBar = () => {
  return (
    <SearchWrapper>
      <SearchInput placeholder="Пошук" />
      <SearchIcon><img src={searchIcon} alt="Пошук"/></SearchIcon>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  position: relative;
    width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 100rem;
  font-size: 1rem;
    background-color: #FAF4E1;
`;

const SearchIcon = styled.button`
    background-color: transparent;
    border: none;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
`;
export default SearchBar;
