import { launchMission } from "../src/app";

describe("launchMission", () => {
  it("should print 'Hello, Mars!'", () => {
    expect(launchMission()).toBe("Hello, Mars!");
  });
});
