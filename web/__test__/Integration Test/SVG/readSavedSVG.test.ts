import fs from "fs";
import path from "path";
import { readSavedSVG } from "@/ServerActions/SVG/readSavedSVG";


jest.mock("fs", () => ({
    readFileSync: jest.fn(),
  }));


describe("readSavedSVG", () => {
  it("should read SVG content from a file", async () => {
    const svgContent = "<svg></svg>";

    (fs.readFileSync as jest.Mock).mockReturnValue(svgContent);

    const result = await readSavedSVG();

    const expectedPath = path.join(process.cwd(), "public", "saved.svg");
    expect(fs.readFileSync).toHaveBeenCalledWith(expectedPath);
    expect(result).toEqual(svgContent);
  });
});
