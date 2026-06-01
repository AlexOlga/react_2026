import { API_QUERY, URL_API } from '../constants/global';
import type { ApiResponse } from '../types/api';
import type { Pokemon } from '../types/pokemon';
import baseFetch from './baseFeatch';

type PokemonUrl = {
  name?: string;
  url: string;
};

async function getPokemonsUrl(
  limit: number,
  offset: number
): Promise<ApiResponse<PokemonUrl>> {
  const data: ApiResponse<PokemonUrl> = await baseFetch(
    `${URL_API}${API_QUERY.offset}${offset}&${API_QUERY.limit}${limit}`
  );
  return data;
}
export async function getPokemonsData(
  pokemons: PokemonUrl[]
): Promise<Pokemon[]> {
  const results = await Promise.allSettled(
    pokemons.map((p) => baseFetch<Pokemon>(p.url))
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<Pokemon> => r.status === 'fulfilled'
    )
    .map((r) => r.value);
}

async function getPokemons(
  limit: number,
  page: number
): Promise<ApiResponse<Pokemon>> {
  const offset = limit * (page - 1);
  const res = await getPokemonsUrl(limit, offset);
  return {
    count: res.count,
    results: await getPokemonsData(res.results),
  };
}
export default getPokemons;
