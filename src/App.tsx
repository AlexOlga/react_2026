import React from 'react';
import BuggyButton from './components/buggyButton';
import Search from './components/search';
import getPokemonByName from './utils/getPokemonByName';
import getPokemons from './utils/getPokemons';
import type { Pokemon } from './types/pokemon';
import loadFromLocalStorage from './utils/loadFromLocalStorage';
import { LOCAL_QUERY, PAGE_LIMIT } from './constant/global';
import saveFromLocalStorage from './utils/saveFromLocalStorage';
import Card from './components/cardPokemon';

type stateApp = {
  searchQuery: string;
  pokemons: Pokemon[];
};

class App extends React.Component<unknown, stateApp> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchQuery: loadFromLocalStorage(LOCAL_QUERY) || '',
      pokemons: [],
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

    this.setState({ pokemons });
  }
  async newSearch(newQuery: string) {
    saveFromLocalStorage(LOCAL_QUERY, newQuery);
    this.setState({ searchQuery: newQuery });
    await this.fetchPokemonsByQuery(newQuery);
  }
  render() {
    console.log(this.state);
    return (
      <>
        <section id="center">
          <div>
            <Search
              newSearch={this.newSearch}
              searchQuery={this.state.searchQuery}
            />
            {this.state.pokemons.length !== 0 && this.state.pokemons[0].id ? (
              <Card {...this.state.pokemons[0]} />
            ) : (
              'non'
            )}
            <BuggyButton />
          </div>
        </section>
      </>
    );
  }
}

export default App;
