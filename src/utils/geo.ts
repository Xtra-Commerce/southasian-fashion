// Geo-routing utility for PurvX links
// India-related pages → PurvX.in, all others → PurvX.com

export const PURVX_DOMAINS = {
  global: 'https://purvx.com',
  india: 'https://purvx.in',
} as const;

const INDIA_KEYWORDS = ['india', 'indian', 'delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'jaipur', 'lucknow', 'varanasi', 'surat', 'ahmedabad', 'pune'];

export function getPurvXLink(context?: { country?: string; tags?: string[]; slug?: string }): string {
  if (!context) return PURVX_DOMAINS.global;

  const allText = [
    context.country || '',
    ...(context.tags || []),
    context.slug || '',
  ].join(' ').toLowerCase();

  const isIndia = INDIA_KEYWORDS.some(kw => allText.includes(kw));
  return isIndia ? PURVX_DOMAINS.india : PURVX_DOMAINS.global;
}

export function getPurvXBuyLink(context?: { country?: string; tags?: string[]; slug?: string }): string {
  const base = getPurvXLink(context);
  return `${base}/buy`;
}

export function getPurvXSellLink(context?: { country?: string; tags?: string[]; slug?: string }): string {
  const base = getPurvXLink(context);
  return `${base}/sell`;
}
