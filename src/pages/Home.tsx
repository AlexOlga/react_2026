import React from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import BuggyButton from '../components/buggyButton';
import getPokemonByName from '../utils/getPokemonByName';
import getPokemons from '../utils/getPokemons';
import { PAGE_LIMIT } from '../constants/global';
import { errorMessages } from '../shared/text';
import CardList from '../components/cardList';
import Loading from '../components/loading';
import ErrorAlert from '../components/errorAlert';
import type { Pokemon } from '../types/pokemon';
import { Pagination } from '../components/pagination';
import { useSearch } from '../context/useSearch';

const Home = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const { searchQuery } = useSearch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [totalPages, setTotalPages] = React.useState<number>(1);

  const fetchPokemonList = async () => {
    const data = await getPokemons(PAGE_LIMIT, currentPage);
    setPokemons(data.results);
    setTotalPages(Math.ceil(data.count / PAGE_LIMIT));
  };
  const fetchPokemonSearch = async (query: string) => {
    const data = await getPokemonByName(query);
    setPokemons(data);
    setTotalPages(1);
  };

  const fetchPokemonsByQuery = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage('');
      if (query.trim() === '') {
        fetchPokemonList();
      } else {
        fetchPokemonSearch(query);
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
    navigate(`/?page=${page}`);
  };

  React.useEffect(() => {
    const load = async () => await fetchPokemonsByQuery(searchQuery);
    load();
  }, [searchQuery, currentPage]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorAlert message={errorMessage} />;

  return (
    <>
      <div className="flex">
        <div>
          <CardList list={pokemons} />

          {totalPages > 1 && (
            <div className="flex justify-center p-4">
              <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>

        <div>
          <Outlet />
        </div>
      </div>

      <div className="flex justify-center p-4">
        <BuggyButton />
      </div>
    </>
  );
};

export default Home;
