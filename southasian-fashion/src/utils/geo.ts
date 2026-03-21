// Geo-routing utility for PurvX links
// India-related pages → PurvX.in, all others → PurvX.com

export const PURVX_DOMAINS = {
  global: 'https://www.purvx.com',
  india: 'https://purvx.in',
} as const;

const INDIA_KEYWORDS = ['india', 'indian', 'delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'jaipur', 'lucknow', 'varanasi', 'surat', 'ahmedabad', 'pune'];

export function isIndiaContext(context?: { country?: string; tags?: string[]; slug?: string }): boolean {
  if (!context) return false;
  const allText = [
    context.country || '',
    ...(context.tags || []),
    context.slug || '',
  ].join(' ').toLowerCase();
  return INDIA_KEYWORDS.some(kw => allText.includes(kw));
}

export function getPurvXLink(context?: { country?: string; tags?: string[]; slug?: string }): string {
  return isIndiaContext(context) ? PURVX_DOMAINS.india : PURVX_DOMAINS.global;
}

export function getPurvXBuyLink(context?: { country?: string; tags?: string[]; slug?: string }): string {
  if (isIndiaContext(context)) {
    return `${PURVX_DOMAINS.india}/collections/all`;
  }
  return `${PURVX_DOMAINS.global}/s`;
}

export function getPurvXSellLink(context?: { country?: string; tags?: string[]; slug?: string }): string {
  // Both sites handle selling from the homepage
  return getPurvXLink(context);
}

// Category-specific browse links for PurvX.com
export function getPurvXCategoryLink(category: string, context?: { country?: string; tags?: string[]; slug?: string }): string {
  if (isIndiaContext(context)) {
    // PurvX.in uses Shopify collections
    const inCollections: Record<string, string> = {
      'lehenga': '/collections/women',
      'saree': '/collections/women',
      'sherwani': '/collections/men',
      'kurta': '/collections/men',
      'mens': '/collections/men',
      'womens': '/collections/women',
      'kids': '/collections/kids',
      'bridal': '/collections/women',
      'jewelry': '/collections/all',
    };
    return `${PURVX_DOMAINS.india}${inCollections[category] || '/collections/all'}`;
  }

  // PurvX.com uses query-based search
  const comCategories: Record<string, string> = {
    'lehenga': '/s?pub_categoryLevel1=womens&pub_categoryLevel2=lehengas',
    'saree': '/s?pub_categoryLevel1=womens&pub_categoryLevel2=sarees',
    'suit': '/s?pub_categoryLevel1=womens&pub_categoryLevel2=suit-sets',
    'anarkali': '/s?pub_categoryLevel1=womens&pub_categoryLevel2=suit-sets',
    'salwar': '/s?pub_categoryLevel1=womens&pub_categoryLevel2=suit-sets',
    'gown': '/s?pub_categoryLevel1=womens&pub_categoryLevel2=gowns',
    'sherwani': '/s?pub_categoryLevel1=mens',
    'kurta': '/s?pub_categoryLevel1=mens',
    'mens': '/s?pub_categoryLevel1=mens',
    'womens': '/s?pub_categoryLevel1=womens',
    'bridal': '/s?pub_categoryLevel1=womens&pub_categoryLevel2=bridal',
    'jewelry': '/s?pub_categoryLevel1=womens&pub_categoryLevel2=accessories',
    'indo-western': '/s?pub_categoryLevel1=womens&pub_categoryLevel2=indo-western',
  };
  return `${PURVX_DOMAINS.global}${comCategories[category] || '/s'}`;
}
