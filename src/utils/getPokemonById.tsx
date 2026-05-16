import { URL_API } from '../constants/global';
import type { Pokemon } from '../types/pokemon';
import baseFetch from './baseFeatch';

async function getPokemonById(id: string): Promise<Pokemon> {
  const data: Pokemon = await baseFetch(`${URL_API}${id}`);
  console.log('pokemon', data);
  return data;
}
export default getPokemonById;
