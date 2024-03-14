"use server";

import { Pool } from "pg";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});

export async function getAllZones() {
	const client = await pool.connect();

	try {
		//retrive zones
		const { rows: zones } = await client.query(
			"SELECT * FROM zone;"
		);

		//retrive data for each zone
		for (const zone of zones) {
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
				[zone.id]
			);

			zone.bins = bins;

			//retrive product for each bin
			for (const bin of zone.bins) {
				if (bin.product_id) {
					const { rows: product } = await client.query(
						"SELECT p.id, p.*, array_agg(c.name) as categories\n" +
						"FROM product p\n" +
						"LEFT JOIN categorize cz ON cz.product_id = p.id\n" +
						"LEFT JOIN category c ON c.id = cz.category_id\n" +
						"WHERE p.id = $1\n" +
						"GROUP BY p.id;",
						[bin.product_id]
					);

					if (product.length > 0) {
						bin.product = product[0];
					} else {
						bin.product = null;
					}
				} else {
					bin.product = null;
				}
			}

			//calculate zone width and height
			const { rows: zoneColumns } = await client.query(
				"SELECT * FROM zone_column WHERE zone_id = $1;",
				[zone.id]
			);
			zone.width = zoneColumns.reduce((sum, column) => sum + column.width, 0);

			const { rows: zoneLevels } = await client.query(
				"SELECT * FROM level WHERE zone_id = $1;",
				[zone.id]
			);
			zone.height = zoneLevels.reduce((sum, level) => sum + level.height, 0);
		}

		return zones;
	} catch (error: any) {
		return null;
	} finally {
		client.release();
	}
}
