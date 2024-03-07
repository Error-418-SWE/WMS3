import { Pool } from "pg";
import { NextApiRequest, NextApiResponse } from "next";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});

export default async function getAllZones(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = await pool.connect();

	try {
        //retrive zones
		const { rows: zones } = await client.query(`
            SELECT * FROM zone;
        `);

        //retrive data for each zone
        for (const zone of zones) {
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
                    WHERE z.id = $1;
                `,
                [zone.id]
            );

            zone.bins = bins;

            //retrive product for each bin
            for (const bin of zone.bins) {              
                if(bin.product_id){
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
                    }else{
                        bin.product = null;
                    }
                }else {
                    bin.product = null;
                }
            }
        
            //calculate zone width and height
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
        }
        
        res.status(200).json(zones);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	} finally {
		client.release();
	}
}