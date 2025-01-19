import {loadEnv} from 'vite'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const mode = process.env.NODE_ENV ?? 'development'
const {SANITY_ID, SANITY_DATASET} = loadEnv(mode, process.cwd(), '')
export default defineConfig({
  name: 'default',
  title: '1mkudev',

  projectId: SANITY_ID,
  dataset: SANITY_DATASET,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
