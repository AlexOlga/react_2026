import { API_QUERY, URL_API } from '../constant/global';
import type { Pokemon, PokemonResponse } from '../types/pokemon';
import baseFetch from './baseFeatch';
type PokemonUrl = {
  name: string;
  url: string;
};
async function getPokemonsUrl(limit: number): Promise<PokemonUrl[]> {
  const data: PokemonResponse = await baseFetch(
    `${URL_API}${API_QUERY.limit}${limit}`
  );

  return data.results;
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

async function getPokemons(limit: number): Promise<Pokemon[]> {
  const pokemons = await getPokemonsUrl(limit);
  return await getPokemonsData(pokemons);
}
export default getPokemons;
