import { createPlateau, updatePlateau } from "../src/plateau";
import { Rover } from "../src/rover";

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

describe("updatePlateau", () => {
  it("not change the plateau if rover hasn't changed position", () => {
    const plateau = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "^", ".", "."],
      [".", ".", ".", "."],
    ];
    const rover: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "N",
    };
    expect(updatePlateau(plateau, rover, rover)).toEqual(plateau);
  });

  it("should update the plateau if a rover turns right", () => {
    const plateau = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "^", ".", "."],
      [".", ".", ".", "."],
    ];
    const roverPreviousPosition: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "N",
    };
    const roverNewPosition: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "E",
    };

    const expected = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ">", ".", "."],
      [".", ".", ".", "."],
    ];
    expect(
      updatePlateau(plateau, roverNewPosition, roverPreviousPosition)
    ).toEqual(expected);
  });

  it("should update the plateau if a rover turns left", () => {
    const plateau = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "^", ".", "."],
      [".", ".", ".", "."],
    ];
    const roverPreviousPosition: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "N",
    };
    const roverNewPosition: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "W",
    };

    const expected = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "<", ".", "."],
      [".", ".", ".", "."],
    ];
    expect(
      updatePlateau(plateau, roverNewPosition, roverPreviousPosition)
    ).toEqual(expected);
  });

  it("should update the plateau if a rover moves forward", () => {
    const plateau = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "^", ".", "."],
      [".", ".", ".", "."],
    ];
    const roverPreviousPosition: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "N",
    };
    const roverNewPosition: Rover = {
      coordinates: {
        x: 1,
        y: 3,
      },
      orientation: "N",
    };

    const expected = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "^", ".", "."],
    ];
    expect(
      updatePlateau(plateau, roverNewPosition, roverPreviousPosition)
    ).toEqual(expected);
  });
});
