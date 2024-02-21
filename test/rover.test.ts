import { Rover, launchRover } from "../src/rover";
import { createPlateau } from "../src/plateau";

describe("launchRover", () => {
  it("should return an object with width and height properties", () => {
    const plateau = createPlateau(5, 4);
    const rover: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "N",
    };

    const expected = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ];
    const actual = launchRover(plateau, rover);

    expect(actual).toEqual(expected);
  });
});
