import React from 'react';
import BuggyButton from './components/buggyButton';
import Search from './components/search';
import getPokemonByName from './utils/getPokemonByName';
import getPokemons from './utils/getPokemons';
import type { Pokemon } from './types/pokemon';
import loadFromLocalStorage from './utils/loadFromLocalStorage';
import { LOCAL_QUERY, PAGE_LIMIT } from './constant/global';
import saveFromLocalStorage from './utils/saveFromLocalStorage';
import CardList from './components/cardList';
import Loading from './components/loading';

type stateApp = {
  searchQuery: string;
  pokemons: Pokemon[];
  isLoad: boolean;
};

class App extends React.Component<unknown, stateApp> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchQuery: loadFromLocalStorage(LOCAL_QUERY) || '',
      pokemons: [],
      isLoad: false,
    };
    this.newSearch = this.newSearch.bind(this);
    this.fetchPokemonsByQuery = this.fetchPokemonsByQuery.bind(this);
  }
  async componentDidMount() {
    await this.fetchPokemonsByQuery(this.state.searchQuery);
  }
  async fetchPokemonsByQuery(query: string) {
    const pokemons =
      query === ''
        ? await getPokemons(PAGE_LIMIT)
        : await getPokemonByName(query);

    this.setState({ pokemons, isLoad: true });
  }
  async newSearch(newQuery: string) {
    this.setState({ isLoad: false });
    saveFromLocalStorage(LOCAL_QUERY, newQuery);
    this.setState({ searchQuery: newQuery });
    await this.fetchPokemonsByQuery(newQuery);
    this.setState({ isLoad: true });
  }
  render() {
    return (
      <>
        <section>
          <Search
            newSearch={this.newSearch}
            searchQuery={this.state.searchQuery}
          />
          {this.state.isLoad ? (
            <CardList list={this.state.pokemons} />
          ) : (
            <Loading />
          )}
          <div className="flex justify-start p-4">
            <BuggyButton />
          </div>
        </section>
      </>
    );
  }
}

export default App;
