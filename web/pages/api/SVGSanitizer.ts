// pages/api/sanitize.ts
import { NextApiRequest, NextApiResponse } from 'next';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export default async function sanitize(req: NextApiRequest, res: NextApiResponse) {
  const { svg } = req.body;

  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);

  const cleanSVG = DOMPurify.sanitize(svg).replace(/\s/g, '');

  res.status(200).json({cleanSVG});
}