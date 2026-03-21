// Deterministic image system using curated Unsplash queries
// Each page gets consistent, relevant images based on content category

interface ImageQuery {
  query: string;
  collection?: string;
}

const CATEGORY_QUERIES: Record<string, ImageQuery[]> = {
  'wedding': [
    { query: 'indian-wedding-ceremony' },
    { query: 'south-asian-bride' },
    { query: 'indian-wedding-decoration' },
    { query: 'mehndi-ceremony' },
    { query: 'indian-wedding-couple' },
    { query: 'sangeet-ceremony' },
    { query: 'indian-wedding-jewelry' },
    { query: 'haldi-ceremony' },
  ],
  'buy': [
    { query: 'indian-fashion-textile' },
    { query: 'silk-saree-fabric' },
    { query: 'lehenga-embroidery' },
    { query: 'indian-fashion-shopping' },
    { query: 'ethnic-wear-display' },
    { query: 'indian-bridal-outfit' },
    { query: 'indian-textile-market' },
    { query: 'designer-indian-clothes' },
  ],
  'sell': [
    { query: 'luxury-fashion-resale' },
    { query: 'vintage-clothing-rack' },
    { query: 'fashion-photography-studio' },
    { query: 'clothing-flatlay' },
    { query: 'wardrobe-organization' },
    { query: 'fashion-marketplace' },
  ],
  'learn': [
    { query: 'indian-textile-weaving' },
    { query: 'indian-embroidery-craft' },
    { query: 'silk-fabric-texture' },
    { query: 'indian-fashion-design' },
    { query: 'traditional-indian-art' },
    { query: 'indian-fabric-dyeing' },
  ],
  'compare': [
    { query: 'indian-fashion-variety' },
    { query: 'colorful-indian-textiles' },
    { query: 'indian-outfit-collection' },
  ],
};

// Simple hash function for deterministic selection
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getImageForPage(slug: string, category: string, index: number = 0): string {
  const queries = CATEGORY_QUERIES[category] || CATEGORY_QUERIES['learn'];
  const hash = hashString(slug + index.toString());
  const selected = queries[hash % queries.length];
  // Use Unsplash Source for deterministic, free images
  // The sig parameter ensures same image for same slug
  return `https://source.unsplash.com/featured/1200x800/?${encodeURIComponent(selected.query)}&sig=${hashString(slug + category + index)}`;
}

export function getHeroImage(slug: string, category: string): string {
  return getImageForPage(slug, category, 0);
}

export function getSectionImage(slug: string, category: string, sectionIndex: number): string {
  return getImageForPage(slug, category, sectionIndex + 100);
}

// Fallback gradient backgrounds for when images fail to load
export function getFallbackGradient(category: string): string {
  const gradients: Record<string, string> = {
    'wedding': 'linear-gradient(135deg, #6B1D3A 0%, #D4763C 100%)',
    'buy': 'linear-gradient(135deg, #C9A94E 0%, #D4763C 100%)',
    'sell': 'linear-gradient(135deg, #2A2520 0%, #6B5E52 100%)',
    'learn': 'linear-gradient(135deg, #D4763C 0%, #C9A94E 100%)',
    'compare': 'linear-gradient(135deg, #6B1D3A 0%, #C9A94E 100%)',
  };
  return gradients[category] || gradients['learn'];
}
