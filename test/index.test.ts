import { handleInput } from "../src/index";

describe("handleInput", () => {
  it("should throw an error when passed invalid input", () => {
    expect(() => handleInput("")).toThrow("No input provided");
    expect(() => handleInput("5 5")).toThrow(
      "Rover starting position not provided"
    );
    expect(() => handleInput("foo\n1 2 N")).toThrow(
      "Invalid plateau coordinates"
    );
    expect(() => handleInput("4 1\nzz 2 N")).toThrow(
      "Invalid rover coordinates"
    );
    expect(() => handleInput("0 0\n1 2 N")).toThrow(
      "Invalid plateau coordinates"
    );
    expect(() => handleInput("4 1\n1 2 A")).toThrow("Invalid orientation");
  });

  it("should return a plateau with a rover in the correct position, facing north, based on the first two lines of input", () => {
    const input = `3 3
1 2 N`;
    const expected = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "^", ".", "."],
      [".", ".", ".", "."],
    ];
    const actual = handleInput(input);

    expect(actual).toEqual(expected);
  });

  it("should return a plateau with a rover in the correct position, facing east, based on the first two lines of input", () => {
    const input = "7 2\n0 1 E";
    const expected = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [">", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const actual = handleInput(input);

    expect(actual).toEqual(expected);
  });

  it("should move the rover north when given a valid rover instruction", () => {
    const input = "3 3\n1 2 N\nM";
    const expected = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "^", ".", "."],
    ];

    const actual = handleInput(input);

    expect(actual).toEqual(expected);
  });

  it("should move the rover west when given a valid rover instruction", () => {
    const input = "3 3\n1 2 W\nM";
    const expected = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      ["<", ".", ".", "."],
      [".", ".", ".", "."],
    ];

    const actual = handleInput(input);

    expect(actual).toEqual(expected);
  });

  it("should correctly follow a sequence of instructions", () => {
    const input = "3 3\n1 2 W\nM R M R M M";
    const expected = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ">", "."],
    ];

    const actual = handleInput(input);

    expect(actual).toEqual(expected);
  });

  it(`should correctly follow a sequence of instructions, 
ignoring movements that would take the rover off the plateau`, () => {
    const input = "3 3\n1 2 W\nM R M M L M R R M M";
    const expected = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ">", "."],
    ];

    const actual = handleInput(input);

    expect(actual).toEqual(expected);
  });
});
