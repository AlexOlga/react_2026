import { useQuery } from '@tanstack/react-query';
import { PAGE_LIMIT } from '../constants/global';
import getPokemons from '../utils/getPokemons';
import queryClient from '../client';

export function usePokemons(page: number) {
  return useQuery({
    queryKey: ['pokemons', page],
    queryFn: async () => {
      const data = await getPokemons(PAGE_LIMIT, page);
      data.results.forEach((pokemon) => {
        queryClient.setQueryData(
          ['pokemon', 'detail', String(pokemon.id)],
          pokemon,
        );
      });
      return data;
    },
    enabled: !!page,
  });
}
