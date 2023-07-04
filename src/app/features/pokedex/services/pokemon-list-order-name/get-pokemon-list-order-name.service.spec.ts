import { TestBed } from "@angular/core/testing";

import { GetPokemonListServiceOrderName } from "./get-pokemon-list-order-name.service";

describe("GetPokemonListOrderNameService", () => {
  let service: GetPokemonListServiceOrderName;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPokemonListServiceOrderName);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
