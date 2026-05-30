import { useQuery } from '@tanstack/react-query';
import { PAGE_LIMIT } from '../constants/global';
import getPokemons from '../utils/getPokemons';

export function usePokemons(page: number) {
  return useQuery({
    queryKey: ['pokemons', page],
    queryFn: () => getPokemons(PAGE_LIMIT, page),
    enabled: !!page,
  });
}
