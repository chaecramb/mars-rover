export const launchMission = () => {
  return "Hello, Mars!";
};

export const createPlateau = (width: number, height: number) => {
  let plateau = [];
  for (let row = 0; row < height; row++) {
    let line = [];
    for (let col = 0; col < width; col++) {
      line.push("..");
    }
    plateau.push(line);
  }
  return plateau;
};

export const printPlateau = (plateau: string[][]): void => {
  for (let row = 0; row < plateau.length; row++) {
    let line = "";
    for (let col = 0; col < plateau.length; col++) {
      line += plateau[row][col];
    }
    console.log(line);
  }
};

let plateau = createPlateau(10, 10);
printPlateau(plateau);
