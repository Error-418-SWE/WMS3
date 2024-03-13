import { Zone } from "@/model/zone";
import { Bin } from "@/model/bin";
import { Product } from "@/model/product";

describe("Zone", () => {
	let zone: Zone;
	let bins: Bin[];

	beforeEach(() => {
		//Zone with 4 levels, 4 columns and 16 bins
		//max column and level used is 3
		bins = [
			new Bin("1", 0, 0, 1, 1, 1, null),
			new Bin("2", 0, 1, 2, 2, 2, null),
			new Bin("3", 0, 2, 3, 3, 3, new Product(1, "prodotto", 1, 1, 1, 1, ["categoria"])),
			new Bin("4", 0, 3, 4, 4, 4, null),

			new Bin("5", 1, 0, 1, 1, 1, null),
			new Bin("7", 1, 1, 3, 3, 3, new Product(2, "prodotto2", 2, 2, 2, 2, ["categoria2"])),
			new Bin("6", 1, 2, 2, 2, 2, null),
			new Bin("8", 1, 3, 4, 4, 4, null),

			new Bin("9",  2, 0, 1, 1, 1, new Product(3, "prodotto3", 3, 3, 3, 3, ["categoria3"])),
			new Bin("10", 2, 1, 2, 2, 2, null),
			new Bin("11", 2, 2, 3, 3, 3, null),
			new Bin("12", 2, 3, 4, 4, 4, null),

			new Bin("13", 3, 0, 1, 1, 1, null),
			new Bin("14", 3, 1, 2, 2, 2, null),
			new Bin("15", 3, 2, 3, 3, 3, null),
			new Bin("16", 3, 3, 4, 4, 4, null),
		];
		zone = new Zone(1, 1, 1, 1, 1, 1, bins, true);
	});

	it("returns the correct id", () => {
		expect(zone.getId()).toBe(1);
	});

	it("returns the correct xcoordinate", () => {
		expect(zone.getXcoordinate()).toBe(1);
	});

	it("returns the correct ycoordinate", () => {
		expect(zone.getYcoordinate()).toBe(1);
	});

	it("returns the correct height", () => {
		expect(zone.getHeight()).toBe(1);
	});

	it("returns the correct length", () => {
		expect(zone.getLength()).toBe(1);
	});

	it("returns the correct width", () => {
		expect(zone.getWidth()).toBe(1);
	});

	it("returns the correct bins", () => {
		expect(zone.getBins()).toEqual(bins);
	});

	it("returns the correct orientation", () => {
		expect(zone.getOrientation()).toBe(true);
	});

	it("returns the correct bin when getBin is called with a valid id", () => {
		const binId = "1";
		const bin = zone.getBin(binId);
		expect(bin).toBeDefined();
		expect(bin?.getId()).toBe(binId);
	});

	it("returns undefined when getBin is called with an invalid id", () => {
		const bin = zone.getBin("invalid-id");
		expect(bin).toBeUndefined();
	});

	it("returns the correct levels", () => {
		const levels = zone.getColumns();
		expect(levels.length).toBe(bins.length);
		expect(levels[0].length).toBe(4);
	});

	it("returns the correct columns", () => {
		const columns = zone.getLevels();
		expect(columns.length).toBe(4);
		expect(columns[0].length).toBe(4);
	});

	it("returns the correct max used level", () => {
		const maxUsedLevel = zone.getMaxUsedLevel();
		expect(maxUsedLevel).toBe(2);
	});

	it("returns the correct max used column", () => {
		const maxUsedColumn = zone.getMaxUsedColumn();
		expect(maxUsedColumn).toBe(2);
	});
});
