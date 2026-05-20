export const LOCAL_QUERY = 'searchQuery';
export const URL_API = 'https://pokeapi.co/api/v2/pokemon/';
export const API_QUERY = {
  limit: 'limit=',
  offset: '?offset=',
};
export const PAGE_LIMIT = 20;
export const placeholderURL = '/pokemon-placeholder.png';
export const errorMessagesMap: Record<number, string> = {
  400: 'Invalid request. Please check your input.',
  401: 'You need to log in to continue.',
  403: 'You do not have permission to perform this action.',
  404: 'Not found.',
  500: 'Server error. Please try again later.',
};
