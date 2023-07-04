import { Injectable } from "@angular/core";
import { gql, Query } from "apollo-angular";
import { PokemonList } from "../../../../core/models/pokemon-list.interface";

interface SpeciesListResponse {
  species: PokemonList[];
}

@Injectable({
  providedIn: "root",
})
export class GetPokemonListServiceOrderName extends Query<SpeciesListResponse> {
  override document = gql`
    query pokemonList(
      $limit: Int!
      $offset: Int!
      $orderName: order_by = asc
      $nameSearch: String!
    ) {
      species: pokemon_v2_pokemon(
        where: { name: { _iregex: $nameSearch } }
        order_by: { name: $orderName }
        limit: $limit
        offset: $offset
      ) {
        name
        id
        pokemon_v2_pokemonspecy {
          pokemon_v2_pokemons {
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
          }
        }
      }
    }
  `;
}
