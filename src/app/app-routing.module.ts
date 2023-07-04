import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./core/pages/landing-page/landing-page.component";
import { LoginComponent } from "./core/components/login/login.component";
import { authGuard } from "./core/guards/auth-guard.guard";
import { Role } from "./core/enums/role.enum";
import { roleGuard } from "./core/guards/role-guard.guard";

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
    data: {
      breadcrumb: "LandingPage",
    },
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "pokedex",
    canMatch: [authGuard, roleGuard],
    loadChildren: () =>
      import("./features/pokedex/pokedex.module").then((m) => m.PokedexModule),
    data: {
      roles: [Role.Tester, Role.Admin, Role.Developer],
    },
  },
  {
    path: "pokedex/:id",
    canMatch: [authGuard, roleGuard],
    loadChildren: () =>
      import("./features/pokemon-detail/pokemon-detail.module").then(
        (m) => m.PokemonDetailModule
      ),
    data: {
      roles: [Role.Tester, Role.Admin, Role.Developer],
    },
  },
  {
    path: "pokemons",
    canMatch: [authGuard, roleGuard],
    loadChildren: () =>
      import("./features/pokemons/pokemons.module").then(
        (m) => m.PokemonsModule
      ),
    data: {
      roles: [Role.Admin, Role.Developer],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
