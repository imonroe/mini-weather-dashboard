import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  
  &:focus-within {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;
  font-size: 16px;
  background: transparent;
  outline: none;
  
  &::placeholder {
    color: #888;
  }
`;

const Button = styled.button`
  padding: 15px 25px;
  background: #4a90e2;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #3a7bc8;
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const SearchBar = ({ onSearch, disabled }) => {
  const [location, setLocation] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };
  
  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter city name or US zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled || !location.trim()}>
          Search
        </Button>
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar;