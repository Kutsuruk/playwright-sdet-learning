import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';

test.skip('Custom tag verification', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');

  await test.step('Run accessibility with custom rule', async () => {
    const axeBuilder = await new AxeBuilder({ page }).withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
    ]);

    const accessibilityScanResults = await axeBuilder.analyze();

    console.log('Accessibility Scan Results:', accessibilityScanResults.violations);
    // Store a report

    const reportLines: string[] = [];
    if (accessibilityScanResults.violations.length > 0) {
      reportLines.push('Accessibility Violations Found:');
      for (const violation of accessibilityScanResults.violations) {
        reportLines.push('Violations:', violation.id);
        reportLines.push('Descriptions:', violation.description);
        reportLines.push('Impact:', violation.impact ?? 'Not specified');
        for (const node of violation.nodes) {
          reportLines.push('Node HTML:', node.html);
          reportLines.push('Failure Summary:', node.failureSummary ?? 'No summary provided');
          reportLines.push('Node Selectors:', node.target.join(', '));
        }
      }
    } else {
      reportLines.push('No Accessibility Violations Found!');
    }

    const reportFilePath = 'accessibility-reports/accessibility-report.txt';
    await writeFile(reportFilePath, reportLines.join('\n'));

    expect(accessibilityScanResults.violations.length, 'Accessibility violations found').toBe(0);
  });
});
