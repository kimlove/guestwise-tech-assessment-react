import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  search,
  onSearchChange,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const clearSearch = () => {
    onSearchChange("");
  };

  return (
    <InputGroup className="mb-1">
      <FormControl
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
      />
      {search && (
        <Button variant="outline-secondary" onClick={clearSearch}>
          ×
        </Button>
      )}
    </InputGroup>
  );
};

export default SearchBar;
