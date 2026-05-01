import { URL_API } from '../constant/global';
import { errorMessages } from '../shared/text';
import type { Pokemon } from '../types/pokemon';

async function getPokemonByName(name: string): Promise<Pokemon[]> {
  try {
    const res = await fetch(`${URL_API}${name.toLowerCase()}`);
    const result: Pokemon[] = [];
    if (!res.ok) {
      return result;
    }
    const data: Pokemon = await res.json();
    result.push(data);
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(errorMessages.notFound);
  }
}
export default getPokemonByName;
