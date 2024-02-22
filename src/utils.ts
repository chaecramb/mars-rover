export function stringifyMap(map: any) {
  const mapString = map.slice().reverse();
  return mapString.map((row: string[]) => row.join(" ")).join("\n");
}
