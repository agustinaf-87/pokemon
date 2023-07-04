import { Injectable } from "@angular/core";
import { gql, Query } from "apollo-angular";
import { Species } from "../../../core/models/pokemon.schema";

interface SpeciesResponse {
  species: Species[];
}

@Injectable({
  providedIn: "root",
})
export class GetPokemonService extends Query<SpeciesResponse> {
  override document = gql`
    query PokemonDetail($id: Int!) {
      species: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
        name
        id
        height
        weight
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
            pokemonV2TypeefficaciesByTargetTypeId {
              damage_factor
              pokemon_v2_type {
                name
              }
            }
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
            pokemon_v2_abilityeffecttexts(where: { language_id: { _eq: 9 } }) {
              short_effect
            }
          }
        }
        pokemon_v2_pokemonspecy {
          name
          evolution_chain_id
          pokemon_v2_evolutionchain {
            pokemon_v2_pokemonspecies {
              name
              id
              pokemon_v2_pokemons {
                pokemon_v2_pokemontypes {
                  pokemon_v2_type {
                    name
                  }
                }
              }
            }
          }
          pokemon_v2_pokemonspeciesflavortexts(
            where: { language_id: { _eq: 9 }, pokemon_species_id: { _eq: $id } }
            order_by: { version_id: desc }
            limit: 1
          ) {
            flavor_text
          }
        }
      }
    }
  `;
}
