const blessed = require("blessed");
import { Rover, moveRover, turnRover } from "./rover";
import { isOrientation } from "./index";
import { Plateau, createPlateau, updatePlateau } from "./plateau";

const display = blessed.screen({
  smartCSR: true,
  title: "Map Display",
});

const orientationSymbols = {
  N: "N",
  E: "E",
  S: "S",
  W: "W",
  active: {
    N: "^",
    E: ">",
    S: "v",
    W: "<",
  },
};

display.key(["escape", "q", "C-c"], () => process.exit(0));

function promptUser(question: string, defaultValue = ""): Promise<string> {
  const getInput = blessed.prompt({
    border: "line",
    height: "shrink",
    width: "half",
    top: "center",
    left: "center",
    label: " {blue-fg}Question{/blue-fg} ",
    tags: true,
    keys: true,
    vi: true,
    hidden: false,
  });
  return new Promise((resolve, reject) => {
    display.append(getInput);
    getInput.input(question, defaultValue, (err: any, value: any) => {
      if (err) reject(err);
      else resolve(value);
      display.remove(getInput);
      display.render();
    });
  });
}

function stringifyMap(map: any) {
  const mapString = map.slice().reverse();
  return mapString.map((row: string[]) => row.join(" ")).join("\n");
}

export async function main() {
  const plateauTopRight = await promptUser("Plateau top right (x y)");

  const numberOfRovers = parseInt(await promptUser("Number of rovers"));
  const rovers: Rover[] = [];

  for (let i = 0; i < numberOfRovers; i++) {
    const roverCoordinates = (
      await promptUser(`Rover ${i + 1} position (x y orientation e.g. 1 2 N)`)
    ).split(" ");

    if (!isOrientation(roverCoordinates[2])) {
      throw new Error("Invalid orientation");
    }

    const rover: Rover = {
      coordinates: {
        x: parseInt(roverCoordinates[0]),
        y: parseInt(roverCoordinates[1]),
      },
      orientation: roverCoordinates[2],
    };
    rovers.push(rover);
  }

  let map = createPlateau(
    parseInt(plateauTopRight.split(" ")[0]) + 1,
    parseInt(plateauTopRight.split(" ")[1]) + 1
  );

  rovers.forEach((rover) => {
    map = updatePlateau(map, rover);
  });

  const mapWidth = map[0].length * 2 + 2;
  const mapHeight = map.length + 2;

  let mapBox = blessed.box({
    top: "center",
    left: "center",
    label: "Mars Plateau",
    width: mapWidth,
    height: mapHeight,
    content: stringifyMap(map),
    border: {
      type: "line",
    },
    style: {
      fg: "red",
      bg: "black",
      border: {
        fg: "red",
      },
    },
  });

  let activeIndex = 0;
  updateRoverSymbol(map, rovers, activeIndex, mapBox);

  let controlBox = blessed.text({
    top: "center",
    left: 10,
    label: "Controls",
    padding: 2,
    content: `Press
  'q' to quit
  'l' to launch another rover
  's' to switch rovers
    `,
    border: {
      type: "line",
    },
    style: {
      fg: "green",
      bg: "black",
      border: {
        fg: "#f0f0f0",
      },
    },
  });

  display.append(controlBox);
  display.append(mapBox);
  mapBox.focus();
  display.render();

  display.key(
    ["up", "down", "left", "right", "l", "s"],
    (ch: any, key: any) => {
      switch (key.name) {
        case "up":
          let roverPreviousPosition = { ...rovers[activeIndex] };
          let roverNewPosition = moveRover(map, rovers[activeIndex]);
          map = updatePlateau(map, roverNewPosition, roverPreviousPosition);
          rovers[activeIndex] = roverNewPosition;
          updateRoverSymbol(map, rovers, activeIndex, mapBox);
          mapBox.setContent(stringifyMap(map));
          display.render();
          break;
        case "left":
          turnRover(map, rovers[activeIndex], "L");
          map = updatePlateau(map, rovers[activeIndex]);
          updateRoverSymbol(map, rovers, activeIndex, mapBox);
          mapBox.setContent(stringifyMap(map));
          display.render();
          break;
        case "right":
          turnRover(map, rovers[activeIndex], "R");
          map = updatePlateau(map, rovers[activeIndex]);
          updateRoverSymbol(map, rovers, activeIndex, mapBox);
          mapBox.setContent(stringifyMap(map));
          display.render();
          break;
        case "s":
          activeIndex = (activeIndex + 1) % rovers.length;
          rovers[activeIndex] = rovers[activeIndex];
          updateRoverSymbol(map, rovers, activeIndex, mapBox);
          mapBox.setContent(stringifyMap(map));
          display.render();
          break;
        case "l":
          const launchPrompt = blessed.prompt({
            border: "line",
            height: "shrink",
            width: "half",
            top: "center",
            left: "center",
            label: " {blue-fg}Question{/blue-fg} ",
            tags: true,
            keys: true,
            vi: true,
            hidden: false,
          });
          display.append(launchPrompt);
          launchPrompt.input(
            "Launch position (x y orientation)",
            "",
            (err: any, value: any) => {
              if (value) {
                const [x, y, orientation] = value.split(" ");
                const newRover: Rover = {
                  coordinates: {
                    x: parseInt(x),
                    y: parseInt(y),
                  },
                  orientation: orientation,
                };
                rovers.push(newRover);
                map = updatePlateau(map, newRover);
                updateRoverSymbol(map, rovers, activeIndex, mapBox);
                mapBox.setContent(stringifyMap(map));
                display.render();
              }
              display.remove(launchPrompt);
              display.render();
            }
          );
          break;
      }
    }
  );
}

function updateRoverSymbol(
  map: Plateau,
  rovers: Rover[],
  activeIndex: number,
  mapBox: any
) {
  for (let rover of rovers) {
    map[rover.coordinates.y][rover.coordinates.x] =
      orientationSymbols[rover.orientation];
  }

  const activeSymbol =
    orientationSymbols.active[rovers[activeIndex].orientation];
  map[rovers[activeIndex].coordinates.y][rovers[activeIndex].coordinates.x] =
    activeSymbol;

  mapBox.setContent(stringifyMap(map));
  display.render();
}
