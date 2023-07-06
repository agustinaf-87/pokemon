import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { IPokemon } from "src/app/core/models/pokemon.interface";
import { Role } from "../../core/enums/role.enum";
import { AuthService } from "../../core/services/auth-service/auth.service";
import { PokemonService } from "./services/pokemon.service";

@Component({
  selector: "app-pokemons",
  templateUrl: "./pokemons.component.html",
  styleUrls: ["./pokemons.component.scss"],
})
export class PokemonsComponent implements OnInit {
  pokemons: IPokemon[] = [];

  roleEnum = Role;

  constructor(
    private pokemonService: PokemonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons(): void {
    const offset = Math.floor(Math.random() * 1008);
    this.pokemonService
      .watch({ limit: 10, offset: offset })
      .valueChanges.pipe(map((result: any) => result.data.pokemon))
      .subscribe((pokemons: IPokemon[]) => {
        this.pokemons = pokemons;
      });
  }

  public userRole(): string | undefined {
    return this.authService.getTokenData()?.role;
  }
}
