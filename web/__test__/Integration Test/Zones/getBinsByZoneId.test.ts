import { getBinsByZoneId } from "@/ServerActions/Zones/getBinsByZoneId"; 

jest.mock("pg", () => {
	const bins = [
		{
			bin_id: 1,
			level_order: 1,
			column_order: 1,
			bin_height: 1,
			bin_width: 1,
			bin_length: 1,
			product_id: 1,
			product: null,
		},
		{
			bin_id: 1,
			level_order: 1,
			column_order: 1,
			bin_height: 1,
			bin_width: 1,
			bin_length: 1,
			product_id: 1,
			product: {
				id: 1,
				name: "prodotto",
				weight: 1,
				length: 1,
				width: 1,
				height: 1,
				categories: ["category"],
			},
		},
	];

	const mClient = {
		release: jest.fn(),
		query: jest.fn().mockResolvedValueOnce({ rows: bins }),
	};
	const mPool = {
		connect: jest.fn().mockResolvedValue(mClient),
	};
	return { Pool: jest.fn(() => mPool) };
});

describe("getBinsByZoneId", () => {
	it("should return bins for a given zone id", async () => {
		const zoneId = 1;
		const actualValue = await getBinsByZoneId(zoneId);
		expect(actualValue).toEqual([
            {
                bin_id: 1,
                level_order: 1,
                column_order: 1,
                bin_height: 1,
                bin_width: 1,
                bin_length: 1,
                product_id: 1,
                product: null,
            },
            {
                bin_id: 1,
                level_order: 1,
                column_order: 1,
                bin_height: 1,
                bin_width: 1,
                bin_length: 1,
                product_id: 1,
                product: {
                    id: 1,
                    name: "prodotto",
                    weight: 1,
                    length: 1,
                    width: 1,
                    height: 1,
                    categories: ["category"],
                },
            },
		]);
	});
});
