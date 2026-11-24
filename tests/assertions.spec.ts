import { test, expect } from '@playwright/test';

test.describe('Learning logic of assertions for SDET', () => {
  test('Login page assertions', async ({ page }) => {
    await page.goto('https://demoqa.com/login');

    // 1 Auto-retrying assertions (retry untill timeout)
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2 Non auto-retrying assertions (retry untill timeout)
    const headingText = await page.locator('h1').textContent();
    expect(headingText).toBe('Login');

    // 3 Negative matchers
    const formTitle = await page.locator('h5').textContent();
    expect(formTitle).not.toBe('Register');

    // 4 Soft assertions
    await expect.soft(page).toHaveURL(/login/);

    // 5 Last assertions

    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
  });
});
