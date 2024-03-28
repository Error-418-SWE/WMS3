import { getAllEmptyZones } from "@/ServerActions/Zones/getAllEmptyZones";

jest.mock("pg", () => {
	const binJson = {
		bin_id: 1,
		level_order: 1,
		column_order: 1,
		bin_height: 1,
		bin_length: 1,
		bin_width: 1,
		product_id: 1,
		product: null,
	};
	const zoneJson = {
		id: 1,
		xcoordinate: 1,
		ycoordinate: 1,
		height: 1,
		length: 1,
		width: 1,
		orientation: true,
	};
	const mClient = {
		release: jest.fn(),
		query: jest
			.fn()
			.mockResolvedValueOnce({ rows: [zoneJson] }) // zone
			.mockResolvedValueOnce({ rows: [binJson] }) // bin
			.mockResolvedValueOnce({ rows: [{ id: 1, zone_id: 1, width: 1 }] }) // column
			.mockResolvedValueOnce({ rows: [{ id: 1, zone_id: 1, height: 1 }] }), // levels
	};
	const mPool = {
		connect: jest.fn().mockResolvedValue(mClient),
		query: jest.fn(),
		release: jest.fn(),
	};
	return { Pool: jest.fn(() => mPool) };
});

describe("getAllEmptyZones", () => {
	it("should get all zones as empty", async () => {
		const actualValue = await getAllEmptyZones();
		expect(actualValue).toEqual([
			{
				id: 1,
				xcoordinate: 1,
				ycoordinate: 1,
				height: 1,
				length: 1,
				width: 1,
				bins: [
					{
						bin_id: 1,
						level_order: 1,
						column_order: 1,
						bin_height: 1,
						bin_length: 1,
						bin_width: 1,
						product_id: 1,
						product: null,
					},
				],
				orientation: true,
			},
		]);
	});
});
