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
import { Pagination } from '../components/pagination';

const Home = () => {
  const initialSearchQuery = loadFromLocalStorage(LOCAL_QUERY) || '';

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  const fetchPokemonsByQuery = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage('');
      if (query.trim() === '') {
        const data = await getPokemons(PAGE_LIMIT, currentPage);
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.count / PAGE_LIMIT));
      } else {
        const data = await getPokemonByName(query);
        setPokemons(data);
        setTotalPages(1);
      }
    } catch (error: unknown) {
      setIsError(true);
      setErrorMessage(
        error instanceof Error ? error.message : errorMessages.other
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = async (page: number) => {
    console.log(page);
    setCurrentPage(page);
  };

  React.useEffect(() => {
    const load = async () => await fetchPokemonsByQuery(searchQuery);
    load();
  }, [searchQuery, currentPage]);

  const newSearch = (newQuery: string) => {
    saveFromLocalStorage(LOCAL_QUERY, newQuery);
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  return (
    <section>
      <Search newSearch={newSearch} searchQuery={searchQuery} />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorAlert message={errorMessage} />
      ) : (
        <>
          <CardList list={pokemons} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={onPageChange}
              totalPages={totalPages}
            />
          )}
        </>
      )}

      <div className="flex justify-start p-4">
        <BuggyButton />
      </div>
    </section>
  );
};

export default Home;
