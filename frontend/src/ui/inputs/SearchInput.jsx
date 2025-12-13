import styled from 'styled-components';
import searchIcon from '../../assets/search.svg';
const SearchBar = ({squared, ...props}) => {
  return (
    <SearchWrapper>
      <SearchInput placeholder="Пошук" {...props} $squared={squared}/>
      <SearchIcon>
        <img src={searchIcon} alt="Пошук" />
      </SearchIcon>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1.25rem 0.75rem 1rem;
  border: none;
  
  border-radius:${({$squared})=> $squared ? "0.5rem":"100rem"} ;
  font-size: 1rem;
  background-color: #faf4e1;
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
