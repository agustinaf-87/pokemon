import { Component, Input } from "@angular/core";
import { IPokemon } from "src/app/core/models/pokemon.interface";

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.scss"],
})
export class PokemonCardComponent {
  @Input() pokemon!: IPokemon;
}
