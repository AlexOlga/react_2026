import CardDetails from '@/components/CardDetails';
import CardList from '@/components/CardList';
import Flyout from '@/components/Flyout';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import { fetchPokemonsData } from '@/utils/fetchPokemonsData';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    cardId?: string;
  }>;
}

export default async function HomePage({ searchParams }: PageProps) {  
  const params = await searchParams;
  const cardId = params.cardId;
  const page = Number(params.page ?? 1);
  const query = params.query ?? '';

  const pokemonsData = await fetchPokemonsData(query, page);

  return (
    <div>
      <Search query={query} />
      <div className="flex">
        <div>
          <CardList list={pokemonsData.pokemons} currentPage={page} />

          {pokemonsData.totalPages > 1 && (
            <div className="flex justify-center p-4">
              <Pagination
                currentPage={page}
                totalPages={pokemonsData.totalPages}
              />
            </div>
          )}
        </div>

        {cardId && <CardDetails cardId={cardId} />}
      </div>    
      <Flyout />
    </div>
  );
}
