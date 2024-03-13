import fs from 'fs';
import path from 'path';
import { readSavedSVG } from '@/ServerActions/SVG/readSavedSVG'; // replace with your actual module


jest.mock('fs', () => ({
    readFileSync: jest.fn(),
  }));


describe('readSavedSVG', () => {
  it('should read SVG content from a file', async () => {
    const svgContent = '<svg></svg>'; // replace with your actual SVG content

    (fs.readFileSync as jest.Mock).mockReturnValue(svgContent);

    const result = await readSavedSVG();

    const expectedPath = path.join(process.cwd(), 'public', 'saved.svg');
    expect(fs.readFileSync).toHaveBeenCalledWith(expectedPath);
    expect(result).toEqual(svgContent);
  });
});

  
  describe('readSavedSVG', () => {
    it('should handle errors', async () => {
      const error = new Error('File read error');
  
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw error;
      });
  
      console.error = jest.fn();
  
      const result = await readSavedSVG();
  
      expect(console.error).toHaveBeenCalledWith('Error saving SVG:', error);
      expect(result).toEqual("");
    });
  });
