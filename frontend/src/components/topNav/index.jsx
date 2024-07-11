import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const AppBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--black);
  color: var(--white);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 0.5rem;
  font-size: 1rem;
  width: 200px;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FilterButton = styled.button`
  background-color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TopNavBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <AppBar>
      <SearchContainer>
        <SearchIcon style={{ color: 'var(--black)' }} />
        <SearchInput
          type="text"
          placeholder="Search…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      <FiltersContainer>
        <FilterButton>
          <FilterListIcon style={{ color: 'var(--black)' }} />
          Filter 1
        </FilterButton>
        <FilterButton>
          <FilterListIcon style={{ color: 'var(--black)' }} />
          Filter 2
        </FilterButton>
      </FiltersContainer>
    </AppBar>
  );
};

export default TopNavBar;
