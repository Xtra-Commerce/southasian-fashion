import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['buy', 'sell', 'wedding', 'learn', 'compare']),
  tags: z.array(z.string()).default([]),
  country: z.string().optional(),
  publishDate: z.coerce.string(),
  updatedDate: z.coerce.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

const buy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/buy' }),
  schema: articleSchema,
});

const sell = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sell' }),
  schema: articleSchema,
});

const wedding = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wedding' }),
  schema: articleSchema,
});

const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: articleSchema,
});

const compare = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/compare' }),
  schema: articleSchema,
});

export const collections = { buy, sell, wedding, learn, compare };
