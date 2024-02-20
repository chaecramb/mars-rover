export const landRover = (
  plateau: string[][],
  coordinates: { x: number; y: number },
  rover: string
) => {
  plateau[coordinates.y][coordinates.x] = rover;
  return plateau;
};
