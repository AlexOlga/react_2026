import { URL_API } from '../../pokemon-next/constants/global';
import type { Pokemon } from '../types/pokemon';
import baseFetch from './baseFetch';

async function getPokemonById(id: string): Promise<Pokemon> {
  const data: Pokemon = await baseFetch(`${URL_API}${id}`);
  return data;
}
export default getPokemonById;
