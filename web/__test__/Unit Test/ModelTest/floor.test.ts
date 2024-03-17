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
		expect(floor.getSVG().getString()).toBe("<svg></svg>");
	});

	it("returns the correct SVG length", () => {
		expect(floor.getSVG().getLength()).toBe(10);
	});

	it("returns the modified SVG length", () => {
		floor.getSVG().setLength(20);
		expect(floor.getSVG().getLength()).toBe(20);
	});

	it("returns the correct SVG width", () => {
		expect(floor.getSVG().getWidth()).toBe(20);
	});

	it("returns the modified SVG width", () => {
		floor.getSVG().setWidth(30);
		expect(floor.getSVG().getWidth()).toBe(30);
	});

	it("returns the modified SVG width", () => {
		let floor2 = floor.modifyDimension(25, 35);
		expect(floor2.getLength()).toBe(25);
		expect(floor2.getWidth()).toBe(35);
		expect(floor2.getSVG().getLength()).toBe(10);
		expect(floor2.getSVG().getWidth()).toBe(20);
	});
});
