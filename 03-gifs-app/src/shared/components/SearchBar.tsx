import { useEffect, useState } from "react";

interface Props {
  placeholder: string;

  onQuery?: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar", onQuery }: Props) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (query.trim().length === 0) return;
      onQuery?.(query);
    }, 700);

    return () => clearTimeout(timeoutID);
  }, [query, onQuery]);

  const handleSearch = () => {
    onQuery?.(query);
    setQuery("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => {
          const newQuery = event.target.value;
          setQuery(newQuery);
        }}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
