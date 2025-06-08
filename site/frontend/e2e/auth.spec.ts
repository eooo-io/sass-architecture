import { expect, test } from './test-utils'

test.describe('Authentication', () => {
  test('should allow user to sign up', async ({ page }) => {
    await page.goto('/auth/signup')

    // Fill in the signup form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'Password123!')
    await page.fill('input[name="confirmPassword"]', 'Password123!')

    // Submit the form
    await page.click('button[type="submit"]')

    // Should redirect to dashboard after successful signup
    await expect(page).toHaveURL('/dashboard')
  })

  test('should show validation errors on signup form', async ({ page }) => {
    await page.goto('/auth/signup')

    // Submit empty form
    await page.click('button[type="submit"]')

    // Should show validation errors
    await expect(page.locator('text=Required')).toHaveCount(4)

    // Fill in invalid email
    await page.fill('input[name="email"]', 'invalid-email')
    await expect(page.locator('text=Invalid email address')).toBeVisible()

    // Fill in weak password
    await page.fill('input[name="password"]', '123')
    await expect(page.locator('text=Must be at least 8 characters')).toBeVisible()
  })

  test('should allow user to login', async ({ page }) => {
    await page.goto('/auth/login')

    // Fill in the login form
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'Password123!')

    // Submit the form
    await page.click('button[type="submit"]')

    // Should redirect to dashboard after successful login
    await expect(page).toHaveURL('/dashboard')
  })

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/auth/login')

    // Fill in invalid credentials
    await page.fill('input[name="email"]', 'wrong@example.com')
    await page.fill('input[name="password"]', 'WrongPassword123!')

    // Submit the form
    await page.click('button[type="submit"]')

    // Should show error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible()
  })

  test('should allow user to reset password', async ({ page }) => {
    // Test forgot password flow
    await page.goto('/auth/forgot-password')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Check your email')).toBeVisible()

    // Test reset password flow (assuming we have a valid token)
    await page.goto('/auth/reset-password?token=valid-token')
    await page.fill('input[name="password"]', 'NewPassword123!')
    await page.fill('input[name="confirmPassword"]', 'NewPassword123!')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/auth/login?reset=success')
  })

  test('should handle invalid reset token', async ({ page }) => {
    await page.goto('/auth/reset-password?token=invalid-token')
    await page.fill('input[name="password"]', 'NewPassword123!')
    await page.fill('input[name="confirmPassword"]', 'NewPassword123!')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Invalid or expired reset token')).toBeVisible()
  })
})
