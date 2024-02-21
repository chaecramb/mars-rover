import { Plateau, Coordinates, createPlateau, updatePlateau } from "./plateau";
import { Rover, RoverInstruction, moveRover, turnRover } from "./rover";

export const handleInput = (input: string) => {
  if (!input) {
    throw new Error("No input provided");
  }

  const [plateauCoordinates, ...rovers] = input.split("\n");

  if (rovers.length === 0) {
    throw new Error("Rover starting position not provided");
  }

  const roversFinalPositions = [];

  for (let i = 0; i < rovers.length; i += 2) {
    const roverStart = rovers[i];
    const roverInstructions = rovers[i + 1];

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
    let plateau = createPlateau(
      plateauUpperRight.x + 1,
      plateauUpperRight.y + 1
    );

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

    let rover: Rover = {
      coordinates: roverStartPosition,
      orientation: roverOrientation,
    };

    plateau = updatePlateau(plateau, rover);

    if (roverInstructions) {
      const instructionsArray = roverInstructions.split(" ");
      if (instructionsArray.every(isRoverInstruction)) {
        instructionsArray.forEach((instruction) => {
          [plateau, rover] = executeInstruction(plateau, rover, instruction);
        });
      } else {
        throw new Error("Invalid rover instructions");
      }
    }
    roversFinalPositions.push(rover);
  }

  return roversFinalPositions
    .reduce((output, rover) => {
      return (output += `${rover.coordinates.x} ${rover.coordinates.y} ${rover.orientation}\n`);
    }, "")
    .trimEnd();
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
): [Plateau, Rover] {
  let roverNewPosition = rover;

  if (instruction === "L" || instruction === "R") {
    roverNewPosition = turnRover(plateau, rover, instruction);
  } else if (instruction === "M") {
    roverNewPosition = moveRover(plateau, rover);
  }

  const updatedPlateau = updatePlateau(plateau, roverNewPosition, rover);

  return [updatedPlateau, roverNewPosition];
}
