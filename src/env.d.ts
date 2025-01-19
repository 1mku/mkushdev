/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
    readonly SANITY_ID: string;
    readonly SANITY_DATASET: string;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }