// Schema.org structured data generators

export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  category: string;
  publishDate: string;
  updatedDate?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishDate,
    dateModified: article.updatedDate || article.publishDate,
    author: {
      '@type': 'Organization',
      name: 'SouthAsian.Fashion',
      url: 'https://southasian.fashion',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SouthAsian.Fashion',
      url: 'https://southasian.fashion',
      logo: {
        '@type': 'ImageObject',
        url: 'https://southasian.fashion/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://southasian.fashion/${article.category}/${article.slug}`,
    },
    keywords: article.tags?.join(', '),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://southasian.fashion${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SouthAsian.Fashion',
    url: 'https://southasian.fashion',
    description: 'Expert guides for buying, wearing, and selling South Asian fashion. Wedding outfits, cultural education, and styling advice.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://southasian.fashion',
    },
  };
}
