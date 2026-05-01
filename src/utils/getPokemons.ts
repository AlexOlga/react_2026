import { API_QUERY, URL_API } from '../constant/global';
import { errorMessages } from '../shared/text';
import type { Pokemon, PokemonResponse } from '../types/pokemon';

async function getPokemons(limit: number): Promise<Pokemon[]> {
  try {
    const res = await fetch(`${URL_API}${API_QUERY.limit}${limit}`);

    if (!res.ok) {
      throw new Error(errorMessages.notFound);
    }
    const data: PokemonResponse = await res.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(errorMessages.notFound);
  }
}
export default getPokemons;
