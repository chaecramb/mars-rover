import { Rover, moveRover, turnRover } from "../src/rover";
import { createPlateau, printPlateau } from "../src/plateau";

describe("moveRover", () => {
  it("should move the rover north when facing N and terrain is passable", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ];

    const roverInitialPosition: Rover = {
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

    const actual = moveRover(plateau, roverInitialPosition);

    expect(actual).toEqual(roverNewPosition);
  });

  it("should move the rover east when facing E and terrain is passable", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ];

    const roverInitialPosition: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "E",
    };

    const roverNewPosition: Rover = {
      coordinates: {
        x: 2,
        y: 2,
      },
      orientation: "E",
    };

    const actual = moveRover(plateau, roverInitialPosition);

    expect(actual).toEqual(roverNewPosition);
  });

  it("should move the rover south when facing S and terrain is passable", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ];

    const roverInitialPosition: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "S",
    };

    const roverNewPosition: Rover = {
      coordinates: {
        x: 1,
        y: 1,
      },
      orientation: "S",
    };

    const actual = moveRover(plateau, roverInitialPosition);

    expect(actual).toEqual(roverNewPosition);
  });

  it("should move the rover west when facing W and terrain is passable", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ];

    const roverInitialPosition: Rover = {
      coordinates: {
        x: 1,
        y: 2,
      },
      orientation: "W",
    };

    const roverNewPosition: Rover = {
      coordinates: {
        x: 0,
        y: 2,
      },
      orientation: "W",
    };

    const actual = moveRover(plateau, roverInitialPosition);

    expect(actual).toEqual(roverNewPosition);
  });

  it("should not move the rover forward when there's another rover in the way", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
      [".", ">", ".", ".", "."],
    ];

    const roverInitialPosition: Rover = {
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
      orientation: "N",
    };

    const actual = moveRover(plateau, roverInitialPosition);

    expect(actual).toEqual(roverNewPosition);
  });

  it("should not move the rover forward when it's at the edge of the plateau", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
    ];

    const roverInitialPosition: Rover = {
      coordinates: {
        x: 1,
        y: 3,
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

    const actual = moveRover(plateau, roverInitialPosition);

    expect(actual).toEqual(roverNewPosition);
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

    const roverInitialOrientation: Rover = {
      coordinates: {
        x: 1,
        y: 3,
      },
      orientation: "N",
    };

    const roverNewOrientation: Rover = {
      coordinates: {
        x: 1,
        y: 3,
      },
      orientation: "W",
    };

    const actual = turnRover(plateau, roverInitialOrientation, "L");

    expect(actual).toEqual(roverNewOrientation);
  });

  it("should turn the rover right when given a valid input", () => {
    const plateau = [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      [".", "^", ".", ".", "."],
    ];

    const roverInitialOrientation: Rover = {
      coordinates: {
        x: 1,
        y: 3,
      },
      orientation: "N",
    };

    const roverNewOrientation: Rover = {
      coordinates: {
        x: 1,
        y: 3,
      },
      orientation: "E",
    };

    const actual = turnRover(plateau, roverInitialOrientation, "R");

    expect(actual).toEqual(roverNewOrientation);
  });
});
