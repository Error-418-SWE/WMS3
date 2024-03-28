import SVGSanitizer from "@/ServerActions/SVG/SVGSanitize";
import * as fs from "fs";
import { JSDOM } from "jsdom";
import { exit } from "process";

const dom = new JSDOM();
const parser = new dom.window.DOMParser();

//TEST CON SVG FORNITO DA DOMPURIFY
describe("Sanitize SVG API", () => {
	it("should sanitize SVG (basic example)", async () => {
		const dirtySVG = fs.readFileSync(
			`${__dirname}/svg_test_files/testDompurify/dompurify_NOT_sanitized.svg`,
			"utf-8",
		);
		const expectedCleanSVG = fs.readFileSync(
			`${__dirname}/svg_test_files/testDompurify/dompurify_sanitized.svg`,
			"utf-8",
		);

		const response = await SVGSanitizer(dirtySVG);

		if (response) {
			const outputDoc = parser.parseFromString(response, "image/svg+xml");
			const expectedDoc = parser.parseFromString(
				expectedCleanSVG,
				"image/svg+xml",
			);
			expect(
				outputDoc.documentElement.isEqualNode(expectedDoc.documentElement),
			).toBe(true);
		} else {
			exit(1);
		}
	});
});

//TEST CON SVG DI SANMARCO INFORMATICA

describe("Sanitize SVG API", () => {
	it("should sanitize SVG (Sanmarco Informatica's example)", async () => {
		const dirtySVG = fs.readFileSync(
			`${__dirname}/svg_test_files/testSanmarcoInformatica/materiaPrima_NOT_sanitized.svg`,
			"utf-8",
		);
		const expectedCleanSVG = fs.readFileSync(
			`${__dirname}/svg_test_files/testSanmarcoInformatica/materiaPrima_sanitized.svg`,
			"utf-8",
		);

		const response = (await SVGSanitizer(dirtySVG)) as string;

		const outputDoc = parser.parseFromString(response, "image/svg+xml");
		const expectedDoc = parser.parseFromString(
			expectedCleanSVG,
			"image/svg+xml",
		);
		expect(
			outputDoc.documentElement.isEqualNode(expectedDoc.documentElement),
		).toBe(true);
	});
});
