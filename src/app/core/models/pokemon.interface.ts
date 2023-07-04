export interface IPokemon {
  name: string;
  id: number;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
      id: number;
    };
  }[];
  pokemon_v2_pokemonabilities: {
    pokemon_v2_ability: {
      name: string;
    };
  }[];
}
