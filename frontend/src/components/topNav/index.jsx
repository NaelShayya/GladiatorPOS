import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AppBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--black);
  color: var(--white);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: -32px;
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

const FilterButton = styled.div`
  position: relative;
`;

const FilterDropdown = styled.button`
  background-color: var(--black);
  color: var(--white);
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
    background-color: #333;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--black);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0.5rem 0;
  list-style: none;
  z-index: 1000;
  display: ${(props) => (props.open ? 'block' : 'none')};
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--white);

  &:hover {
    background-color: #333;
  }
`;

const TopNavBar = ({ searchQuery, setSearchQuery }) => {
  const [filter1Open, setFilter1Open] = useState(false);
  const [filter2Open, setFilter2Open] = useState(false);

  const toggleFilter1 = () => setFilter1Open(!filter1Open);
  const toggleFilter2 = () => setFilter2Open(!filter2Open);

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
          <FilterDropdown onClick={toggleFilter1}>
            <FilterListIcon style={{ color: 'var(--white)' }} />
            Filter 1
            <ArrowDropDownIcon style={{ color: 'var(--white)' }} />
          </FilterDropdown>
          <DropdownMenu open={filter1Open}>
            <DropdownItem onClick={() => setFilter1Open(false)}>Category 1</DropdownItem>
            <DropdownItem onClick={() => setFilter1Open(false)}>Category 2</DropdownItem>
            <DropdownItem onClick={() => setFilter1Open(false)}>Category 3</DropdownItem>
          </DropdownMenu>
        </FilterButton>
      </FiltersContainer>
    </AppBar>
  );
};

export default TopNavBar;
