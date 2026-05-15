import { API_QUERY, URL_API } from '../constant/global';
import type { Pokemon } from '../types/pokemon';
import baseFetch from './baseFeatch';

type PokemonUrl = {
  name: string;
  url: string;
};
type PokemonResponse = {
  count: number;
  results: PokemonUrl[];
};
type PokemonData = {
  count: number;
  results: Pokemon[];
};
async function getPokemonsUrl(
  limit: number,
  offset: number
): Promise<PokemonResponse> {
  const data: PokemonResponse = await baseFetch(
    `${URL_API}${API_QUERY.offset}${offset}&${API_QUERY.limit}${limit}`
  );
  console.log(data);
  return data;
}
async function getPokemonsData(pokemons: PokemonUrl[]): Promise<Pokemon[]> {
  const results = await Promise.allSettled(
    pokemons.map((p) => baseFetch<Pokemon>(p.url))
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<Pokemon> => r.status === 'fulfilled'
    )
    .map((r) => r.value);
}

async function getPokemons(limit: number, page: number): Promise<PokemonData> {
  const offset = limit * (page - 1);
  const res = await getPokemonsUrl(limit, offset);
  return {
    count: res.count,
    results: await getPokemonsData(res.results),
  };
}
export default getPokemons;
