import { Floor } from "@/model/floor";

describe("Floor", () => {
	let floor: Floor;

	beforeEach(() => {
		floor = new Floor(10, 20, "<svg></svg>");
	});

	it("returns the correct length", () => {
		expect(floor.getLength()).toBe(10);
	});

	it("returns the modified length", () => {
		floor.setLength(25);
		expect(floor.getLength()).toBe(25);
	});

	it("returns the correct width", () => {
		expect(floor.getWidth()).toBe(20);
	});

	it("returns the modified width", () => {
		floor.setWidth(30);
		expect(floor.getWidth()).toBe(30);
	});

	it("returns the correct SVG", () => {
		expect(floor.getSVG().getString()).toBe("<svg></svg>");
	});

	it("returns the correct SVG length", () => {
		expect(floor.getSVG().getLength()).toBe(10);
	});

	it("returns the modified SVG length", () => {
		floor.getSVG().setLength(30);
		expect(floor.getSVG().getLength()).toBe(30);
	});

	it("returns the correct SVG width", () => {
		expect(floor.getSVG().getWidth()).toBe(20);
	});

	it("returns the modified SVG width", () => {
		floor.getSVG().setWidth(5);
		expect(floor.getSVG().getWidth()).toBe(5);
	});

	it("returns the cloned floor", () => {
		floor.getSVG().setLength(30);
		floor.getSVG().setWidth(5);
		const floor2 = floor.clone();
		expect(floor2.getLength()).toBe(10);
		expect(floor2.getWidth()).toBe(20);
		expect(floor2.getSVG().getString()).toBe("<svg></svg>");
		expect(floor2.getSVG().getLength()).toBe(30);
		expect(floor2.getSVG().getWidth()).toBe(5);
	});
});
