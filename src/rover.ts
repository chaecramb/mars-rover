import { Plateau } from "./plateau";

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
