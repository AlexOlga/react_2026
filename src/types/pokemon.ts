export type Pokemon = {
  id: number;
  name: string;
  url: string;
  sprites?: { back_default?: string };
  types: PokemonType[];
};

export type PokemonResponse = {
  results: Pokemon[];
};

export type PokemonType = {
  slot: number;
  type: { name: string; url: string };
};
