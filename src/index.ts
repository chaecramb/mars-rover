import { Plateau, Coordinates, createPlateau } from "./plateau";
import {
  Rover,
  launchRover,
  RoverInstruction,
  moveRover,
  turnRover,
} from "./rover";

export const handleInput = (input: string) => {
  if (!input) {
    throw new Error("No input provided");
  }

  const [plateauCoordinates, roverStart, roverInstructions] = input.split("\n");

  if (!roverStart) {
    throw new Error("Rover starting position not provided");
  }

  const [x, y] = plateauCoordinates.split(" ");
  const plateauUpperRight = {
    x: parseInt(x),
    y: parseInt(y),
  };

  // Subtract 1 to width and height as the first line of input signifies the
  // rightmost and uppermost coordinates of the plateau, not the width and height.
  if (
    !isValidCoordinates({
      x: plateauUpperRight.x - 1,
      y: plateauUpperRight.y - 1,
    })
  ) {
    throw new Error("Invalid plateau coordinates");
  }

  // Add 1 to width and height as the first line of input signifies the
  // rightmost and uppermost coordinates of the plateau, not the width and height.
  let plateau = createPlateau(plateauUpperRight.x + 1, plateauUpperRight.y + 1);

  const [roverX, roverY, roverOrientation] = roverStart.split(" ");
  const roverStartPosition: Coordinates = {
    x: parseInt(roverX),
    y: parseInt(roverY),
  };

  if (!isOrientation(roverOrientation)) {
    throw new Error("Invalid orientation");
  }

  if (!isValidCoordinates(roverStartPosition)) {
    throw new Error("Invalid rover coordinates");
  }

  const rover: Rover = {
    coordinates: roverStartPosition,
    orientation: roverOrientation,
  };

  plateau = launchRover(plateau, rover);

  if (roverInstructions) {
    const instructionsArray = roverInstructions.split(" ");
    if (instructionsArray.every(isRoverInstruction)) {
      instructionsArray.forEach((instruction) => {
        plateau = executeInstruction(plateau, rover, instruction);
      });
    } else {
      throw new Error("Invalid rover instructions");
    }
  }

  return plateau;
};

function isOrientation(input: any): input is Rover["orientation"] {
  return ["N", "S", "E", "W"].includes(input);
}

export function isValidCoordinates(input: any): input is Coordinates {
  return input.x >= 0 && input.y >= 0;
}

function isRoverInstruction(input: any): input is RoverInstruction {
  return ["L", "R", "M"].includes(input);
}

function executeInstruction(
  plateau: Plateau,
  rover: Rover,
  instruction: RoverInstruction
): Plateau {
  if (instruction === "L" || instruction === "R") {
    plateau = turnRover(plateau, rover, instruction);
  } else if (instruction === "M") {
    plateau = moveRover(plateau, rover);
  }
  return plateau;
}
