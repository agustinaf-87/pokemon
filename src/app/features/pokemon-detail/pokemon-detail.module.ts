import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PokemonDetailRoutingModule } from "./pokemon-detail-routing.module";
import { PokemonDetailComponent } from "./pokemon-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { StatsChartComponent } from "./components/stats-chart/stats-chart.component";

@NgModule({
  declarations: [PokemonDetailComponent, StatsChartComponent],
  imports: [CommonModule, PokemonDetailRoutingModule, SharedModule],
})
export class PokemonDetailModule {}
