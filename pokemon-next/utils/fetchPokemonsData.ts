import { PAGE_LIMIT } from '@/constants/global';
import getPokemons from './api/getPokemons';
import getPokemonByName from './api/getPokemonByName';

export async function fetchPokemonsData(query: string, page: number) { 
  if (query === '') {
    const data = await getPokemons(PAGE_LIMIT, page);
    const totalPages = data ? Math.ceil(data.count / PAGE_LIMIT) : null;

    return { pokemons: data ? data.results : [], totalPages };
  } else {
    const data = await getPokemonByName(query);
    return { pokemons: data ? data :  [], totalPages: 1 };
  }
}
