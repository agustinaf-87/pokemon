import { Component, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { PokemonList } from "../../core/models/pokemon-list.interface";
import { OrderByEnum } from "./enum/order-by-Enum.enum";
import { GetPokemonListServiceOrderId } from "./services/pokemon-list-order-id/get-pokemon-list-order-id.service";
import { GetPokemonListServiceOrderName } from "./services/pokemon-list-order-name/get-pokemon-list-order-name.service";

@Component({
  selector: "app-pokedex",
  templateUrl: "./pokedex.component.html",
  styleUrls: ["./pokedex.component.scss"],
})
export class PokedexComponent implements OnInit {
  pokemon$!: Observable<PokemonList[]>;

  pokeList: PokemonList[] = [];

  orderCriteria = OrderByEnum.ID;

  increment = 10;
  limit = 10;
  offset = 0;
  orderName = "asc";
  orderId = "asc";
  nameSearch = "";

  constructor(
    private getPokemonListOrderId: GetPokemonListServiceOrderId,
    private getPokemonListOrderName: GetPokemonListServiceOrderName
  ) {}

  ngOnInit(): void {
    switch (this.orderCriteria) {
      case OrderByEnum.ID:
        this.loadPokemonOrderID();
        break;
      default:
        this.loadPokemonOrderName();
        break;
    }
  }

  loadMorePokemon() {
    switch (this.orderCriteria) {
      case OrderByEnum.ID:
        this.saveDataPokemon(this.loadPokemonOrderID());
        this.offset += this.increment;
        break;
      default:
        this.saveDataPokemon(this.loadPokemonOrderName());
        this.offset += this.increment;
        break;
    }
  }

  loadLessPokemon() {
    if (this.offset > this.increment) {
      this.offset -= this.increment;
      this.spliceDataPokemon();
    }
  }

  private loadPokemonOrderID(): Observable<PokemonList[]> {
    return this.getPokemonListOrderId
      .watch({
        limit: this.limit,
        offset: this.offset,
        orderId: this.orderId,
        nameSearch: this.nameSearch,
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.species;
        })
      );
  }

  private loadPokemonOrderName(): Observable<PokemonList[]> {
    return this.getPokemonListOrderName
      .watch({
        limit: this.limit,
        offset: this.offset,
        orderName: this.orderName,
        nameSearch: this.nameSearch,
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.species;
        })
      );
  }

  saveDataPokemon(observable: Observable<PokemonList[]>) {
    observable.subscribe((result) => {
      this.pokeList = this.pokeList.concat(result);
    });
  }

  spliceDataPokemon() {
    this.pokeList.splice(-this.limit);
  }
}
