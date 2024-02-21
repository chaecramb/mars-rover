import { Plateau, isPassableTerrain } from "./plateau";
import { isValidCoordinates } from "./index";

export type Rover = {
  coordinates: {
    x: number;
    y: number;
  };
  orientation: "N" | "S" | "E" | "W";
};

export const ORIENTATION_SYMBOLS = {
  N: "^",
  S: "V",
  E: ">",
  W: "<",
};

export type RoverInstruction = "L" | "R" | "M";

export const moveRover = (plateau: Plateau, rover: Rover): Rover => {
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
    rover.coordinates = newCoordinates;
  }
  return rover;
};

export const turnRover = (
  plateau: Plateau,
  rover: Rover,
  instruction: RoverInstruction
): Rover => {
  switch (instruction) {
    case "L":
      switch (rover.orientation) {
        case "N":
          rover.orientation = "W";
          break;
        case "S":
          rover.orientation = "E";
          break;
        case "E":
          rover.orientation = "N";
          break;
        case "W":
          rover.orientation = "S";
          break;
      }
      break;
    case "R":
      switch (rover.orientation) {
        case "N":
          rover.orientation = "E";
          break;
        case "S":
          rover.orientation = "W";
          break;
        case "E":
          rover.orientation = "S";
          break;
        case "W":
          rover.orientation = "N";
          break;
      }
      break;
  }

  return rover;
};
