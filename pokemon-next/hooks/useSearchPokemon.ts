import { useQuery } from '@tanstack/react-query';
import getPokemonByName from '../utils/api/getPokemonByName';

export function useSearchPokemon(name: string) {
  return useQuery({
    queryKey: ['pokemon', 'search', name],
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
  });
}
