"use server";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export default async function SVGSanitize(svgContent: string) {
	const window = new JSDOM("").window;
	const DOMPurify = createDOMPurify(window);

	const cleanSVG = DOMPurify.sanitize(svgContent);
	return cleanSVG;
}
