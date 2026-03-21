// Deterministic image system using curated Pexels photos
// Each page gets consistent, relevant images mapped by slug and category

import imageData from '../data/images.json';

interface PexelsImage {
  id: number;
  alt: string;
}

function pexelsUrl(id: number, width: number, height: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&dpr=1`;
}

// Get hero image for an article
export function getArticleHeroImage(slug: string, width: number = 1200, height: number = 600): { url: string; alt: string } {
  const articleImg = (imageData.articles as Record<string, PexelsImage>)[slug];
  if (articleImg) {
    return { url: pexelsUrl(articleImg.id, width, height), alt: articleImg.alt };
  }
  // Fallback to category hero
  return { url: pexelsUrl(imageData.homepageHero.id, width, height), alt: imageData.homepageHero.alt };
}

// Get card thumbnail for an article
export function getArticleCardImage(slug: string, width: number = 600, height: number = 400): { url: string; alt: string } {
  return getArticleHeroImage(slug, width, height);
}

// Get category hero image
export function getCategoryHeroImage(category: string, width: number = 1400, height: number = 500): { url: string; alt: string } {
  const catImg = (imageData.categoryHeroes as Record<string, PexelsImage>)[category];
  if (catImg) {
    return { url: pexelsUrl(catImg.id, width, height), alt: catImg.alt };
  }
  return { url: pexelsUrl(imageData.homepageHero.id, width, height), alt: imageData.homepageHero.alt };
}

// Get homepage hero
export function getHomepageHeroImage(width: number = 1600, height: number = 800): { url: string; alt: string } {
  return { url: pexelsUrl(imageData.homepageHero.id, width, height), alt: imageData.homepageHero.alt };
}

// Get PurvX section images
export function getPurvXSectionImages(sectionKey: string): { url: string; title: string; link: string }[] {
  const section = (imageData.purvxSections as Record<string, { id: number; title: string; link: string }[]>)[sectionKey];
  if (!section) return [];
  return section.map(item => ({
    url: pexelsUrl(item.id, 400, 500),
    title: item.title,
    link: item.link,
  }));
}

// Get inline images for articles (arrays of image groups)
export function getArticleInlineImages(slug: string): { url: string; alt: string; caption?: string }[][] {
  const inlineData = (imageData as any).inlineImages?.[slug];
  if (!inlineData) return [];
  return inlineData.map((group: any[]) =>
    group.map((img: any) => ({
      url: pexelsUrl(img.id, 800, 600),
      alt: img.alt,
      caption: img.caption,
    }))
  );
}

// Fallback gradient backgrounds
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
