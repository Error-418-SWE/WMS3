import { getZoneById } from "@/ServerActions/Zones/getZoneById";

jest.mock("pg", () => {
	const productJson = {
		id: 1,
		name: "prodotto",
		weight: 1,
		length: 1,
		width: 1,
		height: 1,
		categories: ["category"],
	};
	const binJson = {
		bin_id: 1,
		level_order: 1,
		column_order: 1,
		bin_height: 1,
		bin_length: 1,
		bin_width: 1,
		product_id: 1,
        product: productJson
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
			.mockResolvedValueOnce({ rows: [productJson] }) // product
			.mockResolvedValueOnce({ rows: [{ id: 1, zone_id: 1, width: 1 }] }) // column
			.mockResolvedValueOnce({ rows: [{ id: 1, zone_id: 1, height: 1 }] }), // levels
	};
  const mPool = {
    connect: jest.fn().mockResolvedValue(mClient),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe("getZoneById", () => {
  it("should return zone and its bins for a given zone id", async () => {
    const zoneId = "1";
    const actualValue = await getZoneById(zoneId);
    expect(actualValue).toEqual({
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
        ],
        orientation: true,
    });
  });
});
