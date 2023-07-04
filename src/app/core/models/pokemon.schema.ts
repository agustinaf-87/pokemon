export interface Species {
  name: string;
  id: number;
  height: number;
  weight: number;
  evolves_from_species_id?: number;
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonstats: PokemonStat[];
  pokemon_v2_pokemonabilities: PokemonHability[];
  pokemon_v2_pokemonspecy: PokemonChain;
}

export interface PokemonType {
  pokemon_v2_type: {
    name: string;
    pokemonV2TypeefficaciesByTargetTypeId: PokemonTargetType[];
  };
}

export interface PokemonTargetType {
  damage_factor: number;
  pokemon_v2_type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

export interface PokemonHability {
  pokemon_v2_ability: {
    name: string;
    pokemon_v2_abilityeffecttexts: {
      short_effect: string;
    };
  };
}

export interface PokemonChain {
  name: string;
  evolution_chain_id: number;
  pokemon_v2_evolutionchain: {
    pokemon_v2_pokemonspecies: PokemonSpecies[];
  };
  pokemon_v2_pokemonspeciesflavortexts: PokemonFlavorText[];
}

export interface PokemonSpecies {
  name: string;
  id: number;
  pokemon_v2_pokemons: {
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: {
        name: string;
      };
    }[];
  }[];
}

export interface PokemonFlavorText {
  flavor_text: string;
}
