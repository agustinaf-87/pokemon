export interface PokemonList {
  name: string;
  id: number;
  generation_id: number;
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemons: PokemonsListTypes[];
  };
}

export interface PokemonsListTypes {
  pokemon_v2_pokemontypes: PokemonListType[];
}

export interface PokemonListType {
  pokemon_v2_type: {
    name: string;
  };
}
