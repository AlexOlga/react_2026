import { URL_API } from '@/constants/global';
import { Pokemon } from '@/types/pokemon';
import baseFetch from './baseFetch';

async function getPokemonById(id: string): Promise<Pokemon | null> {
  const data: Pokemon | null = await baseFetch(`${URL_API}${id}`);
  return data;
}
export default getPokemonById;
