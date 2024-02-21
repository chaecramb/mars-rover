import { Rover, ORIENTATION_SYMBOLS } from "./rover";

export type Plateau = string[][];

export type Coordinates = {
  x: number;
  y: number;
};

export const createPlateau = (width: number, height: number): Plateau => {
  if (width < 1 || height < 1) {
    throw new Error("Width and height must be at least 1");
  }

  let plateau = [];
  for (let row = 0; row < height; row++) {
    let line = [];
    for (let col = 0; col < width; col++) {
      line.push(".");
    }
    plateau.push(line);
  }
  return plateau;
};

export const isPassableTerrain = (
  coordinates: Coordinates,
  plateau: Plateau
) => {
  return (
    plateau[coordinates.y] && plateau[coordinates.y][coordinates.x] === "."
  );
};

export const printPlateau = (plateau: Plateau) => {
  const height = plateau.length;
  const width = plateau[0].length;
  for (let y = height - 1; y >= 0; y--) {
    console.log(plateau[y].join(""));
  }
};

export const updatePlateau = (
  plateau: Plateau,
  roverPreviousPosition: Rover,
  roverNewPosition: Rover
): Plateau => {
  plateau[roverPreviousPosition.coordinates.y][
    roverPreviousPosition.coordinates.x
  ] = ".";
  plateau[roverNewPosition.coordinates.y][roverNewPosition.coordinates.x] =
    ORIENTATION_SYMBOLS[roverNewPosition.orientation];
  return plateau;
};
