import { Injectable } from "@angular/core";
import { Query, gql } from "apollo-angular";
import { IPokemon } from "src/app/core/models/pokemon.interface";

export interface PokemonsResponse {
  pokemon: IPokemon;
}

@Injectable({
  providedIn: "root",
})
export class PokemonService extends Query<PokemonsResponse> {
  override document = gql`
    query pokemons($limit: Int!, $offset: Int!) {
      pokemon: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
        name
        id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
            id
          }
        }
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
          }
        }
      }
    }
  `;
  valueChanges: any;
}
