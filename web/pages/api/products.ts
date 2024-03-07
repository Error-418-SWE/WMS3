import { Pool } from "pg";
import { NextApiRequest, NextApiResponse } from "next";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});

export default async function getProducts(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = await pool.connect();

	try {
		const { rows: products } = await client.query(`
            SELECT p.*, array_agg(c.name) as categories
            FROM product p
            LEFT JOIN categorize cz ON cz.product_id = p.id
            LEFT JOIN category c ON c.id = cz.category_id
            GROUP BY p.id;
        `);
        
        res.status(200).json(products);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	} finally {
		client.release();
	}
}

