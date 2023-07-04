import { TestBed } from "@angular/core/testing";

import { GetPokemonListServiceOrderId } from "./get-pokemon-list-order-id.service";

describe("GetPokemonListOrderIdService", () => {
  let service: GetPokemonListServiceOrderId;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPokemonListServiceOrderId);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
