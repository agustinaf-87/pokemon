import { Component, OnInit } from "@angular/core";
import { Observable, map, switchMap } from "rxjs";
import { Species } from "../../core/models/pokemon.schema";
import { GetPokemonService } from "./services/get-pokemon.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.scss"],
})
export class PokemonDetailComponent implements OnInit {
  pokemon$!: Observable<Species>;

  constructor(
    private route: ActivatedRoute,
    private getPokemon: GetPokemonService
  ) {}

  ngOnInit(): void {
    this.pokemon$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.getPokemon
          .watch({ id: params.get("id") })
          .valueChanges.pipe(map((result) => result.data.species[0]))
      )
    );
  }

  public calcWeakType(pokemon: Species) {
    const pokeTypes: { [key: string]: number } = {};
    const resultArray: string[] = [];
    pokemon.pokemon_v2_pokemontypes.forEach((element) => {
      if (element.pokemon_v2_type.pokemonV2TypeefficaciesByTargetTypeId) {
        element.pokemon_v2_type.pokemonV2TypeefficaciesByTargetTypeId.forEach(
          (type) => {
            if (pokeTypes[type.pokemon_v2_type.name]) {
              const oldValue = pokeTypes[type.pokemon_v2_type.name];
              if (oldValue) {
                pokeTypes[type.pokemon_v2_type.name] =
                  oldValue + type.damage_factor;
              }
            } else {
              pokeTypes[type.pokemon_v2_type.name] = type.damage_factor;
            }
          }
        );
      }
    });

    for (const key in pokeTypes) {
      if (pokeTypes[key] / pokemon.pokemon_v2_pokemontypes.length >= 150)
        resultArray.push(key);
    }
    return resultArray;
  }
}
