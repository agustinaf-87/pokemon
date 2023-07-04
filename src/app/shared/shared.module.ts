import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";
import { PokeImagePipe } from "./pipes/poke-image.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PokemonCardDetailComponent } from "./components/pokemon-card-detail/pokemon-card-detail.component";
import { FormLayoutComponent } from "./components/form-layout/form-layout.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    PokeImagePipe,
    PokemonCardDetailComponent,
    FormLayoutComponent,
  ],
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    MATERIAL_MODULES,
    TranslateModule,
    PokeImagePipe,
    PokemonCardDetailComponent,
    FormLayoutComponent,
  ],
})
export class SharedModule {}
