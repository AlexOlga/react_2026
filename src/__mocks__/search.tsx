type SearchProps = {
  newSearch: (s: string) => void;
  searchQuery: string;
};
export default function SearchMock(props: SearchProps) {
  const { newSearch, searchQuery } = props;
  return (
    <input
      aria-label="search-input"
      defaultValue={searchQuery}
      onChange={(e) => newSearch(e.target.value)}
    />
  );
}
