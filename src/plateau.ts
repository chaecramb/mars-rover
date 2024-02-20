export const createPlateau = (width: number, height: number) => {
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
