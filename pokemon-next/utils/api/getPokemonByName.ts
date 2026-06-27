import { URL_API } from '../../constants/global';
import type { Pokemon } from '../../types/pokemon';
import baseFetch from './baseFetch';

async function getPokemonByName(name: string): Promise<Pokemon[]> {
  const data: Pokemon | null = await baseFetch(
    `${URL_API}${name.toLowerCase()}`,
  );
  const result: Pokemon[] = [];
  if (data) result.push(data);
  return result;
}
export default getPokemonByName;
