import { Coordinates, createPlateau } from "./plateau";
import { Rover, launchRover } from "./rover";

export const handleInput = (input: string) => {
  if (!input) {
    throw new Error("No input provided");
  }

  const [plateauCoordinates, roverStart] = input.split("\n");

  if (!roverStart) {
    throw new Error("Rover starting position not provided");
  }

  const [x, y] = plateauCoordinates.split(" ");
  const plateauUpperRight = {
    x: parseInt(x),
    y: parseInt(y),
  };

  if (!isValidCoordinates(plateauUpperRight)) {
    throw new Error("Invalid plateau coordinates");
  }

  // Add 1 to width and height as the first line of input signifies the
  // rightmost and uppermost coordinates of the plateau, not the width and height.
  const plateau = createPlateau(
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

  const rover: Rover = {
    coordinates: roverStartPosition,
    orientation: roverOrientation,
  };

  launchRover(plateau, rover);

  return plateau;
};

function isOrientation(input: string): input is Rover["orientation"] {
  return ["N", "S", "E", "W"].includes(input);
}

function isValidCoordinates(input: Coordinates): input is Coordinates {
  return input.x > 0 && input.y > 0;
}

// Some scaffold for handling instructions

// export const executeInstruction(instruction: RoverInstruction) {

// function isInstruction(input: string): input is RoverInstruction {
//     return ['L', 'R', 'M'].includes (input);
//     return RoverInstruction.includes (input); // does this work?
// }

// const someInstruction = getInstruction ();

// if (isInstruction(someInstruction)) {
//   executeInstruction (someInstruction);
// }
