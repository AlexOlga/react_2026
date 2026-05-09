import * as React from 'react';
import { TEXTS } from '../shared/text';
import { buttonStyles } from '../shared/styles/button';
import { inputStyles } from '../shared/styles/input';

type SearchState = {
  query: string;
};
type SearchProps = {
  newSearch: (s: string) => void;
  searchQuery: string;
};
class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { query: props.searchQuery };
    this.handleSearch = this.handleSearch.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
  }
  changeQuery(event: React.ChangeEvent<HTMLInputElement>) {
    const trimmed = event.target?.value.trim();
    this.setState({ query: trimmed });
  }
  handleSearch() {
    const trimmed = this.state.query.trim();
    if (trimmed !== this.props.searchQuery) {
      this.props.newSearch(trimmed);
    }
  }
  render() {
    return (
      <div className="mb-6 rounded-xl p-4 shadow-inner">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder={TEXTS.search.placeholder}
            className={inputStyles.search}
            onChange={this.changeQuery}
            value={this.state.query}
          />
          <button
            className={`${buttonStyles.base} ${buttonStyles.yellow}`}
            onClick={this.handleSearch}
          >
            {TEXTS.search.button}
          </button>
        </div>
      </div>
    );
  }
}
export default Search;
