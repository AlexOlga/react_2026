import * as React from 'react';
import { TEXTS } from '../shared/text';
import { buttonStyles } from '../shared/styles/button';
import { inputStyles } from '../shared/styles/input';

type SearchProps = {
  newSearch: (s: string) => void;
  searchQuery: string;
};
const Search = ({ searchQuery, newSearch }: SearchProps) => {
  const [query, setQuery] = React.useState(searchQuery);

  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = event.target?.value;
    setQuery(trimmed);
  };
  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed !== searchQuery) {
      newSearch(trimmed);
    }
  };
  return (
    <div className="mb-6 rounded-xl p-4 shadow-inner">
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
