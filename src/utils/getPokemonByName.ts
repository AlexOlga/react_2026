import { URL_API } from '../constant/global';
import { errorMessages } from '../shared/text';
import type { Pokemon } from '../types/pokemon';

async function getPokemonByName(name: string): Promise<Pokemon> {
  try {
    const res = await fetch(`${URL_API}${name.toLowerCase()}`);

    if (!res.ok) {
      throw new Error(errorMessages.notFound);
    }
    const data: Pokemon = await res.json();
    console.log('pokemon', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(errorMessages.notFound);
  }
}
export default getPokemonByName;
