import { createPlateau } from "../src/plateau";

describe("createPlateau", () => {
  it("should throw an error when passed invalid input", () => {
    expect(() => createPlateau(-1, 10)).toThrow(
      "Width and height must be at least 1"
    );
    expect(() => createPlateau(3, -5)).toThrow(
      "Width and height must be at least 1"
    );
    expect(() => createPlateau(3, 0)).toThrow(
      "Width and height must be at least 1"
    );
  });

  it("should return a square plateau when passed same width and height", () => {
    const expected = Array.from({ length: 10 }, () => Array(10).fill("."));
    const actual = createPlateau(10, 10);

    expect(actual).toEqual(expected);
  });

  it("should return a rectangular plateau when passed different width and height", () => {
    const expected = [
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
    ];
    const actual = createPlateau(7, 3);

    expect(actual).toEqual(expected);
  });
});
