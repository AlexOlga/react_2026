import { useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import BuggyButton from '../../components/BuggyButton/BuggyButton';
import { PAGE_LIMIT } from '../../constants/global';
import CardList from '../../components/CardList';
import Loading from '../../components/Loading';
import ErrorAlert from '../../components/ErrorAlert';
import Pagination from '../../components/Pagination';
import { useSearch } from '../../context/SearchContext/useSearch';
import Flyout from '../../components/Flyout';
import { usePokemons } from '../../hooks/usePokemons';
import { useSearchPokemons } from '../../hooks/useSearchPokemon';
import RefreshButton from '../../components/RefreshButton';

const Home = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const pokemonsList = usePokemons(currentPage);
  const pokemonSearchQuery = useSearchPokemons(searchQuery);
  const pokemons =
    (searchQuery === ''
      ? pokemonsList.data?.results
      : pokemonSearchQuery.data) || [];
  const totalPages =
    searchQuery === '' && pokemonsList.data?.count
      ? Math.ceil(pokemonsList.data?.count / PAGE_LIMIT)
      : 1;
  const error = pokemonsList.error || pokemonSearchQuery.error;
  const onPageChange = async (page: number) => {
    navigate(`/?page=${page}`);
  };
  useEffect(() => {
    if (!searchParams.get('page')) {
      navigate('/?page=1', { replace: true });
    }
  }, []);

  if (pokemonsList.isLoading || pokemonSearchQuery.isLoading)
    return <Loading />;
  if (error) return <ErrorAlert message={error.message} />;

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

      <div className="flex justify-center p-4 gap-4">
        <BuggyButton />
        <RefreshButton />
      </div>
      <Flyout />
    </>
  );
};

export default Home;
