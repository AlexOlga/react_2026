import { QueryClient } from '@tanstack/react-query';
import { CACHE_TTL } from './constants/global';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TTL,
    },
  },
});
export default queryClient;
