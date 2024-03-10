import { Pool } from "pg";
import { NextApiRequest, NextApiResponse } from "next";

const pool = new Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
});

export default async function getBins(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = await pool.connect();

	try {
		const { rows: bins } = await client.query(`
            SELECT * FROM bin;
        `);
        
        res.status(200).json(bins);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	} finally {
		client.release();
	}
}
