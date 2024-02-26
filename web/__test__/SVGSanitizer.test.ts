// sanitize.test.ts
import { NextApiRequest, NextApiResponse } from 'next';
import SVGSanitizer from '../pages/api/SVGSanitizer';
import { createMocks } from 'node-mocks-http';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';

//TEST CON SVG FORNITO DA DOMPURIFY
describe('Sanitize SVG API', () => {
  it('should sanitize SVG (basic example)', async () => {
    const dirtySVG = fs.readFileSync(`${__dirname}/svg_test_files/testDompurify/dompurify_NOT_sanitized.svg`, 'utf-8');
    const expectedCleanSVG = fs.readFileSync(`${__dirname}/svg_test_files/testDompurify/dompurify_sanitized.svg`, 'utf-8');    

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { svg: dirtySVG },
    });

    await SVGSanitizer(req, res);

    const dom = new JSDOM();
    const parser = new dom.window.DOMParser();
    const outputDoc = parser.parseFromString(res._getJSONData().cleanSVG, 'image/svg+xml');
    const expectedDoc = parser.parseFromString(expectedCleanSVG, 'image/svg+xml');
    expect(outputDoc.documentElement.isEqualNode(expectedDoc.documentElement)).toBe(true);
  });
});

//TEST CON SVG DI SANMARCO INFORMATICA

describe('Sanitize SVG API', () => {
    it('should sanitize SVG (Sanmarco Informatica\'s example)', async () => {
    const dirtySVG = fs.readFileSync(`${__dirname}/svg_test_files/testSanmarcoInformatica/materiaPrima_NOT_sanitized.svg`, 'utf-8');
    const expectedCleanSVG = fs.readFileSync(`${__dirname}/svg_test_files/testSanmarcoInformatica/materiaPrima_sanitized.svg`, 'utf-8');    
  
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { svg: dirtySVG },
    });
  
    await SVGSanitizer(req, res);
    const dom = new JSDOM();
    const parser = new dom.window.DOMParser();
    const outputDoc = parser.parseFromString(res._getJSONData().cleanSVG, 'image/svg+xml');
    const expectedDoc = parser.parseFromString(expectedCleanSVG, 'image/svg+xml');
    fs.writeFileSync(`out.svg`, res._getJSONData().cleanSVG, 'utf-8');
    expect(outputDoc.documentElement.isEqualNode(expectedDoc.documentElement)).toBe(true);
  });
});