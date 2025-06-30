import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const archive = defineCollection({
	// Load Markdown and MDX files in the `src/content/archive/` directory.
	loader: glob({ base: './src/content/archive', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		captures: z.array(z.array(z.string()))
	}),
});

export const collections = { archive };
