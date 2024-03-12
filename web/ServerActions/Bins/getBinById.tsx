"use server";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});

export async function getBinById(id: string) {
	const client = await pool.connect();

	try {
		const { rows : bins } = await client.query(
			`
				SELECT
					b.id as bin_id,
					l.level_order,
					c.column_order,
					l.height AS bin_height,
					c.width AS bin_width,
					z.length AS bin_length,
					p.id as product_id,
					p.name
				FROM bin b
				LEFT JOIN product p ON p.id = b.product_id
				JOIN level l ON b.level_id = l.id
				JOIN zone_column c ON b.column_id = c.id
				JOIN zone z ON l.zone_id = z.id AND c.zone_id = z.id
				WHERE bin_id = $1;
			`, [id]
		);

        return bins;
	} catch (error: any) {
		return null;
	} finally {
		client.release();
	}
}