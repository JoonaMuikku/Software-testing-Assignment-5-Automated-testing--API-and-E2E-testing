import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'http://localhost:5173';


// Test 3 - Positive E2E test, image loads on page load
test('should display dog image on page load', async ({ page }) => {
  await page.goto(FRONTEND_URL);

  await page.waitForResponse(response =>
    response.url().includes('/api/dogs/random') && response.status() === 200
  );

  const image = page.locator('.dog-image');
  await expect(image).toHaveAttribute('src', /https:\/\//);
});


// Test 4 - Positive E2E test, image is retrieved after button click
test('should display dog image after button click', async ({ page }) => {
  await page.goto(FRONTEND_URL);
  const button = page.locator('button.fetch-button');

  await button.click();

  await page.waitForResponse(response =>
    response.url().includes('/api/dogs/random') && response.status() === 200
  );

  const image = page.locator('.dog-image');
  await expect(image).toHaveAttribute('src', /https:\/\//);
});


// Test 5 - Negative E2E test, API call failing shows an error
test('should show error when API call fails', async ({ page }) => {
  await page.route('**/api/dogs/random', route => route.abort());
  await page.goto(FRONTEND_URL);

  const errorElement = page.locator('.error');

  await expect(errorElement).toBeVisible();
  await expect(errorElement).toContainText(/error/i);
});