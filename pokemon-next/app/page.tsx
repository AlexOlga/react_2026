import CardList from '@/components/CardList';
import Pagination from '@/components/Pagination';
import { fetchPokemonsData } from '@/utils/fetchPokemonsData';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    cardId?: string;
  }>;
}

export default async function HomePage({
  searchParams,
}: PageProps) {

  const params = await searchParams;
  const cardId = params.cardId;
  const page = Number(params.page ?? 1);
  const query = params.query ?? '';

  const pokemonsData = await fetchPokemonsData ( query,  page);

  return (
    <div className="flex">
      <div>
                <div>
          <CardList list={pokemonsData.pokemons} />

          {pokemonsData.totalPages > 1 && (
            <div className="flex justify-center p-4">
              <Pagination
                currentPage={page}               
                totalPages={pokemonsData.totalPages}
              />
            </div>
          )}
        </div>
        
      </div>

      <div>
       {/*  {cardId && <CardDetails cardId={cardId} />}*/}
      </div>
    </div>
  );
}