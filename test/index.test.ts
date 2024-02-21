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
    expect(() => handleInput("4 1\n1 2 A")).toThrow("Invalid orientation");
  });

  it("should return a plateau with a rover in the correct position based on the first two lines of input'", () => {
    const input = `4 4
    1 2 N`;
    const expected = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
    ];
  });
});
