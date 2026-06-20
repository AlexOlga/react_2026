import { PAGE_LIMIT } from "@/constants/global";
import getPokemons from "./api/getPokemons";
import getPokemonByName from "./api/getPokemonByName";

export async function fetchPokemonsData (query: string, page: number){
    console.log('featch', query, page)
  if (query === '') {
    const data =  await getPokemons(PAGE_LIMIT, page);   
     const totalPages = Math.ceil(data.count / PAGE_LIMIT)
      
       return {pokemons: data.results || [],
         totalPages
       }; 
  }
  else {
     const data = await getPokemonByName(query);
     return {pokemons: data || [], totalPages: 1}; 
  }
 }