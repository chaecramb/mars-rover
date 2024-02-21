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
