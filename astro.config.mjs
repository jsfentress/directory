import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [tailwind(), preact()],
  vite: {
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'preact',
    },
  },
});