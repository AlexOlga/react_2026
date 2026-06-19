import { URL_API } from '../constants/global';
import type { Pokemon } from '../../src/types/pokemon';
import baseFetch from './api/baseFetch';

async function getPokemonById(id: string): Promise<Pokemon> {
  const data: Pokemon = await baseFetch(`${URL_API}${id}`);
  return data;
}
export default getPokemonById;
