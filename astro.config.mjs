// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// User site (WoleTheAnalyst.github.io) is served from the domain root, so no `base` is needed.
export default defineConfig({
  site: 'https://woletheanalyst.github.io',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
