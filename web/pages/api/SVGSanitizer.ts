// pages/api/SVGSanitizer.ts
import { NextApiRequest, NextApiResponse } from 'next';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export default async function SVGSanitizer(req: NextApiRequest, res: NextApiResponse) {
  const { svg } = req.body;

  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);

  const cleanSVG = DOMPurify.sanitize(svg).replace(/\s/g, '');

  res.status(200).json({cleanSVG});
}

//PER CHIAMARLA
/*
const onFileChange = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
    const svg = event.target.result;

    // Chimata all'API
    const response = await fetch('/api/SVGSanitizer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ svg })
    });

    const data = await response.json();
    const cleanSVG = data.cleanSVG;

    // Da qui si possono utilizzare le informazioni del file SVG
    console.log(cleanSVG);
  };

  reader.readAsText(file);
};

// Nei file delle pages/componenti
// <input type="file" onChange={onFileChange} />
*/