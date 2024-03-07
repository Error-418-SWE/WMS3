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
		const { rows: product } = await client.query(
			`
        SELECT * FROM product WHERE id = $1;
    `,
			[req.query.id]
		);

		if (product.length > 0) {
			res.status(200).json(product[0]);
		} else {
			res.status(404).json({ error: "Product not found" });
		}
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	} finally {
		client.release();
	}
}
