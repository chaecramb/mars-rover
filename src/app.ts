import { createPlateau } from "./plateau";
import { landRover } from "./missionControl";

export const launchMission = () => {
  return "Hello, Mars!";
};

export const printPlateau = (plateau: string[][]): void => {
  for (let row = 0; row < plateau.length; row++) {
    let line = "";
    for (let col = 0; col < plateau.length; col++) {
      line += plateau[row][col] + " ";
    }
    console.log(line);
  }
};

let plateau = createPlateau(10, 10);
let rover = "<";
plateau = landRover(plateau, { x: 0, y: 0 }, rover);
