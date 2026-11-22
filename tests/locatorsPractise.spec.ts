import { expect, test, type Page } from '@playwright/test';

async function addTheCheapestProductToCart(page: Page): Promise<void> {
  await page.getByRole('combobox').selectOption('lohi');

  const cheapestProduct = page.locator('[data-test="inventory-item"]').first();
  await expect(cheapestProduct).toBeVisible();
  await cheapestProduct.getByRole('button', { name: 'Add to cart' }).click();
}

test.describe('Locators Practise', () => {
  test('Locators Practise For Todo Page', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByPlaceholder('What needs to be done?');
    await page.getByText('Start Learn Playwright');
    await page.getByRole('listitem').filter({ hasText: 'Start Learn POM for Playwright' });
    await page.getByRole('button', { name: 'Clear completed' });

    await page.getByRole('list').count();
  });
});

test.describe('Purchasing a product', () => {
  test.beforeEach('Login into user account', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button').filter({ hasText: 'Login' }).click();
  });

  test('Login and adding item to cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-badge"]');
  });

  test('Adds the lowest-price product to the cart', async ({ page }) => {
    await addTheCheapestProductToCart(page);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('Purchase a lowest-price product', async ({ page }) => {
    await addTheCheapestProductToCart(page);
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.locator('.cart_item')).toHaveCount(1);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').fill('user');
    await page.getByPlaceholder('Last Name').fill('standard');
    await page.getByPlaceholder('Zip/Postal Code').fill('11111');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await page.getByRole('button', { name: 'Back Home' }).click();
  });
});
