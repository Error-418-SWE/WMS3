"use server";
import fs from "fs";
import path from "path";

export async function readSavedSVG() {
	try {
		const svg_content = fs.readFileSync(
			path.join(process.cwd(), "public", "saved.svg"),
		);
		return svg_content.toString();
	} catch (err) {
		return "";
	}
}
