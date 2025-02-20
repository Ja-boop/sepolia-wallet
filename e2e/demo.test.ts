import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/USDT Balance - Sepolia/);
});

test('has info text', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Check your USDT balance for Sepolia network')).toBeVisible();
});

test('connect wallet button is visible', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Connect your wallet')).toBeVisible();
});
