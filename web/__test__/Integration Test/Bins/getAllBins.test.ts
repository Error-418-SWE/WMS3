import { Pool } from "pg";
import { getAllBins } from "@/ServerActions/Bins/getAllBins";

jest.mock("pg", () => {
	const mClient = {
		query: jest.fn(),
		release: jest.fn(),
	};
	const mPool = {
		connect: jest.fn(() => Promise.resolve(mClient)),
	};
	return { Pool: jest.fn(() => mPool) };
});

describe("getAllBins", () => {
	let pool: any;
	const query =
		"SELECT\n" +
		"	b.id as bin_id,\n" +
		"	l.level_order,\n" +
		"	c.column_order,\n" +
		"	l.height AS bin_height,\n" +
		"	c.width AS bin_width,\n" +
		"	z.length AS bin_length,\n" +
		"	p.id as product_id,\n" +
		"	p.name\n" +
		"FROM bin b\n" +
		"LEFT JOIN product p ON p.id = b.product_id\n" +
		"JOIN level l ON b.level_id = l.id\n" +
		"JOIN zone_column c ON b.column_id = c.id\n" +
		"JOIN zone z ON l.zone_id = z.id AND c.zone_id = z.id";

	beforeEach(() => {
		pool = new Pool();
	});

	it("should get all bins", async () => {
		const bins = [
			{
				bin_id: "1",
				level_order: 1,
				column_order: 1,
				bin_height: 1,
				bin_length: 1,
				bin_width: 1,
				product_id: 1,
				name: "prodotto",
			},
		];
		const client = await pool.connect();
		client.query.mockResolvedValueOnce({ rows: bins });

		const result = await getAllBins();

		expect(result).toEqual(bins);
		expect(client.query).toHaveBeenCalledWith(query);
	});

	it("should return null if there is an error", async () => {
		const client = await pool.connect();
		client.query.mockImplementation(() =>
			Promise.reject(new Error("Database error"))
		);

		const result = await getAllBins();

		expect(result).toBeNull();
		await expect(client.query()).rejects.toThrow("Database error");
	});
});
