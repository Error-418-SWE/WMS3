"use server";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});

export default async function getProductById(id: string) {
	const client = await pool.connect();

	try {
		const { rows: product } = await client.query(
			"SELECT p.*, array_agg(c.name) as categories\n" +
			"FROM product p\n" +
			"LEFT JOIN categorize cz ON cz.product_id = p.id\n" +
			"LEFT JOIN category c ON c.id = cz.category_id\n" +
			"WHERE p.id = $1\n" +
			"GROUP BY p.id;",
			[id]
		);

		if (product.length > 0) {
			return product[0];
		} else {
			return -1;
		}
	} catch (error: any) {
		return null;
	} finally {
		client.release();
	}
}

