import { useState } from "react";

interface Props {

    placeholder: string;

    onQuery?: (query: string) => void;
}



export const SearchBar = ({placeholder='Buscar', onQuery }:Props) => {

  const [query, setQuery] = useState('');

  const handleSearch = () => {
        onQuery?.(query);
        setQuery('');
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if(event.key === 'Enter'){
        handleSearch();
      }
    }

  return (
     <div className="search-container">
      <input 
      type="text" 
      placeholder={placeholder} 
      value={query}
      onChange ={(event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
      }}
      onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>

  )
}
