import { API_QUERY, URL_API } from '../constant/global';
import { errorMessages } from '../shared/text';
import type { Pokemon, PokemonResponse } from '../types/pokemon';
type PokemonUrl = {
  name: string;
  url: string;
};

async function getPokemonsUrl(limit: number): Promise<PokemonUrl[]> {
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
async function getPokemonsData(pokemons: PokemonUrl[]): Promise<Pokemon[]> {
  try {
    const requests = pokemons.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json())
    );

    const result = await Promise.all(requests);

    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(errorMessages.notFound);
  }
}
async function getPokemons(limit: number): Promise<Pokemon[]> {
  try {
    const pokemons = await getPokemonsUrl(limit);
    const result = await getPokemonsData(pokemons);
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(errorMessages.notFound);
  }
}
export default getPokemons;
