import { useQuery } from '@tanstack/react-query';
import getPokemonById from '../utils/getPokemonById';

export function usePokemonDetails(id?: string) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonById(id!),
    enabled: !!id,
  });
}
