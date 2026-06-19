import { useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import BuggyButton from '../../../pokemon-next/app/components/BuggyButton/BuggyButton';
import { PAGE_LIMIT } from '../../constants/global';
import CardList from '../../../pokemon-next/app/components/CardList';
import Loading from '../../../pokemon-next/app/components/Loading';
import ErrorAlert from '../../../pokemon-next/app/components/ErrorAlert';
import Pagination from '../../../pokemon-next/app/components/Pagination';
import { useSearch } from '../../context/SearchContext/useSearch';
import Flyout from '../../../pokemon-next/app/components/Flyout';
import { usePokemons } from '../../../pokemon-next/hooks/usePokemons';
import { useSearchPokemon } from '../../../pokemon-next/hooks/useSearchPokemon';
import RefreshButton from '../../../pokemon-next/app/components/RefreshButton';

const Home = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const pokemonsList = usePokemons(currentPage);
  const pokemonSearchQuery = useSearchPokemon(searchQuery);
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
  }, [searchParams, navigate]);

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
