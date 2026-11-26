import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.skip('General accessibility check', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  console.log('Accessibility scan results:', accessibilityScanResults.violations);
  expect(accessibilityScanResults.violations.length, 'Accessibility violations found').toBe(0);
});

test.skip('Custom tag verification', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');

  const axeBuilder = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .withRules(['color-contrast', 'image-alt', 'link-name', 'document-title']);

  const accessibilityScanResults = await axeBuilder.analyze();

  console.log('Accessibility Scan Results:', accessibilityScanResults.violations);
  expect(accessibilityScanResults.violations.length, 'Accessibility violations found').toBe(0);
});
