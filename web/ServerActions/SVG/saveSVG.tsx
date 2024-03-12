"use server"
import fs from 'fs';
import path from 'path';

export async function saveSVG(svgContent: string) {
	try {
		fs.writeFileSync(path.join(process.cwd(), 'public', 'saved.svg'), svgContent);
		console.log('SVG saved successfully');
	} catch (err) {
		console.error('Error saving SVG:', err);
	}
}