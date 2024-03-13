"use server";

import { Pool } from "pg";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});
export async function getZoneById(id: string) {
    const client = await pool.connect();

    try {
        // Retrieve zone
        const { rows: zones } = await client.query(`
            SELECT * FROM zone WHERE id = $1;
        `, [id]);

        if (zones.length === 0) {
            return null; // No zone found with the given ID
        }

        const zone = zones[0];

        // Retrieve bins for the zone
        const { rows: bins } = await client.query(
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
                WHERE z.id = $1;
            `,
            [zone.id]
        );

        zone.bins = bins;

        // Retrieve product for each bin
        for (const bin of zone.bins) {
            if (bin.product_id) {
                const { rows: product } = await client.query(`
                    SELECT p.id, p.*, array_agg(c.name) as categories
                    FROM product p
                    LEFT JOIN categorize cz ON cz.product_id = p.id
                    LEFT JOIN category c ON c.id = cz.category_id
                    WHERE p.id = $1
                    GROUP BY p.id;`,
                    [bin.product_id]);

                if (product.length > 0) {
                    bin.product = product[0];
                } else {
                    bin.product = null;
                }
            } else {
                bin.product = null;
            }
        }

        // Calculate zone width and height
        const { rows: zoneColumns } = await client.query(
            `SELECT * FROM zone_column WHERE zone_id = $1;`,
            [zone.id]
        );
        zone.width = zoneColumns.reduce((sum, column) => sum + column.width, 0);

        const { rows: zoneLevels } = await client.query(
            `SELECT * FROM level WHERE zone_id = $1;`,
            [zone.id]
        );
        zone.height = zoneLevels.reduce((sum, level) => sum + level.height, 0);

        return zone;
    } catch (error: any) {
        return null;
    } finally {
        client.release();
    }
}
