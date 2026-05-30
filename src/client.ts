import { QueryClient } from '@tanstack/react-query';

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TTL,
    },
  },
});
export default queryClient;
