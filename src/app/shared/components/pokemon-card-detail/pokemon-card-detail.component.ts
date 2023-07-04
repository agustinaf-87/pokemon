import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { PokemonList } from "../../../core/models/pokemon-list.interface";
import { PokemonSpecies } from "../../../core/models/pokemon.schema";

export type PokemonParsed = {
  name: string;
  id: number;
  types: string[];
};

@Component({
  selector: "app-pokemon-card-detail",
  templateUrl: "./pokemon-card-detail.component.html",
  styleUrls: ["./pokemon-card-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardDetailComponent implements OnInit {
  notEditable = true;
  @Input() pokemonList?: PokemonList;
  @Input() pokemonSpecies?: PokemonSpecies;
  //Agus types

  parsedData!: PokemonParsed;

  form!: FormGroup;

  ngOnInit(): void {
    this.initPokemonSpeciesForm();
  }

  initPokemonSpeciesForm(): void {
    if (this.pokemonList) this.parsedData = this.normData(this.pokemonList);
    if (this.pokemonSpecies)
      this.parsedData = this.normData(this.pokemonSpecies);

    this.form = new FormGroup({
      name: new FormControl(this.parsedData.name),
      id: new FormControl(this.parsedData.id),
      types: new FormControl(this.parsedData.types.toString()),
    });
  }

  private normData(pokemon: PokemonList | PokemonSpecies): PokemonParsed {
    let result: PokemonParsed = {
      name: "",
      id: 0,
      types: [],
    };

    if (typeof pokemon === typeof this.pokemonList) {
      const typedPokemon = pokemon as PokemonList;
      const types: string[] = [];

      typedPokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.forEach(
        (element) => {
          types.push(element.pokemon_v2_type.name);
        }
      );

      result = {
        name: typedPokemon.name,
        id: typedPokemon.id,
        types: types,
      };
    } else if (typeof pokemon === typeof this.pokemonSpecies) {
      const typedPokemon = pokemon as PokemonSpecies;
      const types: string[] = [];

      typedPokemon.pokemon_v2_pokemons.forEach((element) => {
        element.pokemon_v2_pokemontypes.forEach((type) => {
          types.push(type.pokemon_v2_type.name);
        });
      });

      result = {
        name: pokemon.name,
        id: pokemon.id,
        types: types,
      };
    }

    return result;
  }
}
