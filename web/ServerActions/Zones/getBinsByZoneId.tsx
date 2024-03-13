"use server";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});

export async function getBinsByZoneId(id: number
) {
	const client = await pool.connect();

	try {
		const { rows: bins } = await client.query(
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
			"JOIN zone z ON l.zone_id = z.id AND c.zone_id = z.id\n" +
			"WHERE z.id = $1;",
			[id]
		);
		

		return bins;
	} catch (error: any) {
		return null;
	} finally {
		client.release();
	}
}
