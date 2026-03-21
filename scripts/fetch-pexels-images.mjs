#!/usr/bin/env node
/**
 * Fetch images from Pexels API and update src/data/images.json
 * Usage: PEXELS_API_KEY=your_key node scripts/fetch-pexels-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'images.json');

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error('Error: PEXELS_API_KEY environment variable is required');
  process.exit(1);
}

const SEARCH_QUERIES = {
  wedding: ['indian wedding ceremony', 'south asian wedding'],
  saree: ['saree silk', 'indian saree woman'],
  lehenga: ['lehenga bridal', 'indian lehenga outfit'],
  bride: ['indian bride', 'south asian bridal'],
  mehndi: ['mehndi henna hands', 'henna ceremony'],
  sherwani: ['sherwani groom', 'indian men formal'],
  jewelry: ['indian jewelry gold', 'kundan jewelry'],
  textile: ['indian textile fabric', 'silk weaving'],
  fashion: ['south asian fashion', 'indian ethnic wear'],
  kurta: ['kurta men indian', 'indian men outfit'],
};

async function searchPexels(query, perPage = 15) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
  const res = await fetch(url, {
    headers: { 'Authorization': API_KEY },
  });
  if (!res.ok) {
    console.error(`Pexels API error for "${query}": ${res.status}`);
    return [];
  }
  const data = await res.json();
  return data.photos.map(p => ({
    id: p.id,
    alt: p.alt || query,
    photographer: p.photographer,
  }));
}

async function main() {
  console.log('Fetching images from Pexels...');

  const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

  // Fetch new images for each category
  for (const [category, queries] of Object.entries(SEARCH_QUERIES)) {
    console.log(`  Searching: ${category}...`);
    for (const query of queries) {
      const photos = await searchPexels(query, 10);
      if (photos.length > 0) {
        console.log(`    Found ${photos.length} photos for "${query}"`);
      }
      // Rate limit: Pexels allows 200 req/hr
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('Done! Update src/data/images.json manually with preferred photos.');
  console.log('Current file preserved at:', DATA_FILE);
}

main().catch(console.error);
