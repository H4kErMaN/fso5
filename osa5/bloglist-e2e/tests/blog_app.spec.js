const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app (routed)', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  describe('Login (5.28)', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'vaaraSalasana')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in (5.28)', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'End-to-end testing rocks',
        'Playwright Team',
        'https://playwright.dev'
      )

      await expect(
        page.getByRole('link', { name: 'End-to-end testing rocks Playwright Team' })
      ).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'Testable blog',
          'Test Author',
          'https://example.com'
        )
      })

      test('the blog can be liked', async ({ page }) => {
        // Klikkaa blogin linkkiä
        await page
          .getByRole('link', { name: 'Testable blog Test Author' })
          .click()

        await expect(page.getByText('0 likes')).toBeVisible()

        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('1 likes')).toBeVisible()
      })

      test('the user who created the blog can delete it', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())

        await page
          .getByRole('link', { name: 'Testable blog Test Author' })
          .click()

        await page.getByRole('button', { name: 'remove' }).click()

        // Poiston jälkeen navigoidaan takaisin blogilistalle
        await expect(
          page.getByRole('link', { name: 'Testable blog Test Author' })
        ).not.toBeVisible()
      })
    })
  })
})
