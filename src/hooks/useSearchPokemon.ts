import { useQuery } from '@tanstack/react-query';
import getPokemonByName from '../utils/getPokemonByName';

export function useSearchPokemons(name: string) {
  return useQuery({
    queryKey: [name],
    queryFn: () => getPokemonByName(name),
  });
}
