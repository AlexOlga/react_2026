import * as React from 'react';
import { TEXTS } from '../shared/text';
import { buttonStyles } from '../shared/styles/button';
import { inputStyles } from '../shared/styles/input';
import { LOCAL_QUERY } from '../constant/global';
import loadFromLocalStorage from '../utils/loadFromLocalStorage';
import saveFromLocalStorage from '../utils/saveFromLocalStorage';

type SearchState = {
  query: string;
};

class Search extends React.Component<unknown, SearchState> {
  constructor(props: unknown) {
    super(props);
    this.state = { query: loadFromLocalStorage(LOCAL_QUERY) };
    this.handleSearch = this.handleSearch.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
  }
  changeQuery(event: React.ChangeEvent<HTMLInputElement>) {
    const trimmed = event.target?.value.trim();
    this.setState({ query: trimmed });
  }
  handleSearch() {
    const trimmed = this.state.query.trim();
    saveFromLocalStorage(LOCAL_QUERY, trimmed);
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
