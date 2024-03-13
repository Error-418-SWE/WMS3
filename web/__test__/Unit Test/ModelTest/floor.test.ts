import { Floor } from "@/model/floor";

describe("Floor", () => {
  let floor: Floor;

  beforeEach(() => {
    floor = new Floor(10, 20, "<svg></svg>");
  });

  it("returns the correct length", () => {
    expect(floor.getLength()).toBe(10);
  });

  it("returns the correct width", () => {
    expect(floor.getWidth()).toBe(20);
  });

  it("returns the correct SVG", () => {
    expect(floor.getSVG()).toBe("<svg></svg>");
  });
});
