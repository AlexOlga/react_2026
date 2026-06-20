import getPokemonById from '@/utils/api/getPokemonById';
import { useQuery } from '@tanstack/react-query';


export const pokemonDetailsOptions = (id: string) => ({
  queryKey: ['pokemon', 'detail', id],
  queryFn: () => getPokemonById(id),
});
export function usePokemonDetails(id?: string) {
  return useQuery({
    ...pokemonDetailsOptions(id!),
    enabled: !!id,
  });
}

