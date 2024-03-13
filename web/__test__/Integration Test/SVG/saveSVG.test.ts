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

describe("saveSVG", () => {
  it("should handle errors", async () => {
    const svgContent = "<svg></svg>";
    const error = new Error("File write error");

    (fs.writeFileSync as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    console.error = jest.fn();

    await saveSVG(svgContent);

    expect(console.error).toHaveBeenCalledWith("Error saving SVG:", error);
  });
});
