import getPokemonByName from '@/utils/api/getPokemonByName';
import { useQuery } from '@tanstack/react-query';

export function useSearchPokemon(name: string) {
  return useQuery({
    queryKey: ['pokemon', 'search', name],
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
  });
}
