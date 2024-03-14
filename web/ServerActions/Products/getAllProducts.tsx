"use server";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});

export default async function getAllProducts() {
	const client = await pool.connect();

	try {
		const { rows: products } = await client.query(
			"SELECT p.*, array_agg(c.name) as categories\n" +
			"FROM product p\n" +
			"LEFT JOIN categorize cz ON cz.product_id = p.id\n" +
			"LEFT JOIN category c ON c.id = cz.category_id\n" +
			"GROUP BY p.id;"
		);

        return products;
	} catch (error: any) {
		return null;
	} finally {
		client.release();
	}
}


