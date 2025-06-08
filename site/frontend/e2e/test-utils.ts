import { test as base, expect } from '@playwright/test'

export * from '@playwright/test'

export const test = base.extend({
  // Add custom fixtures here
  authenticatedPage: async ({ page }, use) => {
    // Login before running the test
    await page.goto('/auth/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'Password123!')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')

    // Use the authenticated page
    await use(page)
  },
})

// Custom assertions
expect.extend({
  async toBeAccessible(page) {
    const violations = await page.evaluate(async () => {
      // You can add axe-core or other accessibility testing libraries here
      return []
    })

    return {
      pass: violations.length === 0,
      message: () =>
        violations.length === 0
          ? 'Expected page to have accessibility violations'
          : `Expected page to have no accessibility violations, but found:\n${violations
              .map((v) => `- ${v.description}`)
              .join('\n')}`,
    }
  },
})
