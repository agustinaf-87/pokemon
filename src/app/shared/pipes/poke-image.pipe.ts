import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pokeImage",
})
export class PokeImagePipe implements PipeTransform {
  transform(value: number | undefined): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value}.png`;
  }
}
