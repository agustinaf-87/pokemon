import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PokemonCardDetailComponent } from "./pokemon-card-detail.component";

describe("PokemonCardDetailComponent", () => {
  let component: PokemonCardDetailComponent;
  let fixture: ComponentFixture<PokemonCardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
