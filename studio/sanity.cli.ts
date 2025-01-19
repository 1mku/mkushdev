import {defineCliConfig} from 'sanity/cli'

import {loadEnv} from 'vite'

const mode = process.env.NODE_ENV ?? 'development'
const {SANITY_ID, SANITY_DATASET, SANITY_STUDIOHOST} = loadEnv(mode, process.cwd(), '')
export default defineCliConfig({
  api: {
    projectId: SANITY_ID,
    dataset: SANITY_DATASET,
  },
  studioHost: SANITY_STUDIOHOST,
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
