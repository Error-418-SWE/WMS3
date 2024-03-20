"use server";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});

export default async function getAllCategories() : Promise<string[]> {
	const client = await pool.connect();

	try {
		const { rows: categories } = await client.query(
			"SELECT c.name\n" +
			"FROM category c;"
		);

		return categories.map((category: any) => category.name)
	} catch (error: any) {
		return [];
	} finally {
		client.release();
	}
}