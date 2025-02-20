import { defineConfig } from '@playwright/test';

export default defineConfig({
	use: {
		baseURL: 'http://localhost:4173'
	},
	webServer: {
		command: 'yarn build && yarn preview',
		port: 4173
	},
	testDir: 'e2e'
});
