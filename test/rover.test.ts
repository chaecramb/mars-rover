import { Rover, launchRover, moveRover, turnRover } from "../src/rover";
import { createPlateau, printPlateau } from "../src/plateau";

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

describe("moveRover", () => {
  it("should move the rover forward when terrain is passable", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ];

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
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
    ];

    const actual = moveRover(plateau, rover);

    expect(actual).toEqual(expected);
  });

  it("should not move the rover forward when there's another rover in the way", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
      [".", ">", ".", ".", "."],
    ];

    const rover: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "N",
    };

    // Expected appears upside down as 0,0 is the bottom left corner
    const expected = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
      [".", ">", ".", ".", "."],
    ];

    const actual = moveRover(plateau, rover);

    expect(actual).toEqual(expected);
  });

  it("should not move the rover forward when it's at the edge of the plateau", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
    ];

    const rover: Rover = {
      coordinates: {
        x: 1,
        y: 3,
      },
      orientation: "N",
    };

    // Expected appears upside down as 0,0 is the bottom left corner
    const expected = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
    ];

    const actual = moveRover(plateau, rover);

    expect(actual).toEqual(expected);
  });
});

describe("turnRover", () => {
  it("should turn the rover left when given a valid input", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
    ];

    const rover: Rover = {
      coordinates: {
        x: 1,
        y: 3,
      },
      orientation: "N",
    };

    const expected = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "<", ".", ".", "."],
    ];

    const actual = turnRover(plateau, rover, "L");

    expect(actual).toEqual(expected);
  });

  it("should turn the rover right when given a valid input", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
    ];

    const rover: Rover = {
      coordinates: {
        x: 1,
        y: 3,
      },
      orientation: "N",
    };

    const expected = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ">", ".", ".", "."],
    ];

    const actual = turnRover(plateau, rover, "R");

    expect(actual).toEqual(expected);
  });
});
