import { test, expect } from '@playwright/test';

test.describe('DemoQA authentication', () => {
  test('Positive profile sign up', async ({ page }) => {
    await page.goto('https://demoqa.com/register');
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Smith');
    await page.getByRole('textbox', { name: 'UserName' }).click();
    await page.getByRole('textbox', { name: 'UserName' }).fill('Bondarikkk1337');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Superpassdfrtg');
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByRole('button', { name: 'Back to Login' }).click();
  });

  test('Negative login test', async ({ page }) => {
    await page.goto('https://demoqa.com/register');
    await page.getByRole('button', { name: 'Back to Login' }).click();
    await page.getByRole('textbox', { name: 'UserName' }).click();
    await page.getByRole('textbox', { name: 'UserName' }).fill('FailedUser');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Failedpass111111');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#name')).toContainText('Invalid username or password!');
  });
});
