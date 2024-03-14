import { Pool } from "pg";
import getAllProducts from "@/ServerActions/Products/getAllProducts";

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

describe("getAllProducts", () => {
	let pool: any;
	const query =
		"SELECT p.*, array_agg(c.name) as categories\n" +
		"FROM product p\n" +
		"LEFT JOIN categorize cz ON cz.product_id = p.id\n" +
		"LEFT JOIN category c ON c.id = cz.category_id\n" +
		"GROUP BY p.id;";

	beforeEach(() => {
		pool = new Pool();
	});

	it("should get all products", async () => {
		const products = [
			{
				id: "1",
				name: "product1",
				categories: ["category1", "category2"],
			},
		];
		const client = await pool.connect();
		client.query.mockResolvedValueOnce({ rows: products });

		const result = await getAllProducts();

		expect(result).toEqual(products);
		expect(client.query).toHaveBeenCalledWith(query);
	});

	it("should return null if there is an error", async () => {
		const client = await pool.connect();
		client.query.mockImplementation(() =>
			Promise.reject(new Error("Database error"))
		);

		const result = await getAllProducts();

		expect(result).toBeNull();
		expect(client.query).toHaveBeenCalledWith(query);
	});
});
