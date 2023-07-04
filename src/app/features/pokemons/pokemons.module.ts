import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PokemonsRoutingModule } from "./pokemons-routing.module";
import { PokemonsComponent } from "./pokemons.component";
import { PokemonCarouselComponent } from "./components/pokemon-carousel/pokemon-carousel.component";
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "../../shared/shared.module";
import { PokemonCardComponent } from "./components/pokemon-card/pokemon-card.component";

@NgModule({
  declarations: [
    PokemonsComponent,
    PokemonCarouselComponent,
    PokemonCardComponent,
  ],
  imports: [CommonModule, PokemonsRoutingModule, MatCardModule, SharedModule],
})
export class PokemonsModule {}
