import { PokeImagePipe } from "./poke-image.pipe";

describe("PokeImagePipe", () => {
  it("create an instance", () => {
    const pipe = new PokeImagePipe();
    expect(pipe).toBeTruthy();
  });
});
