import fs from "fs";
import path from "path";
import { saveSVG } from "@/ServerActions/SVG/saveSVG";

jest.mock("fs");

describe("saveSVG", () => {
  it("should save SVG content to a file", async () => {
    const svgContent = "<svg></svg>";

    await saveSVG(svgContent);

    const expectedPath = path.join(process.cwd(), "public", "saved.svg");
    expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, svgContent);
  });
});

jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
}));
