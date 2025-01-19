import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';

// Sanity
import sanity from '@sanity/astro';
const { SANITY_ID, SANITY_DATASET } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
    integrations: [
        tailwind(),
        partytown({
            config: {
                forward: ["dataLayer.push"]
            }
        }),
        sanity(
            {
                projectId: SANITY_ID,
                dataset: SANITY_DATASET,
                useCdn: false, // for static builds
            }
        )]
});
