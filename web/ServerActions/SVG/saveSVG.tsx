"use server";
import fs from "fs";
import path from "path";

export async function saveSVG(svgContent: string) {
	fs.writeFileSync(path.join(process.cwd(), "public", "saved.svg"), svgContent);
}
