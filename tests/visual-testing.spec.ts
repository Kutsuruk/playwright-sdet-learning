import { expect, test } from '@playwright/test';

test.describe('Visual screenshot testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Capture base screenshot of Login page', async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });

  // Full page screenshot test
  test('Full page screenshot test of Login page', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  test('Visual check of Login button element', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toHaveScreenshot();
  });

  test('Masking sensitive info of Login form', async ({ page }) => {
    await expect(page).toHaveScreenshot({
      fullPage: true,
      mask: [page.locator('#user-name'), page.locator('#password')],
      maskColor: '#000000',
    });
  });
});
