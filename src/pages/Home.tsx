import React from 'react';
import BuggyButton from '../components/buggyButton';
import Search from '../components/search';
import getPokemonByName from '../utils/getPokemonByName';
import getPokemons from '../utils/getPokemons';
import loadFromLocalStorage from '../utils/loadFromLocalStorage';
import { LOCAL_QUERY, PAGE_LIMIT } from '../constant/global';
import { errorMessages } from '../shared/text';
import saveFromLocalStorage from '../utils/saveFromLocalStorage';
import CardList from '../components/cardList';
import Loading from '../components/loading';
import ErrorAlert from '../components/errorAlert';
import type { Pokemon } from '../types/pokemon';

const Home = () => {
  const initialSearchQuery = React.useMemo(
    () => loadFromLocalStorage(LOCAL_QUERY) || '',
    []
  );

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const fetchPokemonsByQuery = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage('');

      const data =
        query.trim() === ''
          ? await getPokemons(PAGE_LIMIT)
          : await getPokemonByName(query);

      setPokemons(data);
    } catch (error: unknown) {
      setIsError(true);
      setErrorMessage(
        error instanceof Error ? error.message : errorMessages.other
      );
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const load = async () => await fetchPokemonsByQuery(searchQuery);
    load();
  }, [searchQuery]);

  const newSearch = (newQuery: string) => {
    saveFromLocalStorage(LOCAL_QUERY, newQuery);
    setSearchQuery(newQuery);
  };

  return (
    <section>
      <Search newSearch={newSearch} searchQuery={searchQuery} />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorAlert message={errorMessage} />
      ) : (
        <CardList list={pokemons} />
      )}

      <div className="flex justify-start p-4">
        <BuggyButton />
      </div>
    </section>
  );
};

export default Home;
