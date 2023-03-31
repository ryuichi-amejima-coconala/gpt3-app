import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  snapshotDir: './test/e2e/snapshots',
  testDir: './test/e2e',
  webServer: {
    command: 'PORT=4000 node ./.output/server/index.mjs',
    port: 4000,
  },
  projects: [
    {
      name: 'ipad pro 11',
      use: devices['iPad Pro 11 landscape']
    },
    {
      name: 'ipad mini',
      use: devices['iPad Mini landscape']
    }
  ]
}

export default config