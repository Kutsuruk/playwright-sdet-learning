import test from '@playwright/test';

test.describe('Locators Practise', () => {
  test('Locators Practise For Todo Page', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByPlaceholder('What needs to be done?');
    await page.getByText('Start Learn Playwright');
    await page.getByRole('listitem').filter({ hasText: 'Start Learn POM for Playwright' });
    await page.getByRole('button', { name: 'Clear completed' });

    await page.getByRole('list').count();
  });

  test('Login and adding item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button').filter({ hasText: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-badge"]');
  });
});
