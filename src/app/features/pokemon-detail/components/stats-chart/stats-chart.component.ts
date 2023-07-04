import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Chart, registerables } from "chart.js/auto";
import { Species } from "../../../../core/models/pokemon.schema";

@Component({
  selector: "app-stats-chart",
  templateUrl: "./stats-chart.component.html",
  styleUrls: ["./stats-chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsChartComponent implements OnInit, OnChanges {
  @Input() pokemon!: Species;
  chart: any;

  constructor() {
    Chart.register(...registerables);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["pokemon"].currentValue !== changes["pokemon"].previousValue) {
      this.initDataset(changes["pokemon"].currentValue);
    }
  }

  ngOnInit(): void {
    if (this.pokemon) this.initDataset(this.pokemon);
  }

  initDataset(specie: Species) {
    if (this.chart) this.chart.destroy();
    const labelArray: string[] = [
      "HP",
      "Attack",
      "Defense",
      "Sp. Atk",
      "Sp. Def",
      "Speed",
    ];
    const dataArray: number[] = [];
    specie.pokemon_v2_pokemonstats.forEach((stat) => {
      dataArray.push(stat.base_stat);
    });

    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: labelArray,
        datasets: [
          {
            label: "Stats",
            data: dataArray,
            backgroundColor: [
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
