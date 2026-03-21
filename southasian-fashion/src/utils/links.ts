// Internal linking engine
// Each page gets 2-5 contextual internal links

interface ArticleMeta {
  slug: string;
  title: string;
  category: string;
  tags: string[];
}

// Score relevance between two articles
function relevanceScore(source: ArticleMeta, target: ArticleMeta): number {
  if (source.slug === target.slug) return -1;

  let score = 0;

  // Same category boost
  if (source.category === target.category) score += 2;

  // Complementary category boost (buy <-> sell, wedding <-> buy)
  const complements: Record<string, string[]> = {
    'buy': ['sell', 'wedding', 'compare'],
    'sell': ['buy', 'wedding'],
    'wedding': ['buy', 'learn', 'sell'],
    'learn': ['buy', 'wedding'],
    'compare': ['buy', 'sell'],
  };
  if (complements[source.category]?.includes(target.category)) score += 1;

  // Tag overlap
  const commonTags = source.tags.filter(t => target.tags.includes(t));
  score += commonTags.length * 1.5;

  return score;
}

export function getRelatedArticles(
  source: ArticleMeta,
  allArticles: ArticleMeta[],
  count: number = 4
): ArticleMeta[] {
  return allArticles
    .map(article => ({ article, score: relevanceScore(source, article) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ article }) => article);
}

export function getCategoryPath(category: string): string {
  const paths: Record<string, string> = {
    'buy': '/buying',
    'sell': '/selling',
    'wedding': '/wedding-guides',
    'learn': '/learn',
    'compare': '/buying',
  };
  return paths[category] || '/';
}

export function getArticlePath(slug: string, category: string): string {
  return `/${category}/${slug}`;
}
