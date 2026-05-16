export type Pokemon = {
  id: number;
  name: string;
  url: string;
  sprites?: { back_default?: string };
  types: PokemonType[];
  weight: number;
  height: number;
  base_experience: string;
  abilities: abilitie[];
};

export type PokemonResponse = {
  results: Pokemon[];
};

export type PokemonType = {
  slot: number;
  type: { name: string; url: string };
};
type abilitie = {
  slot: number;
  ability: {
    name: string;
  };
};
