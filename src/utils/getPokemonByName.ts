import { URL_API } from '../constant/global';
import type { Pokemon } from '../types/pokemon';
import baseFetch from './baseFeatch';

async function getPokemonByName(name: string): Promise<Pokemon[]> {
  const data: Pokemon = await baseFetch(`${URL_API}${name.toLowerCase()}`);
  const result: Pokemon[] = [];
  result.push(data);
  return result;
}
export default getPokemonByName;
