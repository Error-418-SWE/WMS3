import { Pool } from "pg";
import getProductById from "@/ServerActions/Products/getProductById";

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

describe("getProductById", () => {
	let pool: any;
	const query =
		"SELECT p.*, array_agg(c.name) as categories\n" +
		"FROM product p\n" +
		"LEFT JOIN categorize cz ON cz.product_id = p.id\n" +
		"LEFT JOIN category c ON c.id = cz.category_id\n" +
		"WHERE p.id = $1\n" +
		"GROUP BY p.id;";

	beforeEach(() => {
		pool = new Pool();
	});

	it("should get product by id", async () => {
		const product = {
			id: "1",
			name: "product1",
			categories: ["category1", "category2"],
		};
		const client = await pool.connect();
		client.query.mockResolvedValueOnce({ rows: [product] });

		const result = await getProductById("1");

		expect(result).toEqual(product);
		expect(client.query).toHaveBeenCalledWith(
			query,
			["1"]
		);
	});

	it("should return -1 if product not found", async () => {
		const client = await pool.connect();
		client.query.mockResolvedValueOnce({ rows: [] });

		const result = await getProductById("1");

		expect(result).toBe(-1);
		expect(client.query).toHaveBeenCalledWith(
			query,
			["1"]
		);
	});

	it("should return null if there is an error", async () => {
		const client = await pool.connect();
		client.query.mockImplementation(() =>
			Promise.reject(new Error("Database error"))
		);

		const result = await getProductById("1");

		expect(result).toBeNull();
		expect(client.query).toHaveBeenCalledWith(
			query,
			["1"]
		);
	});
});
