import { Plateau, isPassableTerrain } from "./plateau";
import { isValidCoordinates } from "./index";

export type Rover = {
  coordinates: {
    x: number;
    y: number;
  };
  orientation: "N" | "S" | "E" | "W";
};

const ORIENTATION_SYMBOLS = {
  N: "^",
  S: "V",
  E: ">",
  W: "<",
};

export type RoverInstruction = "L" | "R" | "M";

export const launchRover = (plateau: Plateau, rover: Rover) => {
  plateau[rover.coordinates.y][rover.coordinates.x] =
    ORIENTATION_SYMBOLS[rover.orientation];
  return plateau;
};

export const moveRover = (plateau: Plateau, rover: Rover): Plateau => {
  let newCoordinates = { x: rover.coordinates.x, y: rover.coordinates.y };

  switch (rover.orientation) {
    case "N":
      newCoordinates.y++;
      break;
    case "S":
      newCoordinates.y--;
      break;
    case "E":
      newCoordinates.x++;
      break;
    case "W":
      newCoordinates.x--;
      break;
  }

  if (isPassableTerrain(newCoordinates, plateau)) {
    plateau[rover.coordinates.y][rover.coordinates.x] = ".";
    rover.coordinates = newCoordinates;
    plateau[rover.coordinates.y][rover.coordinates.x] =
      ORIENTATION_SYMBOLS[rover.orientation];
  }
  return plateau;
};
