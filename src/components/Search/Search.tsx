import * as React from 'react';
import { TEXTS } from '../../shared/text';
import { buttonStyles } from '../../shared/styles/button';
import { inputStyles } from '../../shared/styles/input';
import { useSearch } from '../../context/SearchContext/useSearch';
import { useNavigate } from 'react-router';

const Search = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [query, setQuery] = React.useState(searchQuery);
  const navigate = useNavigate();
  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = event.target?.value;
    setQuery(trimmed);
  };
  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed !== searchQuery) {
      setSearchQuery(trimmed);
    }
    navigate(`/?page=1`);
  };
  return (
    <div className="rounded-xl p-4  w-xl">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder={TEXTS.search.placeholder}
          className={inputStyles.search}
          onChange={changeQuery}
          value={query}
        />
        <button
          className={`${buttonStyles.base} ${buttonStyles.yellow}`}
          onClick={handleSearch}
        >
          {TEXTS.search.button}
        </button>
      </div>
    </div>
  );
};

export default Search;
