// sanitize.test.ts
import { NextApiRequest, NextApiResponse } from 'next';
import sanitize from '../pages/api/SVGSanitizer';
import { createMocks } from 'node-mocks-http';
import * as fs from 'fs';

//TEST CON SVG FORNITO DA DOMPURIFY
describe('Sanitize SVG API', () => {
  it('should sanitize SVG (basic example)', async () => {
    const dirtySVG = fs.readFileSync(`${__dirname}/svg_test_files/testDompurify/dompurify_NOT_sanitized.svg`, 'utf-8');
    const expectedCleanSVG = fs.readFileSync(`${__dirname}/svg_test_files/testDompurify/dompurify_sanitized.svg`, 'utf-8').replace(/\s/g, '');    

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { svg: dirtySVG },
    });

    await sanitize(req, res);
    expect(res._getJSONData().cleanSVG).toEqual(expectedCleanSVG);
  });
});

//TEST CON SVG DI SANMARCO INFORMATICA
describe('Sanitize SVG API', () => {
    it('should sanitize SVG (Sanmarco Informatica\'s example)', async () => {
      const dirtySVG = fs.readFileSync(`${__dirname}/svg_test_files/testSanmarcoInformatica/materiaPrima_NOT_sanitized.svg`, 'utf-8');
      const expectedCleanSVG = fs.readFileSync(`${__dirname}/svg_test_files/testSanmarcoInformatica/materiaPrima_sanitized.svg`, 'utf-8').replace(/\s/g, '');    
  
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'POST',
        body: { svg: dirtySVG },
      });
  
      await sanitize(req, res);
      expect(res._getJSONData().cleanSVG).toEqual(expectedCleanSVG);
    });
});