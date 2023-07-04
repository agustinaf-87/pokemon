import { Component, Input } from "@angular/core";
import { IPokemon } from "src/app/core/models/pokemon.interface";

@Component({
  selector: "app-pokemon-carousel",
  templateUrl: "./pokemon-carousel.component.html",
  styleUrls: ["./pokemon-carousel.component.scss"],
})
export class PokemonCarouselComponent {
  @Input() pokemons: IPokemon[] = [];
  carouselIndex = 0;

  prevPokemon() {
    const lastIndex = this.pokemons[this.pokemons.length - 1];
    this.pokemons = this.pokemons.slice(0, this.pokemons.length - 1);
    this.pokemons = [lastIndex, ...this.pokemons];
  }

  nextPokemon() {
    const firstIndex = this.pokemons[0];
    this.pokemons = this.pokemons.slice(1, this.pokemons.length);
    this.pokemons = [...this.pokemons, firstIndex];
  }
}
