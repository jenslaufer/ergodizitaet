import { defineConfig } from '@playwright/test';

// The page is a single static file. The suite drives the shipped artifact,
// not a build of it - that is the point until the Vite conversion lands.
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:4173' },
  webServer: {
    command: 'python3 -m http.server 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
  },
});
