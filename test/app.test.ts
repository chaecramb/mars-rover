import { launchMission, createPlateau, landRover } from "../src/app";

describe("launchMission", () => {
  it("should print 'Hello, Mars!'", () => {
    expect(launchMission()).toBe("Hello, Mars!");
  });
});

describe("createPlateau", () => {
  it("should return an object with width and height properties", () => {
    const expected = Array.from({ length: 10 }, () => Array(10).fill("."));

    const actual = createPlateau(10, 10);

    expect(actual).toEqual(expected);
  });
});

describe("landRover", () => {
  it("should return an object with width and height properties", () => {
    const plateau = createPlateau(10, 10);
    let expected = Array.from({ length: 10 }, () => Array(10).fill("."));
    expected[0][0] = "<";

    const actual = landRover(plateau, { x: 0, y: 0 }, "<");

    expect(actual).toEqual(expected);
  });
});
